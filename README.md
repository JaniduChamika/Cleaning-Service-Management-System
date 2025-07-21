# Cleaning Service Management System

This is a Node.js + MySQL-based Cleaning Service Management System with a RESTful API and a React frontend. Users can create, view, update, and delete bookings. The application includes authentication with token-based login.

---

## 🚀 Features

- User authentication (login/logout)
- Booking CRUD operations
- Responsive React UI using Tailwind CSS
- Token-based authentication using HTTP headers
- Secure password storage

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Auth**: JSON Web Token (JWT)

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git](https://github.com/JaniduChamika/Cleaning-Service-Management-System.git
cd Cleaning-Service-Management-System
```
### 2. Install dependencies
Run this command in both the backend/ and frontend/ folders:

```bash
npm install
```
### 3. Setup the MySQL database
Import the SQL file located at:
```text
/backend/database/booking_app.sql
```
You can use MySQL Workbench, phpMyAdmin, or CLI:

```bash
mysql -u yourusername -p yourdatabase < backend/database/booking_app.sql
```
### 4. Configure environment variables
Open the .env file in the backend/ folder.

Update the values based on your local MySQL configuration:

```ini
DB_HOST="localhost"
DB_USER="yourusername"
DB_PASSWORD="your_mysql_password"
DB_NAME="csms"
PORT=3000
JWT_KEY="jwt-secret-key"
```
⚠️ Make sure you change the DB_PASSWORD to match your MySQL root or user password.

### 5. Start the Backend Server
```bash
cd backend
npm start
```
The backend will run on:
- http://localhost:3000

### 6. Start the Frontend (React App)

```bash
cd frontend
npm run dev
```
The frontend will run on:
- http://localhost:5173 (Vite default)

---

### 🔐 Admin Panel Access

⚠️ Note: For simplicity during development, the Admin Panel can be accessed directly without login authentication.
You can access the Admin Panel directly by visiting:
```bash
http://localhost:5173/AdminPanel
```
- No login is required.
- This bypass is intended for demonstration purposes only.
- In a production environment, proper authentication and role-based access control should be enforced
---

📅 Last Updated
Date and Time: 07:10 PM +0530, Sunday, July 20, 2025
