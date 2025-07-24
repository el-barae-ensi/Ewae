# Ewae - Association Management Platform

A comprehensive web application for managing associations, residents, security operations, and public services in Morocco.

## 🚀 Project Status

**Current Version**: 1.0.0-beta
**Status**: Active Development ✅

### ✅ Recently Fixed Issues
- **Frontend Code Quality**: Fixed React imports for React 18+ compatibility
- **Accessibility**: Added proper form labels, button types, and ARIA attributes
- **Component Structure**: Improved component organization and prop handling
- **Error Handling**: Enhanced form validation and error messaging
- **Performance**: Optimized component rendering and removed unused code

## 📁 Project Structure

```
/Ewae
│
├── /frontend                     # React Frontend (Port 3000)
│   └── /my-app                   # React 18 application
│       ├── /src
│       │   ├── /components       # Reusable components
│       │   ├── /contexts         # React contexts (Auth, etc.)
│       │   ├── /layouts          # Layout components
│       │   ├── /pages            # Page components
│       │   │   ├── /agent        # Security Agent pages
│       │   │   ├── /associative  # Association Group pages
│       │   │   ├── /dashboard    # Dashboard components
│       │   │   ├── /persona      # Person Management pages
│       │   │   ├── /public       # Public user pages
│       │   │   └── /twaa         # TWAA Admin pages
│       │   └── App.jsx
│       └── package.json
│
├── /backend
│   ├── /iwaa                     # .NET Core Service (Port 5000)
│   │   ├── Controllers
│   │   ├── Models
│   │   ├── Program.cs
│   │   └── iwaa.csproj
│   └── /springboot-service1      # Java Spring Boot Service (Port 8081)
│       ├── /src/main/java/com/example/service1
│       │   ├── controller
│       │   ├── service
│       │   ├── repository
│       │   └── model
│       ├── /src/main/resources
│       └── pom.xml
│
├── /docker                       # Docker configuration
│   ├── docker-compose.yml        # Development environment
│   └── nginx/                    # API Gateway configuration
│
└── /docs                         # Documentation
    ├── API.md                    # API documentation
    └── postman/                  # Postman collections
```

## 🛠️ Technologies Used

### Frontend
- **React 18.3.1** - Modern React with hooks and concurrent features
- **React Router v6** - Client-side routing
- **Bootstrap 5** - UI framework and components
- **Bootstrap Icons** - Icon library
- **Context API** - State management

### Backend
- **.NET 8** - iwaa service with Entity Framework Core
- **Spring Boot 3.2** - Java microservice with JPA/Hibernate
- **MySQL** - Primary database
- **Redis** - Caching and session storage

### DevOps & Infrastructure
- **Docker & Docker Compose** - Containerization
- **Nginx** - API Gateway and load balancing
- **Prometheus & Grafana** - Monitoring and metrics
- **ELK Stack** - Centralized logging

## 👥 User Roles & Permissions

| Role | Description | Access Level |
|------|-------------|--------------|
| **Agent de Sécurité** | Security agents managing associations and residents | High |
| **Groupe Associatif** | Association representatives managing accounts and funding | Medium |
| **Public** | General users submitting declarations and donations | Low |
| **Gestion Persona** | Personnel management specialists | Medium |
| **TWAA** | System administrators with full access | Full |

## ✨ Features

### 🏢 Association Management
- ✅ List and manage associations
- ✅ Track association status and activities
- ✅ Generate comprehensive reports
- ✅ Contact management system

### 👥 Resident Management
- ✅ Resident registration and profiles
- ✅ Search and filter capabilities
- ✅ Status tracking and updates
- ✅ Document management

### 🚨 Alert System
- ✅ Real-time security alerts
- ✅ Priority-based notification system
- ✅ Evidence attachment and tracking
- ✅ Alert resolution workflow

### 📊 Dashboard & Analytics
- ✅ Role-based dashboard views
- ✅ Statistical insights and charts
- ✅ Activity timeline and logs
- ✅ Quick action shortcuts

### 📋 Public Services
- ✅ Declaration submission system
- ✅ Donation management
- ✅ Partner directory
- ✅ Emergency contact information

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **.NET 8 SDK**
- **Java 17+** and Maven
- **Docker & Docker Compose** (recommended)
- **MySQL 8.0+**

### Option 1: Docker Development (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ewae
   ```

2. **Start all services with Docker**
   ```bash
   cd docker
   docker-compose up -d
   ```

3. **Access the applications**
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:8080
   - Spring Boot Service: http://localhost:8081
   - .NET Service: http://localhost:5000
   - Grafana: http://localhost:3001
   - Kibana: http://localhost:5601

### Option 2: Manual Development Setup

#### Frontend Setup
```bash
cd frontend/my-app
npm install
npm start
```

#### .NET Backend Setup
```bash
cd backend/iwaa
dotnet restore
dotnet run
```

#### Spring Boot Backend Setup
```bash
cd backend/springboot-service1
mvn clean install
mvn spring-boot:run
```

### 🔐 Demo Accounts

The system includes demo accounts for testing:

| Username | Role | Password |
|----------|------|----------|
| `agent.security` | Agent de Sécurité | `demo123` |
| `association.group` | Groupe Associatif | `demo123` |
| `public.user` | Public | `demo123` |
| `persona.manager` | Gestion Persona | `demo123` |
| `twaa.admin` | TWAA | `demo123` |

## 🧪 Testing

### Frontend Testing
```bash
cd frontend/my-app
npm test                 # Run unit tests
npm run test:coverage   # Run tests with coverage
```

### Backend Testing
```bash
# .NET Service
cd backend/iwaa
dotnet test

# Spring Boot Service
cd backend/springboot-service1
mvn test
```

## 📝 Development Guidelines

### Code Quality
- ✅ ESLint configuration for consistent JavaScript/React code
- ✅ Prettier for code formatting
- ✅ Accessibility standards (WCAG 2.1)
- ✅ Responsive design principles

### Git Workflow
1. Create feature branches from `develop`
2. Make small, focused commits with descriptive messages
3. Submit pull requests for code review
4. Merge to `develop` after approval
5. Deploy to production from `main` branch

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_SERVICE1_URL=http://localhost:8081
REACT_APP_DOTNET_SERVICE_URL=http://localhost:5000
```

#### Spring Boot Service
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/ewae_db
    username: ewae_user
    password: ewae_password
  
jwt:
  secret: your-secret-key
  expiration: 86400000
```

#### .NET Service
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=ewae_db;User=ewae_user;Password=ewae_password;"
  },
  "JwtSettings": {
    "Secret": "your-secret-key",
    "ExpiryMinutes": 1440
  }
}
```

## 🐛 Known Issues & Fixes Applied

### ✅ Recently Resolved
- **React Imports**: Updated all components to remove unnecessary React imports (React 18+)
- **Accessibility**: Added proper ARIA labels, form associations, and semantic HTML
- **Button Types**: Added explicit `type` attributes to all buttons
- **Array Keys**: Replaced array indices with proper unique keys
- **Form Validation**: Enhanced client-side validation and error messaging

### 🔄 In Progress
- Backend API integration and error handling
- Advanced filtering and search capabilities
- Real-time notifications via WebSocket
- File upload and document management
- Advanced reporting with PDF generation

## 📚 API Documentation

Comprehensive API documentation is available in `/docs/API.md` with:
- Authentication endpoints
- CRUD operations for all entities
- Request/response examples
- Error handling guidelines
- Rate limiting information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup for Contributors
```bash
# Install frontend dependencies
cd frontend/my-app && npm install

# Install backend dependencies
cd backend/springboot-service1 && mvn install
cd backend/iwaa && dotnet restore

# Run pre-commit hooks
npm run lint:fix
npm run format
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **Documentation**: [docs/API.md](docs/API.md)
- **Issues**: GitHub Issues tab
- **Email**: support@ewae.example.com

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- ✅ Core frontend components and routing
- ✅ User authentication and role-based access
- ✅ Basic CRUD operations
- ✅ Responsive design implementation

### Phase 2 (Next)
- 🔄 Complete backend API integration
- 🔄 Real-time notifications
- 🔄 Advanced search and filtering
- 🔄 File upload and document management

### Phase 3 (Future)
- 📅 Mobile application (React Native)
- 📅 Advanced analytics and AI insights
- 📅 Multi-language support (Arabic, French, English)
- 📅 Integration with government databases
