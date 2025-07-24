# 🚀 **Complete Windows Setup Guide for Ewae Platform**

This comprehensive guide will walk you through setting up and testing the Ewae Association Management Platform on Windows.

## 📋 **Prerequisites & Installation**

### **1. Install Required Software**

#### **A. .NET 8 SDK**
1. Go to [https://dotnet.microsoft.com/download/dotnet/8.0](https://dotnet.microsoft.com/download/dotnet/8.0)
2. Download "**.NET 8.0 SDK**" (not just runtime)
3. Run the installer as Administrator
4. Verify installation:
```cmd
dotnet --version
# Should show version 8.x.x
```

#### **B. Node.js (for Frontend)**
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (20.x.x or higher)
3. Run the installer with default settings
4. Verify installation:
```cmd
node --version
npm --version
```

#### **C. MySQL Server**
1. Go to [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Download "**MySQL Installer for Windows**"
3. Run as Administrator and choose "**Developer Default**"
4. Set root password to: `root123`
5. Complete the installation
6. Verify MySQL is running:
   - Open **Services** (Win+R → `services.msc`)
   - Look for "**MySQL80**" service - should be "Running"

#### **D. Git (if not already installed)**
1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download and install with default settings

#### **E. Visual Studio Code (Recommended)**
1. Go to [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Download and install
3. Install these extensions:
   - **C# Dev Kit**
   - **MySQL** (by weijan chen)
   - **Thunder Client** (for API testing)

---

## 🗂️ **Project Setup**

### **1. Clone or Download the Project**

```cmd
# Open Command Prompt or PowerShell as Administrator
cd C:\
mkdir Projects
cd Projects

# If you have the project locally, copy it here
# Or clone from repository:
# git clone <repository-url> Ewae
cd Ewae
```

### **2. Database Setup**

#### **A. Connect to MySQL**
```cmd
# Open Command Prompt as Administrator
mysql -u root -p
# Enter password: root123
```

#### **B. Create Database**
```sql
-- In MySQL prompt:
CREATE DATABASE ewae_dev_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
-- You should see 'ewae_dev_db' in the list
EXIT;
```

#### **C. Test Database Connection**
```cmd
mysql -u root -p ewae_dev_db
# Enter password: root123
# If successful, you'll see: mysql> prompt
EXIT;
```

### **3. Backend Setup**

#### **A. Navigate to Backend Directory**
```cmd
cd backend\iwaa
```

#### **B. Verify Project Structure**
```cmd
dir
# You should see: Controllers, Models, Data, DTOs, Services, Program.cs, iwaa.csproj
```

#### **C. Install .NET Packages**
```cmd
dotnet clean
dotnet restore
dotnet build
```

#### **D. Install Entity Framework Tools**
```cmd
dotnet tool install --global dotnet-ef
# Verify installation:
dotnet ef --version
```

#### **E. Create Database Migration**
```cmd
dotnet ef migrations add InitialCreate
# This creates a Migrations folder with database schema
```

#### **F. Apply Database Migration**
```cmd
dotnet ef database update
# This creates all tables in MySQL database
```

#### **G. Verify Database Tables**
```cmd
mysql -u root -p ewae_dev_db
```
```sql
SHOW TABLES;
-- You should see tables like: Users, Associations, Residents, Donations, etc.
EXIT;
```

### **4. Frontend Setup**

#### **A. Navigate to Frontend Directory**
```cmd
# From project root
cd frontend\my-app
```

#### **B. Install Node.js Dependencies**
```cmd
npm install
# This may take 2-3 minutes
```

#### **C. Verify Frontend Structure**
```cmd
dir
# You should see: src, public, package.json, node_modules
```

---

## 🚀 **Running the Application**

### **1. Start the Backend API**

#### **A. Open First Command Prompt**
```cmd
cd C:\Projects\Ewae\backend\iwaa
dotnet run
```

**Expected Output:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shutdown.
```

✅ **Backend is now running on:**
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:7000`
- Swagger UI: `https://localhost:7000/swagger`

### **2. Start the Frontend**

#### **A. Open Second Command Prompt**
```cmd
cd C:\Projects\Ewae\frontend\my-app
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view my-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

✅ **Frontend is now running on:**
- `http://localhost:3000`

### **3. Verify Both Services Are Running**

1. **Backend API**: Open `https://localhost:7000/swagger`
   - You should see the Swagger API documentation
   - Green "Authorize" button should be visible

2. **Frontend**: Open `http://localhost:3000`
   - You should see the Ewae login page
   - Demo account buttons should be visible

---

## 🧪 **Testing the Application**

### **1. Test Authentication**

#### **A. Frontend Login Test**
1. Open `http://localhost:3000`
2. Click on "**agent**" demo account button
3. Password will auto-fill as "demo123"
4. Click "**Connexion**"
5. ✅ Should redirect to dashboard

#### **B. API Login Test (Using Swagger)**
1. Open `https://localhost:7000/swagger`
2. Find "**Auth**" section
3. Click on "**POST /api/auth/login**"
4. Click "**Try it out**"
5. Replace request body with:
```json
{
  "username": "agent",
  "password": "demo123",
  "rememberMe": false
}
```
6. Click "**Execute**"
7. ✅ Should return `200 OK` with token

### **2. Test Database Integration**

#### **A. Check Demo Data Creation**
```cmd
mysql -u root -p ewae_dev_db
```
```sql
-- Check users were created
SELECT Id, UserName, Email, FirstName, LastName FROM AspNetUsers;

-- Check if associations table exists
DESCRIBE Associations;

-- Exit MySQL
EXIT;
```

#### **B. Test Associations API**
1. In Swagger UI (`https://localhost:7000/swagger`)
2. First login to get a token (from previous step)
3. Copy the token from login response
4. Click "**Authorize**" button at top
5. Enter: `Bearer YOUR_TOKEN_HERE`
6. Click "**Authorize**"
7. Find "**GET /api/associations**" endpoint
8. Click "**Try it out**" → "**Execute**"
9. ✅ Should return associations list (may be empty initially)

### **3. Test Frontend-Backend Integration**

#### **A. Dashboard Test**
1. Login to frontend (`http://localhost:3000`)
2. Use credentials: `agent` / `demo123`
3. Navigate to different menu items:
   - **Overview** - Should show statistics
   - **Associations** - Should load associations list
   - **Residents** - Should load residents list
4. ✅ All pages should load without errors

#### **B. Network Tab Test**
1. Open Browser Developer Tools (F12)
2. Go to "**Network**" tab
3. Login to the application
4. Check network requests:
   - Should see `POST` to `https://localhost:7000/api/auth/login`
   - Should see `200 OK` response
   - Should see `GET` requests to various API endpoints
5. ✅ All API calls should return `200 OK`

---

## 🔧 **Advanced Testing**

### **1. Using Thunder Client (VS Code Extension)**

#### **A. Setup Thunder Client**
1. Open VS Code
2. Install "**Thunder Client**" extension
3. Open Thunder Client tab (lightning icon)

#### **B. Test Login API**
1. Click "**New Request**"
2. Set method to "**POST**"
3. URL: `https://localhost:7000/api/auth/login`
4. Headers:
   ```
   Content-Type: application/json
   ```
5. Body (JSON):
   ```json
   {
     "username": "agent",
     "password": "demo123",
     "rememberMe": false
   }
   ```
6. Click "**Send**"
7. ✅ Should get token in response

#### **C. Test Protected Endpoints**
1. Copy token from login response
2. Create new request: "**GET**" `https://localhost:7000/api/associations`
3. Headers:
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   Content-Type: application/json
   ```
4. Click "**Send**"
5. ✅ Should get associations data

### **2. Database Direct Testing**

#### **A. MySQL Workbench (Optional)**
1. Download from [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/)
2. Connect to: `localhost:3306`
3. Username: `root`, Password: `root123`
4. Select `ewae_dev_db` database
5. Run queries:
```sql
-- See all tables
SHOW TABLES;

-- Check user accounts
SELECT UserName, Email, FirstName, LastName FROM AspNetUsers;

-- Check associations
SELECT * FROM Associations;
```

### **3. Load Testing (Optional)**

#### **A. Create Test Data**
1. Login to frontend as `twaa` user
2. Navigate to different sections and create:
   - 5-10 test associations
   - 10-20 test residents
   - Some test donations
   - Few test alerts

#### **B. Performance Test**
1. Open multiple browser tabs
2. Login with different user accounts simultaneously
3. Navigate through different pages
4. ✅ Application should handle multiple users

---

## 🔐 **Demo Accounts**

The system automatically creates demo accounts on first run:

| Username | Role | Password | Description |
|----------|------|----------|-------------|
| `agent` | Agent de Sécurité | `demo123` | Security agent with association oversight |
| `associative` | Groupe Associatif | `demo123` | Association representative |
| `public` | Public | `demo123` | General public user |
| `persona` | Gestion Persona | `demo123` | Personnel management specialist |
| `twaa` | TWAA Administrator | `demo123` | System administrator |

---

## ❌ **Troubleshooting Common Issues**

### **1. MySQL Connection Issues**

**Problem**: `Unable to connect to MySQL server`
```cmd
# Check if MySQL service is running
services.msc
# Look for MySQL80 service, start if stopped

# Test connection
mysql -u root -p
# If fails, check password and port (default 3306)
```

**Solution**:
- Ensure MySQL service is running
- Check password is `root123`
- Verify port 3306 is not blocked by firewall

### **2. .NET Build Issues**

**Problem**: `Package restore failed`
```cmd
# Clear NuGet cache
dotnet nuget locals all --clear

# Delete bin/obj folders
rmdir /s bin
rmdir /s obj

# Restore again
dotnet restore
dotnet build
```

### **3. Port Conflicts**

**Problem**: `Port already in use`
```cmd
# Check what's using ports
netstat -ano | findstr :5000
netstat -ano | findstr :7000
netstat -ano | findstr :3000

# Kill process if needed (replace PID)
taskkill /F /PID <process_id>
```

### **4. CORS Issues**

**Problem**: Frontend can't connect to API
- Check `appsettings.Development.json`
- Ensure `http://localhost:3000` is in `CORS.AllowedOrigins`
- Restart backend after changes

### **5. Database Migration Issues**

**Problem**: Migration fails
```cmd
# Drop and recreate database
mysql -u root -p
```
```sql
DROP DATABASE ewae_dev_db;
CREATE DATABASE ewae_dev_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```
```cmd
# Remove migrations and recreate
rmdir /s Migrations
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### **6. Frontend Build Issues**

**Problem**: `npm install` fails
```cmd
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir /s node_modules
del package-lock.json
npm install
```

### **7. SSL Certificate Issues**

**Problem**: HTTPS warnings in browser
- Click "Advanced" → "Proceed to localhost (unsafe)"
- Or install development certificate:
```cmd
dotnet dev-certs https --trust
```

---

## 📊 **Testing Checklist**

### **✅ Backend API Tests**
- [ ] API starts without errors
- [ ] Swagger UI loads at `https://localhost:7000/swagger`
- [ ] Login endpoint returns JWT token
- [ ] Protected endpoints require authentication
- [ ] Database tables are created
- [ ] Demo users are seeded

### **✅ Frontend Tests**
- [ ] React app starts without errors
- [ ] Login page loads at `http://localhost:3000`
- [ ] Demo account buttons work
- [ ] Dashboard loads after login
- [ ] Navigation menu works
- [ ] API calls successful (check Network tab)

### **✅ Integration Tests**
- [ ] Frontend can authenticate with backend
- [ ] Data loads from API in frontend
- [ ] Different user roles work correctly
- [ ] CORS is configured properly
- [ ] No console errors in browser

### **✅ Database Tests**
- [ ] MySQL server running
- [ ] Database `ewae_dev_db` exists
- [ ] All tables created (Users, Associations, etc.)
- [ ] Demo users exist in AspNetUsers table
- [ ] Foreign key relationships work

---

## 🔍 **API Endpoints Overview**

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### **Associations**
- `GET /api/associations` - Get associations with filtering
- `GET /api/associations/{id}` - Get association by ID
- `POST /api/associations` - Create new association
- `PUT /api/associations/{id}` - Update association
- `DELETE /api/associations/{id}` - Delete association

### **Dashboard**
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent-activities` - Get recent activities
- `GET /api/dashboard/role-metrics` - Get role-specific metrics

---

## 📱 **Browser Compatibility**

**Supported Browsers:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

**Not Supported:**
- ❌ Internet Explorer (any version)
- ❌ Chrome < 90
- ❌ Firefox < 88

---

## 🚀 **Production Deployment Notes**

For production deployment on Windows:

1. **IIS Setup**: Configure IIS with ASP.NET Core module
2. **SQL Server**: Consider upgrading to SQL Server for production
3. **HTTPS**: Configure proper SSL certificates
4. **Environment Variables**: Set production configuration
5. **Logging**: Configure file/database logging
6. **Monitoring**: Set up application monitoring

---

## 📈 **Performance Tips**

### **Development Environment**
- Use SSD for better file I/O performance
- Allocate at least 8GB RAM
- Close unnecessary applications while developing
- Use `dotnet watch run` for hot reload during development

### **Database Optimization**
- Create indexes on frequently queried columns
- Use pagination for large datasets
- Implement connection pooling
- Regular database maintenance

---

## 🔒 **Security Considerations**

### **Development**
- Default passwords are for development only
- JWT secrets should be complex in production
- HTTPS should be enforced in production
- Regular security updates

### **Production Checklist**
- [ ] Change all default passwords
- [ ] Use strong JWT secrets
- [ ] Enable HTTPS only
- [ ] Set up firewall rules
- [ ] Regular security audits
- [ ] Update dependencies regularly

---

## 📞 **Getting Help**

If you encounter issues:

1. **Check Logs**: 
   - Backend: `logs/ewae-dev-*.txt`
   - Frontend: Browser console (F12)

2. **Common Commands**:
```cmd
# Restart everything
Ctrl+C (in both command prompts)
dotnet run (backend)
npm start (frontend)

# Check running processes
tasklist | findstr dotnet
tasklist | findstr node
```

3. **Database Reset**:
```cmd
dotnet ef database drop
dotnet ef database update
```

4. **Full Clean Reset**:
```cmd
# Backend
dotnet clean
rmdir /s bin obj
rmdir /s Migrations
dotnet restore
dotnet ef migrations add InitialCreate
dotnet ef database update

# Frontend
rmdir /s node_modules
del package-lock.json
npm install
```

---

## 📚 **Additional Resources**

- [.NET 8 Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [React Documentation](https://react.dev/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [ASP.NET Core Security](https://docs.microsoft.com/en-us/aspnet/core/security/)

---

## 🎉 **Success!**

If you've completed all the steps above, you should now have:

✅ **A fully functional Ewae platform running on Windows**
✅ **Backend API with authentication and database integration**
✅ **React frontend with multiple user roles**
✅ **Complete testing setup and verification**

**Next Steps:**
- Explore different user roles and their permissions
- Create test data through the UI
- Experiment with the API using Swagger
- Customize the application for your specific needs

**Happy Coding! 🚀**