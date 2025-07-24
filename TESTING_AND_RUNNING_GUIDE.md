# 🧪 **Ewae Platform - Testing and Running Guide**

A comprehensive guide for testing and running the Ewae Association Management Platform on **Windows** and **Linux** systems.

---

## 📋 **Table of Contents**

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Database Setup](#database-setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Running the Application](#running-the-application)
7. [Testing Guide](#testing-guide)
8. [Demo Accounts](#demo-accounts)
9. [API Testing](#api-testing)
10. [Troubleshooting](#troubleshooting)
11. [Development Workflow](#development-workflow)

---

## 🔧 **Prerequisites**

### **System Requirements**
- **RAM**: 8GB minimum (16GB recommended)
- **Storage**: 20GB free disk space
- **OS**: Windows 10/11 or Linux (Ubuntu, Debian, Arch, Garuda, etc.)

### **Required Software**

#### **Windows Installation**
```powershell
# Install via Chocolatey (recommended)
choco install dotnet-8.0-sdk nodejs mysql git vscode

# Or install manually:
# - .NET 8 SDK: https://dotnet.microsoft.com/download/dotnet/8.0
# - Node.js 18+: https://nodejs.org/
# - MySQL 8.0+: https://dev.mysql.com/downloads/installer/
# - Git: https://git-scm.com/download/win
# - VS Code: https://code.visualstudio.com/
```

#### **Linux Installation**

**Ubuntu/Debian:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install .NET 8 SDK
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt update
sudo apt install -y dotnet-sdk-8.0

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install Git and other tools
sudo apt install -y git curl
```

**Arch/Garuda Linux:**
```bash
# Update system
sudo pacman -Syu

# Install required packages
sudo pacman -S dotnet-sdk dotnet-runtime-8.0 aspnet-runtime-8.0 nodejs npm mysql git

# Enable MySQL service
sudo systemctl enable mysqld
sudo systemctl start mysqld
```

**Fedora/RHEL:**
```bash
# Install .NET 8
sudo dnf install -y dotnet-sdk-8.0

# Install Node.js and npm
sudo dnf install -y nodejs npm

# Install MySQL
sudo dnf install -y mysql-server

# Install Git
sudo dnf install -y git
```

### **Verification**
```bash
# Verify installations
dotnet --version          # Should show 8.x.x or higher
node --version            # Should show 18.x.x or higher
npm --version             # Should show 9.x.x or higher
mysql --version           # Should show 8.x.x or compatible
git --version             # Should show installed version
```

---

## ⚡ **Quick Start**

### **1. Clone Repository**
```bash
# Clone the project
git clone <repository-url>
cd Ewae

# Or if already downloaded, navigate to project directory
cd path/to/Ewae
```

### **2. Database Quick Setup**
```bash
# Start MySQL service (Linux)
sudo systemctl start mysqld

# Or on Windows, start MySQL service from Services manager
# Or run: net start mysql80

# Create database and user
mysql -u root -p
```

```sql
-- In MySQL prompt
CREATE DATABASE ewae_dev_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ewae_user'@'localhost' IDENTIFIED BY 'ewae_password';
GRANT ALL PRIVILEGES ON ewae_dev_db.* TO 'ewae_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### **3. Backend Quick Start**
```bash
# Navigate to backend
cd backend/iwaa

# Restore packages and run
dotnet restore
dotnet ef database update
dotnet run
```

### **4. Frontend Quick Start**
```bash
# Open new terminal/command prompt
cd frontend/my-app

# Install dependencies and run
npm install
npm start
```

### **5. Access Application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5139
- **Swagger Documentation**: http://localhost:5139/swagger

---

## 🗄️ **Database Setup**

### **MySQL Configuration**

#### **Windows Setup**
```cmd
# Start MySQL service
net start mysql80

# Connect to MySQL
mysql -u root -p
```

#### **Linux Setup**
```bash
# Start MySQL service
sudo systemctl start mysqld
# or for MariaDB:
sudo systemctl start mariadb

# Secure installation (first time)
sudo mysql_secure_installation

# Connect to MySQL
mysql -u root -p
# or for MariaDB:
sudo mariadb
```

### **Database Creation**
```sql
-- Create development database
CREATE DATABASE ewae_dev_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create dedicated user
CREATE USER 'ewae_user'@'localhost' IDENTIFIED BY 'ewae_password';
GRANT ALL PRIVILEGES ON ewae_dev_db.* TO 'ewae_user'@'localhost';
FLUSH PRIVILEGES;

-- Verify database
SHOW DATABASES;
USE ewae_dev_db;
EXIT;
```

### **Test Connection**
```bash
# Test with new user
mysql -u ewae_user -p ewae_dev_db
# Enter password: ewae_password

# If successful, you'll see mysql> prompt
SELECT 'Connection successful' AS result;
EXIT;
```

---

## 🔧 **Backend Setup**

### **1. Navigate to Backend Directory**
```bash
cd backend/iwaa
```

### **2. Check Configuration**

**Windows:**
```powershell
# Check appsettings.json
type appsettings.json
```

**Linux:**
```bash
# Check appsettings.json
cat appsettings.json
```

Ensure connection string is correct:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;database=ewae_dev_db;user=ewae_user;password=ewae_password;"
  }
}
```

### **3. Install Dependencies**
```bash
# Clean and restore packages
dotnet clean
dotnet restore
dotnet build
```

### **4. Database Migration**
```bash
# Install EF Core tools (if not already installed)
dotnet tool install --global dotnet-ef

# Create and apply migration
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### **5. Verify Database Tables**
```bash
mysql -u ewae_user -p ewae_dev_db
```

```sql
-- Check created tables
SHOW TABLES;
-- Should show tables like: AspNetUsers, Associations, Residents, etc.

-- Check sample table structure
DESCRIBE AspNetUsers;
EXIT;
```

---

## 🎨 **Frontend Setup**

### **1. Navigate to Frontend Directory**
```bash
cd frontend/my-app
```

### **2. Install Dependencies**
```bash
# Install Node.js packages
npm install

# Or if you prefer yarn
yarn install
```

### **3. Environment Configuration**
Create `.env` file in `frontend/my-app/` directory:

**Windows:**
```cmd
echo REACT_APP_API_BASE_URL=http://localhost:5139 > .env
echo REACT_APP_SERVICE1_URL=http://localhost:8081 >> .env
echo REACT_APP_DOTNET_SERVICE_URL=http://localhost:5139 >> .env
```

**Linux:**
```bash
cat > .env << EOF
REACT_APP_API_BASE_URL=http://localhost:5139
REACT_APP_SERVICE1_URL=http://localhost:8081
REACT_APP_DOTNET_SERVICE_URL=http://localhost:5139
EOF
```

### **4. Verify Setup**
```bash
# Check package.json
cat package.json

# Check src structure
ls -la src/
```

---

## 🚀 **Running the Application**

### **Method 1: Manual Start (Recommended for Development)**

#### **Terminal 1 - Backend**
```bash
cd backend/iwaa
dotnet run

# Expected output:
# [INFO] Now listening on: http://localhost:5139
# [INFO] Application started. Press Ctrl+C to shut down.
```

#### **Terminal 2 - Frontend**
```bash
cd frontend/my-app
npm start

# Expected output:
# Compiled successfully!
# Local: http://localhost:3000
# On Your Network: http://192.168.x.x:3000
```

### **Method 2: Background Processes**

#### **Windows (PowerShell)**
```powershell
# Start backend in background
cd backend/iwaa
Start-Process powershell -ArgumentList "-NoExit", "-Command", "dotnet run"

# Start frontend in background
cd ../../frontend/my-app
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
```

#### **Linux/macOS**
```bash
# Start backend in background
cd backend/iwaa
nohup dotnet run > backend.log 2>&1 &

# Start frontend in background
cd ../../frontend/my-app
nohup npm start > frontend.log 2>&1 &
```

### **Method 3: Using Screen/Tmux (Linux)**
```bash
# Install screen or tmux
sudo apt install screen  # Ubuntu/Debian
sudo pacman -S screen    # Arch/Garuda

# Create sessions
screen -S backend
cd backend/iwaa && dotnet run
# Press Ctrl+A, then D to detach

screen -S frontend
cd frontend/my-app && npm start
# Press Ctrl+A, then D to detach

# List sessions
screen -ls

# Reattach to session
screen -r backend
screen -r frontend
```

---

## 🧪 **Testing Guide**

### **1. Access Verification**

#### **Frontend Access**
```bash
# Test frontend
curl http://localhost:3000 -I
# Should return: HTTP/1.1 200 OK

# Or open in browser
# Windows: start http://localhost:3000
# Linux: xdg-open http://localhost:3000
# macOS: open http://localhost:3000
```

#### **Backend API Access**
```bash
# Test backend API
curl http://localhost:5139/swagger -I
# Should return: HTTP/1.1 200 OK

# Test health endpoint
curl http://localhost:5139/health
# Should return: Healthy
```

### **2. Authentication Testing**

#### **API Login Test**
```bash
curl -X POST http://localhost:5139/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "agent",
    "password": "Demo123",
    "rememberMe": false
  }' \
  -v
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "username": "agent",
    "role": "AgentSecurite",
    "firstName": "Agent",
    "lastName": "Security"
  }
}
```

#### **Frontend Login Test**
1. Open http://localhost:3000
2. Click on "agent" demo account button
3. Password "Demo123" should auto-fill
4. Click "Connexion"
5. Should redirect to dashboard

### **3. Database Integration Test**
```bash
# Check demo data
mysql -u ewae_user -p ewae_dev_db -e "SELECT COUNT(*) as user_count FROM AspNetUsers;"
mysql -u ewae_user -p ewae_dev_db -e "SELECT UserName, FirstName, LastName FROM AspNetUsers LIMIT 5;"
```

### **4. API Endpoints Test**
```bash
# Get associations (requires authentication)
curl -X GET http://localhost:5139/api/associations \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"

# Get dashboard data
curl -X GET http://localhost:5139/api/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 🔐 **Demo Accounts**

All demo accounts use password: **`Demo123`**

| Username | Role | Description | Dashboard Access |
|----------|------|-------------|------------------|
| `agent` | Agent de Sécurité | Security operations and monitoring | Security dashboard |
| `associative` | Groupe Associatif | Association management and reporting | Association dashboard |
| `public` | Public | General user with limited access | Public services |
| `persona` | Gestion Persona | Personnel and user management | HR dashboard |
| `twaa` | TWAA Admin | System administrator with full access | Admin dashboard |

### **Testing Different Roles**
```bash
# Test each role's authentication
for user in agent associative public persona twaa; do
  echo "Testing user: $user"
  curl -X POST http://localhost:5139/api/auth/login \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"$user\",\"password\":\"Demo123\",\"rememberMe\":false}" \
    -s | grep -o '"success":[^,]*'
done
```

---

## 🔍 **API Testing**

### **Using curl**

#### **1. Login and Get Token**
```bash
# Store token in variable
TOKEN=$(curl -X POST http://localhost:5139/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"agent","password":"Demo123","rememberMe":false}' \
  -s | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo "Token: $TOKEN"
```

#### **2. Test Protected Endpoints**
```bash
# Get user profile
curl -X GET http://localhost:5139/api/auth/profile \
  -H "Authorization: Bearer $TOKEN"

# Get associations
curl -X GET http://localhost:5139/api/associations \
  -H "Authorization: Bearer $TOKEN"

# Get dashboard statistics
curl -X GET http://localhost:5139/api/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

### **Using HTTPie (Alternative)**
```bash
# Install HTTPie
# Ubuntu/Debian: sudo apt install httpie
# Arch/Garuda: sudo pacman -S httpie
# Windows: pip install httpie

# Login
http POST http://localhost:5139/api/auth/login \
  username=agent password=Demo123 rememberMe:=false

# Use token for requests
http GET http://localhost:5139/api/associations \
  Authorization:"Bearer YOUR_TOKEN_HERE"
```

### **Using Postman/Insomnia**

#### **Postman Collection Setup**
1. Import collection from `docs/postman/` (if available)
2. Set environment variables:
   - `BASE_URL`: `http://localhost:5139`
   - `TOKEN`: (will be set after login)

#### **Manual Setup**
1. **Login Request:**
   - Method: POST
   - URL: `{{BASE_URL}}/api/auth/login`
   - Body (JSON):
     ```json
     {
       "username": "agent",
       "password": "Demo123",
       "rememberMe": false
     }
     ```
   - Tests (to extract token):
     ```javascript
     pm.test("Login successful", function () {
         pm.response.to.have.status(200);
         const response = pm.response.json();
         pm.environment.set("TOKEN", response.token);
     });
     ```

2. **Protected Requests:**
   - Headers: `Authorization: Bearer {{TOKEN}}`

---

## 🔧 **Troubleshooting**

### **Common Issues**

#### **1. Port Already in Use**
```bash
# Check what's using the port
# Windows:
netstat -ano | findstr :5139
netstat -ano | findstr :3000

# Linux:
sudo netstat -tlnp | grep :5139
sudo netstat -tlnp | grep :3000
# or
sudo lsof -i :5139
sudo lsof -i :3000

# Kill process if needed
# Windows:
taskkill /PID <PID> /F

# Linux:
sudo kill -9 <PID>
```

#### **2. Database Connection Issues**
```bash
# Test MySQL connection
mysql -u ewae_user -p ewae_dev_db

# Check MySQL service status
# Windows:
sc query mysql80

# Linux:
sudo systemctl status mysqld
# or
sudo systemctl status mariadb

# Restart MySQL if needed
# Windows:
net stop mysql80 && net start mysql80

# Linux:
sudo systemctl restart mysqld
```

#### **3. .NET Issues**
```bash
# Clear NuGet cache
dotnet nuget locals all --clear

# Restore packages
dotnet restore --force

# Check .NET installation
dotnet --info

# Install missing runtimes
# Windows: Download from Microsoft
# Linux: sudo apt install dotnet-runtime-8.0
```

#### **4. Node.js Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version
npm --version

# Update Node.js if needed
# Use nvm or download from nodejs.org
```

#### **5. CORS Issues**
If frontend can't connect to backend, check CORS configuration in `appsettings.json`:
```json
{
  "CORS": {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://localhost:3000"
    ]
  }
}
```

#### **6. SSL/HTTPS Issues**
```bash
# Trust development certificate (Windows)
dotnet dev-certs https --trust

# Linux: Use HTTP for development
# Update .env file:
REACT_APP_API_BASE_URL=http://localhost:5139
```

### **Log Analysis**

#### **Backend Logs**
```bash
# View real-time logs
cd backend/iwaa
dotnet run --verbosity detailed

# Or check log files (if configured)
tail -f logs/ewae-dev*.txt
```

#### **Frontend Logs**
```bash
# View browser console
# F12 -> Console tab

# NPM logs
npm start --verbose
```

### **Performance Issues**
```bash
# Check system resources
# Windows:
taskmgr

# Linux:
htop
# or
top

# Check disk space
# Windows:
dir c:\ /-c

# Linux:
df -h
```

---

## 💼 **Development Workflow**

### **Daily Development Routine**

#### **1. Start Development Environment**
```bash
# Terminal 1: Backend
cd backend/iwaa
dotnet watch run  # Hot reload enabled

# Terminal 2: Frontend
cd frontend/my-app
npm start  # Hot reload enabled

# Terminal 3: Database (if needed)
mysql -u ewae_user -p ewae_dev_db
```

#### **2. Code Changes Workflow**
```bash
# Backend changes (automatically reloaded)
# Edit .cs files
# Changes detected and app restarted automatically

# Frontend changes (automatically reloaded)
# Edit .jsx/.js files
# Browser automatically refreshes

# Database changes
cd backend/iwaa
dotnet ef migrations add MigrationName
dotnet ef database update
```

#### **3. Testing Workflow**
```bash
# Backend tests
cd backend/iwaa
dotnet test

# Frontend tests
cd frontend/my-app
npm test

# Integration tests
# Test API endpoints with Postman/curl
# Test frontend functionality in browser
```

### **Git Workflow**
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push changes
git push origin feature/new-feature

# Create pull request for review
```

### **Production Deployment Preparation**
```bash
# Backend production build
cd backend/iwaa
dotnet publish -c Release -o ./publish

# Frontend production build
cd frontend/my-app
npm run build

# Environment configuration
# Update connection strings
# Configure HTTPS certificates
# Set production environment variables
```

---

## ✅ **Success Verification Checklist**

### **Setup Verification**
- [ ] Database created and accessible
- [ ] Demo users created successfully
- [ ] Backend starts without errors
- [ ] Frontend compiles successfully
- [ ] Both services accessible via browser

### **Functionality Testing**
- [ ] Login with demo accounts works
- [ ] JWT tokens generated correctly
- [ ] Protected routes require authentication
- [ ] Dashboard loads data
- [ ] API endpoints respond correctly

### **Integration Testing**
- [ ] Frontend communicates with backend
- [ ] Database queries execute successfully
- [ ] User roles enforced correctly
- [ ] Error handling works properly
- [ ] Logging captures important events

---

## 📞 **Support & Resources**

### **Documentation**
- [API Documentation](docs/API.md)
- [Frontend Components](frontend/my-app/README_FRONTEND.md)
- [Database Schema](docs/database-schema.md)

### **Development Tools**
- **VS Code Extensions**: C# Dev Kit, ES7+ React snippets
- **Database Tools**: MySQL Workbench, phpMyAdmin, DBeaver
- **API Testing**: Postman, Insomnia, HTTPie
- **Browser DevTools**: React Developer Tools, Redux DevTools

### **Getting Help**
1. Check this testing guide
2. Review application logs
3. Check GitHub Issues
4. Consult troubleshooting section
5. Contact development team

---

## 🎯 **Next Steps**

After successful setup and testing:

1. **Explore Features**: Test different user roles and functionalities
2. **Customize Configuration**: Modify settings for your environment
3. **Add Data**: Create test associations, residents, and reports
4. **Integration**: Connect with external services if needed
5. **Deployment**: Prepare for production deployment

---

**Happy Testing! 🚀**

*This guide ensures consistent setup and testing across Windows and Linux platforms. Keep it updated as the application evolves.*
