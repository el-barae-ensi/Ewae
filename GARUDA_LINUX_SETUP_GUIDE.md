# 🐉 **Complete Garuda Linux Setup Guide for Ewae Platform**

This comprehensive guide will walk you through setting up and testing the Ewae Association Management Platform on Garuda Linux.

## 📋 **Prerequisites & Installation**

### **1. System Requirements**

- **Garuda Linux** (any variant - KDE Dragonized, GNOME, etc.)
- **8GB RAM** minimum (16GB recommended)
- **20GB free disk space**
- **Internet connection** for package downloads

### **2. Update System**

```bash
# Update system packages
sudo pacman -Syu

# Update AUR packages (if using)
yay -Syu
```

### **3. Install Required Software**

#### **A. .NET 8 SDK**

```bash
# Install .NET 8 SDK from official repository
sudo pacman -S dotnet-sdk

# Verify installation
dotnet --version
# Should show version 8.x.x
```

#### **B. Node.js and npm**

```bash
# Install Node.js and npm
sudo pacman -S nodejs npm

# Verify installation
node --version
npm --version

# Optional: Install yarn as alternative package manager
sudo pacman -S yarn
```

#### **C. MySQL Server**

```bash
# Install MySQL server and client
sudo pacman -S mysql

# Initialize MySQL data directory
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql

# Enable and start MySQL service
sudo systemctl enable mysqld
sudo systemctl start mysqld

# Secure MySQL installation
sudo mysql_secure_installation
# Follow prompts:
# - Set root password to: root123
# - Remove anonymous users: Y
# - Disallow root login remotely: N (for development)
# - Remove test database: Y
# - Reload privilege tables: Y

# Verify MySQL is running
sudo systemctl status mysqld
```

#### **D. Git (usually pre-installed)**

```bash
# Check if git is installed
git --version

# If not installed:
sudo pacman -S git
```

#### **E. Development Tools**

```bash
# Install Visual Studio Code
yay -S visual-studio-code-bin

# Or install from official repository
sudo pacman -S code

# Install useful VS Code extensions
code --install-extension ms-dotnettools.csharp
code --install-extension ms-dotnettools.csdevkit 
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
```

#### **F. Optional: Database Management Tools**

```bash
# Install MySQL Workbench
sudo pacman -S mysql-workbench

# Or install DBeaver (universal database tool)
yay -S dbeaver
```

---

## 🗂️ **Project Setup**

### **1. Clone or Setup Project**

```bash
# Create projects directory
mkdir -p ~/Projects
cd ~/Projects

# If you have the project locally, copy it here
# Or clone from repository:
# git clone <repository-url> Ewae
cd Ewae

# Verify project structure
ls -la
# Should see: backend/, frontend/, docker/, docs/
```

### **2. Database Setup**

#### **A. Connect to MySQL**

```bash
# Connect to MySQL as root
mysql -u root -p
# Enter password: root123
```

#### **B. Create Database and User**

```sql
-- In MySQL prompt:
CREATE DATABASE ewae_dev_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create dedicated user (optional but recommended)
CREATE USER 'ewae_user'@'localhost' IDENTIFIED BY 'ewae_password';
GRANT ALL PRIVILEGES ON ewae_dev_db.* TO 'ewae_user'@'localhost';
FLUSH PRIVILEGES;

-- Verify database creation
SHOW DATABASES;
-- You should see 'ewae_dev_db' in the list

-- Exit MySQL
EXIT;
```

#### **C. Test Database Connection**

```bash
# Test connection with new user
mysql -u ewae_user -p ewae_dev_db
# Enter password: ewae_password
# If successful, you'll see: mysql> prompt
exit
```

### **3. Backend Setup**

#### **A. Navigate to Backend Directory**

```bash
cd ~/Projects/Ewae/backend/iwaa
```

#### **B. Verify Project Structure**

```bash
ls -la
# You should see: Controllers/, Models/, Data/, DTOs/, Services/, Program.cs, iwaa.csproj
```

#### **C. Update Connection String for Linux**

```bash
# Edit the development configuration
nano appsettings.Development.json
```

Update the connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;port=3306;database=ewae_dev_db;user=ewae_user;password=ewae_password;"
  }
}
```

#### **D. Install .NET Packages**

```bash
# Clean and restore packages
dotnet clean
dotnet restore
dotnet build

# If build fails due to missing packages, try:
sudo pacman -S aspnet-core-runtime
```

#### **E. Install Entity Framework Tools**

```bash
# Install EF Core tools globally
dotnet tool install --global dotnet-ef

# Add to PATH if needed
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.bashrc
source ~/.bashrc

# Verify installation
dotnet ef --version
```

#### **F. Create Database Migration**

```bash
# Create initial migration
dotnet ef migrations add InitialCreate

# This creates a Migrations/ folder with database schema
ls Migrations/
```

#### **G. Apply Database Migration**

```bash
# Apply migration to create tables
dotnet ef database update

# Verify migration was successful
echo "Migration completed successfully!"
```

#### **H. Verify Database Tables**

```bash
mysql -u ewae_user -p ewae_dev_db
```

```sql
-- Check created tables
SHOW TABLES;
-- You should see tables like: AspNetUsers, Associations, Residents, Donations, etc.

-- Check a specific table structure
DESCRIBE AspNetUsers;

-- Exit MySQL
EXIT;
```

### **4. Frontend Setup**

#### **A. Navigate to Frontend Directory**

```bash
# From project root
cd ~/Projects/Ewae/frontend/my-app
```

#### **B. Install Node.js Dependencies**

```bash
# Install dependencies
npm install

# If you encounter permission issues:
sudo chown -R $USER:$USER ~/.npm
npm install

# Or use yarn if preferred:
# yarn install
```

#### **C. Update API Base URL (if needed)**

```bash
# Check if .env file exists
ls -la | grep env

# If no .env file, create one:
nano .env
```

Add this content to `.env`:
```env
REACT_APP_API_BASE_URL=https://localhost:7000
REACT_APP_SERVICE1_URL=http://localhost:8081
REACT_APP_DOTNET_SERVICE_URL=https://localhost:7000
```

#### **D. Verify Frontend Structure**

```bash
ls -la
# You should see: src/, public/, package.json, node_modules/
```

---

## 🚀 **Running the Application**

### **1. Start the Backend API**

#### **A. Open First Terminal**

```bash
# Navigate to backend directory
cd ~/Projects/Ewae/backend/iwaa

# Run the application
dotnet run

# Or run with hot reload for development:
dotnet watch run
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

#### **A. Open Second Terminal (Ctrl+Alt+T)**

```bash
# Navigate to frontend directory
cd ~/Projects/Ewae/frontend/my-app

# Start React development server
npm start

# Or with yarn:
# yarn start
```

**Expected Output:**
```
Compiled successfully!

You can now view my-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

✅ **Frontend is now running on:**
- `http://localhost:3000`

### **3. Verify Both Services Are Running**

```bash
# Check running processes
ps aux | grep dotnet
ps aux | grep node

# Check ports are listening
sudo netstat -tlnp | grep -E ':(3000|5000|7000)'

# Or use ss command:
ss -tlnp | grep -E ':(3000|5000|7000)'
```

#### **A. Test Backend API**

```bash
# Open browser or use curl
firefox https://localhost:7000/swagger &

# Or test with curl
curl -k https://localhost:7000/api/dashboard/health
```

#### **B. Test Frontend**

```bash
# Open frontend in browser
firefox http://localhost:3000 &

# You should see the Ewae login page with demo account buttons
```

---

## 🧪 **Testing the Application**

### **1. Test Authentication**

#### **A. Frontend Login Test**

1. Open `http://localhost:3000` in browser
2. Click on "**agent**" demo account button
3. Password will auto-fill as "demo123"
4. Click "**Connexion**"
5. ✅ Should redirect to dashboard

#### **B. API Login Test with curl**

```bash
# Test login endpoint
curl -X POST https://localhost:7000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "agent",
    "password": "demo123",
    "rememberMe": false
  }' \
  -k -v

# Should return JWT token
```

#### **C. Test with HTTPie (if installed)**

```bash
# Install HTTPie
sudo pacman -S httpie

# Test login
http POST https://localhost:7000/api/auth/login \
  username=agent \
  password=demo123 \
  rememberMe:=false \
  --verify=no

# Save token for further requests
TOKEN=$(http POST https://localhost:7000/api/auth/login username=agent password=demo123 rememberMe:=false --verify=no | jq -r '.data.token')
echo $TOKEN
```

### **2. Test Database Integration**

#### **A. Check Demo Data Creation**

```bash
mysql -u ewae_user -p ewae_dev_db
```

```sql
-- Check users were created
SELECT Id, UserName, Email, FirstName, LastName FROM AspNetUsers;

-- Check roles
SELECT * FROM AspNetRoles;

-- Check user roles
SELECT u.UserName, r.Name 
FROM AspNetUsers u
JOIN AspNetUserRoles ur ON u.Id = ur.UserId
JOIN AspNetRoles r ON ur.RoleId = r.Id;

-- Exit MySQL
EXIT;
```

#### **B. Test Associations API**

```bash
# Using HTTPie with authentication
http GET https://localhost:7000/api/associations \
  "Authorization:Bearer $TOKEN" \
  --verify=no

# Using curl
curl -X GET https://localhost:7000/api/associations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -k
```

### **3. Test Frontend-Backend Integration**

#### **A. Browser Developer Tools Test**

1. Open Firefox/Chrome with Developer Tools (F12)
2. Go to "**Network**" tab
3. Login to the application at `http://localhost:3000`
4. Check network requests:
   - Should see `POST` to `https://localhost:7000/api/auth/login`
   - Should see `200 OK` response
   - Should see `GET` requests to various API endpoints
5. ✅ All API calls should return `200 OK`

#### **B. Dashboard Navigation Test**

1. Login as different users:
   - `agent` / `demo123`
   - `associative` / `demo123`
   - `twaa` / `demo123`
2. Navigate through different sections
3. Verify role-specific content loads correctly

---

## 🔧 **Advanced Testing & Development**

### **1. Using Insomnia (Alternative to Postman)**

```bash
# Install Insomnia REST client
yay -S insomnia

# Or use AppImage
wget https://github.com/Kong/insomnia/releases/download/core%40VERSION/Insomnia.Core-VERSION.AppImage
chmod +x Insomnia.*.AppImage
./Insomnia.*.AppImage
```

#### **Test Workflow:**
1. Create new request collection
2. Add login request: `POST https://localhost:7000/api/auth/login`
3. Extract token from response
4. Test protected endpoints with Bearer token

### **2. Database Management with Command Line**

#### **A. Useful MySQL Commands**

```bash
# Export database schema
mysqldump -u ewae_user -p --no-data ewae_dev_db > schema.sql

# Export data only
mysqldump -u ewae_user -p --no-create-info ewae_dev_db > data.sql

# Import database
mysql -u ewae_user -p ewae_dev_db < backup.sql

# Monitor MySQL processes
mysql -u ewae_user -p -e "SHOW PROCESSLIST;"
```

#### **B. Database Backup and Restore**

```bash
# Create backup
mysqldump -u ewae_user -p ewae_dev_db > ~/ewae_backup_$(date +%Y%m%d).sql

# Restore from backup
mysql -u ewae_user -p ewae_dev_db < ~/ewae_backup_YYYYMMDD.sql
```

### **3. Development Workflow with Tmux**

```bash
# Install tmux for better terminal management
sudo pacman -S tmux

# Create development session
tmux new-session -d -s ewae

# Split terminal for backend and frontend
tmux split-window -h
tmux send-keys -t 0 'cd ~/Projects/Ewae/backend/iwaa && dotnet watch run' Enter
tmux send-keys -t 1 'cd ~/Projects/Ewae/frontend/my-app && npm start' Enter

# Attach to session
tmux attach-session -t ewae
```

### **4. Monitoring and Logging**

#### **A. Monitor Application Logs**

```bash
# Backend logs (if configured)
tail -f ~/Projects/Ewae/backend/iwaa/logs/ewae-dev-*.txt

# System logs
journalctl -f -u mysqld
```

#### **B. Monitor System Resources**

```bash
# Install system monitoring tools
sudo pacman -S htop iotop nethogs

# Monitor CPU and memory
htop

# Monitor network usage
sudo nethogs

# Monitor disk I/O
sudo iotop
```

---

## 🔐 **Demo Accounts**

The system creates these demo accounts automatically:

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

**Problem**: `Can't connect to MySQL server`

```bash
# Check MySQL service status
sudo systemctl status mysqld

# Start MySQL if not running
sudo systemctl start mysqld

# Check MySQL is listening on port 3306
sudo netstat -tlnp | grep :3306

# Check MySQL error log
sudo journalctl -u mysqld -f

# Reset root password if needed
sudo systemctl stop mysqld
sudo mysqld_safe --skip-grant-tables &
mysql -u root
```

```sql
-- In MySQL prompt:
USE mysql;
UPDATE user SET authentication_string=PASSWORD('root123') WHERE User='root';
FLUSH PRIVILEGES;
EXIT;
```

```bash
sudo systemctl restart mysqld
```

### **2. .NET Build Issues**

**Problem**: Package restore or build failures

```bash
# Clear NuGet cache
dotnet nuget locals all --clear

# Remove bin and obj directories
rm -rf bin/ obj/

# Restore packages
dotnet restore --force

# If still failing, check .NET installation
dotnet --info

# Install missing dependencies
sudo pacman -S icu
```

### **3. Port Conflicts**

**Problem**: Ports already in use

```bash
# Check what's using the ports
sudo lsof -i :3000
sudo lsof -i :5000
sudo lsof -i :7000

# Kill processes if needed
sudo kill -9 <PID>

# Or use different ports by editing configuration
```

### **4. Node.js/npm Issues**

**Problem**: Permission errors or module issues

```bash
# Fix npm permissions
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER ~/.config

# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules/
rm package-lock.json
npm install

# If global packages have issues
npm config set prefix ~/.local
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### **5. SSL/TLS Certificate Issues**

**Problem**: HTTPS certificate warnings

```bash
# Trust .NET development certificate
dotnet dev-certs https --trust

# For Garuda Linux, you might need to:
dotnet dev-certs https --clean
dotnet dev-certs https --trust

# If still having issues, disable HTTPS temporarily for development
# Edit appsettings.Development.json and set "RequireHttps": false
```

### **6. Firewall Issues**

**Problem**: Can't access services from other machines

```bash
# Check firewall status
sudo ufw status

# Allow ports if needed
sudo ufw allow 3000
sudo ufw allow 5000
sudo ufw allow 7000

# Or disable firewall temporarily for development
sudo ufw disable
```

### **7. Entity Framework Migration Issues**

**Problem**: Migration fails or database out of sync

```bash
# Check migration status
dotnet ef migrations list

# Remove all migrations and start fresh
rm -rf Migrations/
dotnet ef migrations add InitialCreate
dotnet ef database update

# If database exists and you want to start fresh
dotnet ef database drop
dotnet ef database update
```

---

## 📊 **Testing Checklist**

### **✅ System Setup**
- [ ] .NET 8 SDK installed and working
- [ ] Node.js and npm installed
- [ ] MySQL server running
- [ ] All required packages installed

### **✅ Backend API Tests**
- [ ] API starts without errors (`dotnet run`)
- [ ] Swagger UI accessible at `https://localhost:7000/swagger`
- [ ] Login endpoint returns JWT token
- [ ] Protected endpoints require authentication
- [ ] Database tables created successfully
- [ ] Demo users seeded in database

### **✅ Frontend Tests**
- [ ] React app starts without errors (`npm start`)
- [ ] Login page loads at `http://localhost:3000`
- [ ] Demo account buttons function correctly
- [ ] Dashboard loads after authentication
- [ ] Navigation menu works properly
- [ ] API calls successful (check browser Network tab)

### **✅ Integration Tests**
- [ ] Frontend successfully authenticates with backend
- [ ] Data loads from API in frontend components
- [ ] Different user roles display appropriate content
- [ ] CORS configured correctly
- [ ] No console errors in browser
- [ ] Database queries execute properly

### **✅ Performance Tests**
- [ ] Application responsive under normal load
- [ ] Database queries execute efficiently
- [ ] Memory usage reasonable
- [ ] No memory leaks detected

---

## 🔍 **API Endpoints Reference**

### **Authentication**
```bash
# Login
POST https://localhost:7000/api/auth/login

# Get profile
GET https://localhost:7000/api/auth/profile

# Update profile  
PUT https://localhost:7000/api/auth/profile

# Change password
POST https://localhost:7000/api/auth/change-password
```

### **Associations**
```bash
# Get all associations
GET https://localhost:7000/api/associations

# Get specific association
GET https://localhost:7000/api/associations/{id}

# Create association
POST https://localhost:7000/api/associations

# Update association
PUT https://localhost:7000/api/associations/{id}

# Delete association
DELETE https://localhost:7000/api/associations/{id}
```

### **Dashboard**
```bash
# Get dashboard statistics
GET https://localhost:7000/api/dashboard/stats

# Get recent activities
GET https://localhost:7000/api/dashboard/recent-activities

# Get role-specific metrics
GET https://localhost:7000/api/dashboard/role-metrics
```

---

## 🚀 **Development Workflow**

### **1. Daily Development Routine**

```bash
# Start development session
cd ~/Projects/Ewae

# Check system status
sudo systemctl status mysqld
dotnet --version
node --version

# Start backend (in terminal 1)
cd backend/iwaa
dotnet watch run

# Start frontend (in terminal 2)  
cd frontend/my-app
npm start

# Monitor logs (in terminal 3)
tail -f backend/iwaa/logs/ewae-dev-*.txt
```

### **2. Code Changes Workflow**

```bash
# Backend changes
# Files are automatically reloaded with 'dotnet watch run'

# Frontend changes
# Files are automatically reloaded with 'npm start'

# Database schema changes
dotnet ef migrations add DescriptiveMigrationName
dotnet ef database update

# Run tests
dotnet test  # Backend tests
npm test     # Frontend tests
```

### **3. Git Workflow**

```bash
# Check status
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add user authentication system"

# Push changes
git push origin feature-branch
```

---

## 📈 **Performance Optimization**

### **1. Backend Optimization**

```bash
# Build in Release mode for testing
dotnet build -c Release
dotnet run -c Release

# Enable response compression
# Add to Program.cs: app.UseResponseCompression();

# Database optimization
# Add indexes to frequently queried columns
# Use connection pooling
# Implement caching for read-heavy operations
```

### **2. Frontend Optimization**

```bash
# Build production version
npm run build

# Serve production build for testing
npm install -g serve
serve -s build -l 3000

# Analyze bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

### **3. Database Optimization**

```sql
-- Add indexes for better performance
CREATE INDEX idx_associations_region ON Associations(Region);
CREATE INDEX idx_residents_status ON Residents(Status);
CREATE INDEX idx_donations_date ON Donations(Date);

-- Monitor slow queries
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
```

---

## 🔒 **Security Best Practices**

### **1. Development Security**

```bash
# Use strong passwords (change from defaults)
# Keep dependencies updated
sudo pacman -Syu
npm audit fix

# Use HTTPS in production
# Implement proper input validation
# Use parameterized queries (already implemented with EF Core)
```

### **2. Database Security**

```sql
-- Create specific user for application (already done)
-- Limit user permissions
-- Regular backups
-- Monitor for suspicious activity
```

### **3. Network Security**

```bash
# Use firewall appropriately
sudo ufw enable
sudo ufw allow from 192.168.1.0/24 to any port 3000

# Monitor network connections
sudo netstat -tuln
ss -tuln
```

---

## 📚 **Additional Resources for Garuda Linux**

### **1. Garuda Linux Specific**

- [Garuda Linux Wiki](https://wiki.garudalinux.org/)
- [Garuda Linux Forum](https://forum.garudalinux.org/)
- [Arch Wiki](https://wiki.archlinux.org/) (Garuda is Arch-based)

### **2. Development Resources**

- [.NET on Linux Documentation](https://docs.microsoft.com/en-us/dotnet/core/install/linux)
- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [React Documentation](https://reactjs.org/docs)
- [MySQL on Arch Linux](https://wiki.archlinux.org/title/MySQL)

### **3. Package Management**

```bash
# Pacman (official repos)
sudo pacman -S package-name
sudo pacman -Ss search-term
sudo pacman -R package-name

# Yay (AUR helper)
yay -S aur-package-name
yay -Ss search-term
yay -R package-name

# Flatpak (if enabled)
flatpak install app-name
flatpak list
flatpak uninstall app-name
```

---

## 🎉 **Success Verification**

If you've completed all steps successfully, you should have:

✅ **Complete development environment on Garuda Linux**
✅ **Backend .NET API running with MySQL database**
✅ **React frontend connecting to backend API**
✅ **All demo accounts working correctly**
✅ **Full authentication and authorization system**
✅ **Database with proper schema and relationships**
✅ **Development tools configured and working**

### **Final Test:**

1. **Open three terminals:**
   - Terminal 1: Backend running (`dotnet watch run`)
   - Terminal 2: Frontend running (`npm start`)
   - Terminal 3: Available for commands

2. **Open two browser tabs:**
   - Tab 1: `https://localhost:7000/swagger` (API documentation)
   - Tab 2: `http://localhost:3000` (Frontend application)

3. **Test complete workflow:**
   - Login with different user roles
   - Navigate through different sections
   - Test API endpoints via Swagger
   - Verify data persistence in database

4. **All green? You're ready to develop! 🚀**

---

## 🐉 **Garuda Linux Specific Tips**

### **1. Gaming-Focused Optimizations**
Garuda Linux is gaming-optimized, which might affect development:

```bash
# Check CPU governor (might be set to performance)
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor

# If needed, set to powersave for development
sudo cpupower frequency-set -g powersave
```

### **2. Chaotic-AUR Repository**
Garuda includes Chaotic-AUR for bleeding-edge packages:

```bash
# Some packages might be newer than expected
# If compatibility issues, install from official repos:
sudo pacman -S package-name --needed
```

### **3. Garuda Assistant**
Use Garuda's built-in assistant for system maintenance:

```bash
# Open Garuda Assistant
garuda-assistant

# Or from terminal
sudo garuda-update
```

### **4. Performance Monitoring**
Garuda includes performance tools:

```bash
# Use built-in system monitor
garuda-system-maintenance

# Check system performance
htop
btop  # Modern alternative to htop
```

**Happy coding on Garuda Linux! 🐉🚀**