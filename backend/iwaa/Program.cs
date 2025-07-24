using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json.Serialization;
using Serilog;
using iwaa.Data;
using iwaa.Models;
using iwaa.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .WriteTo.Console()
    .WriteTo.File("logs/ewae-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),
        mySqlOptions =>
        {
            mySqlOptions.CommandTimeout(builder.Configuration.GetValue<int>("Database:CommandTimeout", 30));
            mySqlOptions.EnableRetryOnFailure(
                maxRetryCount: builder.Configuration.GetValue<int>("Database:MaxRetryCount", 3),
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null);
        });

    if (builder.Environment.IsDevelopment())
    {
        if (builder.Configuration.GetValue<bool>("Database:EnableSensitiveDataLogging"))
            options.EnableSensitiveDataLogging();

        if (builder.Configuration.GetValue<bool>("Database:EnableDetailedErrors"))
            options.EnableDetailedErrors();
    }
});

// Configure Identity
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    // Password settings
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;

    // Lockout settings
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    // User settings
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;

    // Email confirmation
    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedAccount = false;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Configure JWT Authentication
var jwtSettings = builder.Configuration.GetSection("Jwt");
var secretKey = Encoding.ASCII.GetBytes(jwtSettings["Secret"]!);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(secretKey),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        RequireExpirationTime = true
    };

    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Log.Warning("Authentication failed: {Message}", context.Exception.Message);
            return Task.CompletedTask;
        },
        OnChallenge = context =>
        {
            Log.Warning("Authentication challenge: {Error} - {ErrorDescription}",
                context.Error, context.ErrorDescription);
            return Task.CompletedTask;
        }
    };
});

// Add Authorization
builder.Services.AddAuthorization(options =>
{
    // Define policies based on roles
    options.AddPolicy("AgentSecurite", policy =>
        policy.RequireClaim("role", "AgentSecurite"));
    options.AddPolicy("GroupeAssociatif", policy =>
        policy.RequireClaim("role", "GroupeAssociatif"));
    options.AddPolicy("Public", policy =>
        policy.RequireClaim("role", "Public"));
    options.AddPolicy("GestionPersona", policy =>
        policy.RequireClaim("role", "GestionPersona"));
    options.AddPolicy("Twaa", policy =>
        policy.RequireClaim("role", "Twaa"));

    // Permission-based policies
    options.AddPolicy("ViewAssociations", policy =>
        policy.RequireClaim("permission", "view_associations"));
    options.AddPolicy("ManageAssociations", policy =>
        policy.RequireClaim("permission", "manage_associations"));
    options.AddPolicy("ViewResidents", policy =>
        policy.RequireClaim("permission", "view_residents"));
    options.AddPolicy("ManageResidents", policy =>
        policy.RequireClaim("permission", "manage_residents"));
    options.AddPolicy("ManageDonations", policy =>
        policy.RequireClaim("permission", "manage_donations"));
    options.AddPolicy("ManageAlerts", policy =>
        policy.RequireClaim("permission", "manage_alerts"));
    options.AddPolicy("GenerateReports", policy =>
        policy.RequireClaim("permission", "generate_reports"));
    options.AddPolicy("ViewStatistics", policy =>
        policy.RequireClaim("permission", "view_statistics"));
});

// Configure CORS
var corsSettings = builder.Configuration.GetSection("CORS");
var allowedOrigins = corsSettings.GetSection("AllowedOrigins").Get<string[]>() ?? new[] { "*" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("EwaePolicy", policy =>
    {
        if (allowedOrigins.Contains("*"))
        {
            policy.AllowAnyOrigin();
        }
        else
        {
            policy.WithOrigins(allowedOrigins);
        }

        policy.AllowAnyMethod()
              .AllowAnyHeader()
              .WithExposedHeaders("X-Pagination");

        if (!allowedOrigins.Contains("*"))
        {
            policy.AllowCredentials();
        }
    });
});

// Add Controllers with JSON options
builder.Services.AddControllers(options =>
{
    options.SuppressAsyncSuffixInActionNames = false;
})
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.WriteIndented = builder.Environment.IsDevelopment();
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

// Add API Explorer
builder.Services.AddEndpointsApiExplorer();

// Configure Swagger/OpenAPI
if (builder.Configuration.GetValue<bool>("Features:EnableSwagger"))
{
    builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "Ewae API",
            Description = "A comprehensive association management platform API for Morocco",
            Contact = new OpenApiContact
            {
                Name = "Ewae Support",
                Email = "support@ewae.ma"
            },
            License = new OpenApiLicense
            {
                Name = "MIT License"
            }
        });

        // Add JWT Authentication to Swagger
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT"
        });

        options.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                Array.Empty<string>()
            }
        });

        // Include XML comments if available
        var xmlFilename = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFilename);
        if (File.Exists(xmlPath))
        {
            options.IncludeXmlComments(xmlPath);
        }
    });
}

// Register application services
builder.Services.AddScoped<AuthService>();

// Add AutoMapper (if you decide to use it later)
// builder.Services.AddAutoMapper(typeof(Program));

// Add Memory Cache
if (builder.Configuration.GetValue<bool>("Features:EnableCaching"))
{
    builder.Services.AddMemoryCache();
}

// Add Health Checks
builder.Services.AddHealthChecks()
    .AddDbContextCheck<ApplicationDbContext>("database");

// Configure Request Size Limits
builder.Services.Configure<IISServerOptions>(options =>
{
    options.MaxRequestBodySize = builder.Configuration.GetValue<long>("Security:MaxRequestBodySize", 52428800); // 50MB
});

// Configure Kestrel
builder.Services.Configure<Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions>(options =>
{
    options.Limits.MaxRequestBodySize = builder.Configuration.GetValue<long>("Security:MaxRequestBodySize", 52428800); // 50MB
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    if (builder.Configuration.GetValue<bool>("Features:EnableSwagger"))
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "Ewae API v1");
            options.RoutePrefix = "swagger";
            options.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
            options.DefaultModelsExpandDepth(-1);
        });
    }

    if (builder.Configuration.GetValue<bool>("Features:EnableDetailedErrors"))
    {
        app.UseDeveloperExceptionPage();
    }
}
else
{
    app.UseExceptionHandler("/Error");
    if (builder.Configuration.GetValue<bool>("Security:RequireHttps"))
    {
        app.UseHsts();
        app.UseHttpsRedirection();
    }
}

// Add security headers
app.Use(async (context, next) =>
{
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["X-Frame-Options"] = "DENY";
    context.Response.Headers["X-XSS-Protection"] = "1; mode=block";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";

    await next();
});

// Enable CORS
app.UseCors("EwaePolicy");

// Add request logging middleware
if (builder.Configuration.GetValue<bool>("Security:EnableRequestLogging"))
{
    app.UseSerilogRequestLogging(options =>
    {
        options.MessageTemplate = "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000} ms";
        options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
        {
            diagnosticContext.Set("RequestHost", httpContext.Request.Host.Value);
            diagnosticContext.Set("RequestScheme", httpContext.Request.Scheme);
        };
    });
}

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Controllers
app.MapControllers();

// Health Check endpoint
app.MapHealthChecks("/health");

// Add a simple root endpoint
app.MapGet("/", () => new
{
    Application = builder.Configuration["Application:Name"],
    Version = builder.Configuration["Application:Version"],
    Environment = builder.Configuration["Application:Environment"],
    Timestamp = DateTime.UtcNow,
    Status = "Running"
});

// Database initialization and seeding
try
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        // Apply migrations if enabled
        if (builder.Configuration.GetValue<bool>("Database:EnableAutoMigrations"))
        {
            Log.Information("Checking for pending database migrations...");
            await context.Database.MigrateAsync();
            Log.Information("Database migration completed successfully.");
        }

        // Seed initial data
        await SeedInitialDataAsync(userManager, roleManager);
    }
}
catch (Exception ex)
{
    Log.Fatal(ex, "An error occurred during application startup");
    throw;
}

Log.Information("Ewae API application started successfully");

app.Run();

// Seed initial data method
static async Task SeedInitialDataAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
{
    try
    {
        // Create default roles
        var roles = new[] { "AgentSecurite", "GroupeAssociatif", "Public", "GestionPersona", "Twaa" };
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
                Log.Information("Created role: {Role}", role);
            }
        }

        // Create demo users if they don't exist
        var demoUsers = new[]
        {
            new { Username = "agent", Email = "agent@ewae.ma", Role = UserRole.AgentSecurite, FirstName = "Agent", LastName = "Sécurité" },
            new { Username = "associative", Email = "associative@ewae.ma", Role = UserRole.GroupeAssociatif, FirstName = "Groupe", LastName = "Associatif" },
            new { Username = "public", Email = "public@ewae.ma", Role = UserRole.Public, FirstName = "Utilisateur", LastName = "Public" },
            new { Username = "persona", Email = "persona@ewae.ma", Role = UserRole.GestionPersona, FirstName = "Gestion", LastName = "Persona" },
            new { Username = "twaa", Email = "twaa@ewae.ma", Role = UserRole.Twaa, FirstName = "Administrateur", LastName = "Twaa" }
        };

        foreach (var demoUser in demoUsers)
        {
            var existingUser = await userManager.FindByNameAsync(demoUser.Username);
            if (existingUser == null)
            {
                var user = new User
                {
                    UserName = demoUser.Username,
                    Email = demoUser.Email,
                    FirstName = demoUser.FirstName,
                    LastName = demoUser.LastName,
                    Role = demoUser.Role,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(user, "Demo123");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, demoUser.Role.ToString());
                    Log.Information("Created demo user: {Username} with role {Role}", demoUser.Username, demoUser.Role);
                }
                else
                {
                    Log.Warning("Failed to create demo user {Username}: {Errors}",
                        demoUser.Username, string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }
        }

        Log.Information("Initial data seeding completed successfully");
    }
    catch (Exception ex)
    {
        Log.Error(ex, "Error occurred during initial data seeding");
        throw;
    }
}
