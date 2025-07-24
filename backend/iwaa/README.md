# Ewae Backend API - .NET 8

A comprehensive association management platform backend built with .NET 8, Entity Framework Core, and MySQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Multi-role user system (Agent Sécurité, Groupe Associatif, Public, Gestion Persona, TWAA)
- **Association Management**: Complete CRUD operations for associations
- **Resident Management**: Track and manage residents with detailed profiles
- **Donation System**: Handle monetary and material donations with campaigns
- **Alert System**: Security and operational alerts with priority levels
- **Declaration System**: Public declarations and complaints management
- **Reporting**: Generate various reports with statistics
- **Dashboard**: Role-specific dashboards with real-time statistics
- **Partner Management**: Manage organizational partnerships
- **Document Management**: File upload and document handling
- **Audit Trail**: Complete logging and activity tracking

## 🛠️ Technology Stack

- **.NET 8**: Latest .NET framework
- **Entity Framework Core 8**: ORM with MySQL provider
- **MySQL**: Primary database
- **JWT Authentication**: Secure token-based authentication
- **Serilog**: Structured logging
- **Swagger/OpenAPI**: API documentation
- **FluentValidation**: Input validation
- **AutoMapper**: Object mapping

## 📋 Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [MySQL 8.0+](https://dev.mysql.com/downloads/mysql/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) (optional, for API testing)

## 🔧 Setup Instructions

### 1. Clone and Navigate

```bash
cd Ewae/backend/iwaa
```

### 2. Install Dependencies

```bash
dotnet restore
```

### 3. Database Setup

1. **Install MySQL** and ensure it's running on port 3306

2. **Create Database and User**:
```sql
CREATE DATABASE ewae_dev_db;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root123';
GRANT ALL PRIVILEGES ON ewae_dev_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

3. **Update Connection String** in `appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;port=3306;database=ewae_dev_db;user=root;password=root123;"
  }
}
```

### 4. Database Migration

```bash
# Create initial migration
dotnet ef migrations add InitialCreate

# Apply migration to database
dotnet ef database update
```

### 5. Run the Application

```bash
dotnet run
```

The API will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:7000`
- Swagger UI: `https://localhost:7000/swagger`

## 🔐 Demo Accounts

The system automatically creates demo accounts on first run:

| Username | Role | Password | Description |
|----------|------|----------|-------------|
| `agent` | Agent de Sécurité | `demo123` | Security agent with association oversight |
| `associative` | Groupe Associatif | `demo123` | Association representative |
| `public` | Public | `demo123` | General public user |
| `persona` | Gestion Persona | `demo123` | Personnel management specialist |
| `twaa` | TWAA Administrator | `demo123` | System administrator |

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/refresh-token` - Refresh JWT token

### Association Endpoints

- `GET /api/associations` - Get associations with filtering
- `GET /api/associations/{id}` - Get association by ID
- `POST /api/associations` - Create new association
- `PUT /api/associations/{id}` - Update association
- `DELETE /api/associations/{id}` - Delete association (soft delete)
- `GET /api/associations/{id}/statistics` - Get association statistics

### Dashboard Endpoints

- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent-activities` - Get recent activities
- `GET /api/dashboard/role-metrics` - Get role-specific metrics
- `GET /api/dashboard/health` - Get system health (Admin only)

### Swagger Documentation

Once the application is running, visit `https://localhost:7000/swagger` for interactive API documentation.

## 🗂️ Project Structure

```
iwaa/
├── Controllers/           # API Controllers
│   ├── AuthController.cs
│   ├── AssociationsController.cs
│   └── DashboardController.cs
├── Data/                 # Entity Framework Context
│   └── ApplicationDbContext.cs
├── DTOs/                 # Data Transfer Objects
│   ├── AuthDtos.cs
│   └── EntityDtos.cs
├── Models/               # Entity Models
│   ├── User.cs
│   ├── Association.cs
│   ├── Resident.cs
│   ├── Donation.cs
│   ├── Alert.cs
│   └── Report.cs
├── Services/             # Business Logic Services
│   └── AuthService.cs
├── Program.cs            # Application Entry Point
└── appsettings.json      # Configuration
```

## 🔧 Configuration

### Environment Variables

Key configuration sections in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "MySQL connection string"
  },
  "Jwt": {
    "Secret": "JWT signing key",
    "ExpiryHours": 24,
    "Issuer": "API issuer",
    "Audience": "API audience"
  },
  "CORS": {
    "AllowedOrigins": ["http://localhost:3000"]
  }
}
```

### Features Configuration

Toggle features on/off:

```json
{
  "Features": {
    "EnableSwagger": true,
    "EnableDetailedErrors": true,
    "EnableCaching": true,
    "EnableFileUpload": true
  }
}
```

## 🧪 Development

### Entity Framework Commands

```bash
# Add new migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

# Remove last migration
dotnet ef migrations remove

# Generate SQL script
dotnet ef migrations script
```

### Running Tests

```bash
dotnet test
```

### Code Generation

```bash
# Scaffold controller
dotnet aspnet-codegenerator controller -name ResidentsController -async -api -m Resident -dc ApplicationDbContext -outDir Controllers
```

## 🚀 Production Deployment

1. **Update Connection String** for production database
2. **Set Environment Variables**:
   ```bash
   export ASPNETCORE_ENVIRONMENT=Production
   export ConnectionStrings__DefaultConnection="production-connection-string"
   ```
3. **Build and Publish**:
   ```bash
   dotnet publish -c Release -o ./publish
   ```
4. **Configure Reverse Proxy** (Nginx/IIS)
5. **Set up HTTPS certificates**
6. **Configure logging and monitoring**

## 📊 Database Schema

The application uses the following main entities:

- **Users**: Identity-based user management with roles
- **Associations**: Organization records with risk assessment
- **Residents**: Individual resident profiles and services
- **Donations**: Financial and material contributions
- **Alerts**: Security and operational notifications
- **Declarations**: Public submissions and complaints
- **Reports**: Generated reports and analytics
- **Partners**: Organizational partnerships

## 🔒 Security Features

- **JWT Authentication** with role-based authorization
- **Password Hashing** using ASP.NET Core Identity
- **CORS Configuration** for cross-origin requests
- **Request Rate Limiting** to prevent abuse
- **SQL Injection Prevention** via Entity Framework
- **Input Validation** using FluentValidation
- **Security Headers** for enhanced protection

## 📝 Logging

The application uses Serilog for structured logging:

- **Console Logging**: Development environment
- **File Logging**: Rotating daily files in `logs/` directory
- **Structured Logging**: JSON format for production
- **Request Logging**: HTTP request/response logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Issues**:
   - Verify MySQL is running
   - Check connection string in appsettings.json
   - Ensure database exists and user has permissions

2. **Migration Errors**:
   - Delete `Migrations` folder and recreate: `dotnet ef migrations add InitialCreate`
   - Check for duplicate migration names

3. **JWT Token Issues**:
   - Verify JWT secret is set in configuration
   - Check token expiration settings
   - Ensure clock synchronization between client/server

4. **CORS Errors**:
   - Add frontend URL to `CORS.AllowedOrigins` in appsettings.json
   - Ensure CORS policy is correctly configured

### Performance Tips

- Enable caching for frequently accessed data
- Use pagination for large datasets
- Implement database indexing for search operations
- Use async/await patterns consistently

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the Swagger documentation at `/swagger`
- Review the logs in the `logs/` directory