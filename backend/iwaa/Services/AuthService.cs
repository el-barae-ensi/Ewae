using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using iwaa.Models;
using iwaa.DTOs;

namespace iwaa.Services
{
    public class AuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            ILogger<AuthService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<ApiResponse<LoginResponse>> LoginAsync(LoginRequest request)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(request.Username);
                if (user == null)
                {
                    _logger.LogWarning("Login attempt with invalid username: {Username}", request.Username);
                    return ApiResponse<LoginResponse>.ErrorResult("Nom d'utilisateur ou mot de passe incorrect");
                }

                if (!user.IsActive)
                {
                    _logger.LogWarning("Login attempt with inactive user: {Username}", request.Username);
                    return ApiResponse<LoginResponse>.ErrorResult("Compte désactivé");
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
                if (!result.Succeeded)
                {
                    _logger.LogWarning("Failed login attempt for user: {Username}", request.Username);
                    return ApiResponse<LoginResponse>.ErrorResult("Nom d'utilisateur ou mot de passe incorrect");
                }

                var token = GenerateJwtToken(user);
                var refreshToken = GenerateRefreshToken();

                // Store refresh token (in a real app, you'd store this in database)
                // For now, we'll include it in the response

                var userDto = new UserDto
                {
                    Id = user.Id,
                    Username = user.UserName ?? "",
                    Email = user.Email ?? "",
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = user.Role,
                    IsActive = user.IsActive,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt,
                    ProfileImageUrl = user.ProfileImageUrl,
                    Department = user.Department,
                    Position = user.Position,
                    PhoneNumber = user.PhoneNumber
                };

                var loginResponse = new LoginResponse
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    User = userDto,
                    ExpiresAt = DateTime.UtcNow.AddHours(GetTokenExpiryHours())
                };

                _logger.LogInformation("Successful login for user: {Username}", request.Username);
                return ApiResponse<LoginResponse>.SuccessResult(loginResponse, "Connexion réussie");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login for user: {Username}", request.Username);
                return ApiResponse<LoginResponse>.ErrorResult("Une erreur est survenue lors de la connexion");
            }
        }

        public async Task<ApiResponse<LoginResponse>> RegisterAsync(RegisterRequest request)
        {
            try
            {
                // Check if user already exists
                var existingUser = await _userManager.FindByNameAsync(request.Username);
                if (existingUser != null)
                {
                    return ApiResponse<LoginResponse>.ErrorResult("Ce nom d'utilisateur est déjà utilisé");
                }

                existingUser = await _userManager.FindByEmailAsync(request.Email);
                if (existingUser != null)
                {
                    return ApiResponse<LoginResponse>.ErrorResult("Cette adresse email est déjà utilisée");
                }

                var user = new User
                {
                    UserName = request.Username,
                    Email = request.Email,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Role = request.Role,
                    PhoneNumber = request.PhoneNumber,
                    Department = request.Department,
                    Position = request.Position,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                var result = await _userManager.CreateAsync(user, request.Password);
                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description).ToList();
                    return ApiResponse<LoginResponse>.ErrorResult("Erreur lors de la création du compte", errors);
                }

                // Auto-login after registration
                var loginRequest = new LoginRequest
                {
                    Username = request.Username,
                    Password = request.Password
                };

                return await LoginAsync(loginRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during registration for user: {Username}", request.Username);
                return ApiResponse<LoginResponse>.ErrorResult("Une erreur est survenue lors de l'inscription");
            }
        }

        public async Task<ApiResponse> ChangePasswordAsync(string userId, ChangePasswordRequest request)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return ApiResponse.ErrorResult("Utilisateur introuvable");
                }

                var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description).ToList();
                    return ApiResponse.ErrorResult("Erreur lors du changement de mot de passe", errors);
                }

                _logger.LogInformation("Password changed successfully for user: {UserId}", userId);
                return ApiResponse.SuccessResult("Mot de passe modifié avec succès");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error changing password for user: {UserId}", userId);
                return ApiResponse.ErrorResult("Une erreur est survenue lors du changement de mot de passe");
            }
        }

        public async Task<ApiResponse> UpdateProfileAsync(string userId, UpdateProfileRequest request)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return ApiResponse.ErrorResult("Utilisateur introuvable");
                }

                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.PhoneNumber = request.PhoneNumber;
                user.Department = request.Department;
                user.Position = request.Position;
                user.UpdatedAt = DateTime.UtcNow;

                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description).ToList();
                    return ApiResponse.ErrorResult("Erreur lors de la mise à jour du profil", errors);
                }

                _logger.LogInformation("Profile updated successfully for user: {UserId}", userId);
                return ApiResponse.SuccessResult("Profil mis à jour avec succès");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating profile for user: {UserId}", userId);
                return ApiResponse.ErrorResult("Une erreur est survenue lors de la mise à jour du profil");
            }
        }

        public async Task<ApiResponse<UserDto>> GetUserProfileAsync(string userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return ApiResponse<UserDto>.ErrorResult("Utilisateur introuvable");
                }

                var userDto = new UserDto
                {
                    Id = user.Id,
                    Username = user.UserName ?? "",
                    Email = user.Email ?? "",
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = user.Role,
                    IsActive = user.IsActive,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt,
                    ProfileImageUrl = user.ProfileImageUrl,
                    Department = user.Department,
                    Position = user.Position,
                    PhoneNumber = user.PhoneNumber
                };

                return ApiResponse<UserDto>.SuccessResult(userDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user profile: {UserId}", userId);
                return ApiResponse<UserDto>.ErrorResult("Une erreur est survenue lors de la récupération du profil");
            }
        }

        public async Task<ApiResponse> ForgotPasswordAsync(ForgotPasswordRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    // Don't reveal if user exists or not for security
                    return ApiResponse.SuccessResult("Si cette adresse email existe, un lien de réinitialisation a été envoyé");
                }

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                // In a real application, you would send this token via email
                // For demo purposes, we'll just log it
                _logger.LogInformation("Password reset token for {Email}: {Token}", request.Email, token);

                return ApiResponse.SuccessResult("Si cette adresse email existe, un lien de réinitialisation a été envoyé");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in forgot password for email: {Email}", request.Email);
                return ApiResponse.ErrorResult("Une erreur est survenue");
            }
        }

        public async Task<ApiResponse> ResetPasswordAsync(ResetPasswordRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    return ApiResponse.ErrorResult("Token de réinitialisation invalide");
                }

                var result = await _userManager.ResetPasswordAsync(user, request.Token, request.NewPassword);
                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description).ToList();
                    return ApiResponse.ErrorResult("Erreur lors de la réinitialisation du mot de passe", errors);
                }

                _logger.LogInformation("Password reset successfully for user: {Email}", request.Email);
                return ApiResponse.SuccessResult("Mot de passe réinitialisé avec succès");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resetting password for email: {Email}", request.Email);
                return ApiResponse.ErrorResult("Une erreur est survenue lors de la réinitialisation");
            }
        }

        public async Task<ApiResponse<LoginResponse>> RefreshTokenAsync(RefreshTokenRequest request)
        {
            try
            {
                // In a real application, you would validate the refresh token against stored tokens
                // For demo purposes, we'll just validate the JWT token structure
                var tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = GetTokenValidationParameters();

                var principal = tokenHandler.ValidateToken(request.Token, validationParameters, out SecurityToken validatedToken);
                var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return ApiResponse<LoginResponse>.ErrorResult("Token invalide");
                }

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null || !user.IsActive)
                {
                    return ApiResponse<LoginResponse>.ErrorResult("Utilisateur introuvable ou inactif");
                }

                var newToken = GenerateJwtToken(user);
                var newRefreshToken = GenerateRefreshToken();

                var userDto = new UserDto
                {
                    Id = user.Id,
                    Username = user.UserName ?? "",
                    Email = user.Email ?? "",
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = user.Role,
                    IsActive = user.IsActive,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt,
                    ProfileImageUrl = user.ProfileImageUrl,
                    Department = user.Department,
                    Position = user.Position,
                    PhoneNumber = user.PhoneNumber
                };

                var loginResponse = new LoginResponse
                {
                    Token = newToken,
                    RefreshToken = newRefreshToken,
                    User = userDto,
                    ExpiresAt = DateTime.UtcNow.AddHours(GetTokenExpiryHours())
                };

                return ApiResponse<LoginResponse>.SuccessResult(loginResponse, "Token actualisé avec succès");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error refreshing token");
                return ApiResponse<LoginResponse>.ErrorResult("Erreur lors de l'actualisation du token");
            }
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(GetJwtSecret());

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id),
                new(ClaimTypes.Name, user.UserName ?? ""),
                new(ClaimTypes.Email, user.Email ?? ""),
                new(ClaimTypes.GivenName, user.FirstName),
                new(ClaimTypes.Surname, user.LastName),
                new("role", user.Role.ToString()),
                new("roleDisplay", user.Role.GetDisplayName())
            };

            // Add permissions as claims
            var permissions = user.Role.GetPermissions();
            foreach (var permission in permissions)
            {
                claims.Add(new Claim("permission", permission));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(GetTokenExpiryHours()),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private TokenValidationParameters GetTokenValidationParameters()
        {
            return new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(GetJwtSecret())),
                ValidateIssuer = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = _configuration["Jwt:Audience"],
                ValidateLifetime = false, // We're not validating lifetime for refresh
                ClockSkew = TimeSpan.Zero
            };
        }

        private string GetJwtSecret()
        {
            var secret = _configuration["Jwt:Secret"];
            if (string.IsNullOrEmpty(secret))
            {
                throw new InvalidOperationException("JWT Secret not configured");
            }
            return secret;
        }

        private int GetTokenExpiryHours()
        {
            var expiryHours = _configuration.GetValue<int>("Jwt:ExpiryHours");
            return expiryHours > 0 ? expiryHours : 24; // Default to 24 hours
        }
    }
}
