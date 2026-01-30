# User Profile Management System

This project is a full-stack web application developed as part of the GUVI internship requirements. It features a complete user registration and login system with profile management, built using strict adherence to separation of concerns and modern web technologies.

## 🚀 Features

- **User Registration**: Secure account creation with validation.
- **Authentication**: Stateless login system using Redis for session management.
- **Profile Management**: View and update user details (Age, DOB, Contact).
- **Responsive Design**: Mobile-friendly UI built with Bootstrap 5.
- **Modern UI/UX**: Custom premium theme with dark mode aesthetics and toast notifications.
- **Secure Architecture**: Implementation of prepared statements and password hashing.

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Bootstrap 5, jQuery (AJAX).
- **Backend**: PHP (Vanilla).
- **Databases**:
  - **MySQL**: Stores user credentials (Name, Email, Password).
  - **MongoDB**: Stores additional user profile data (Age, DOB, Contact).
  - **Redis**: Handles session management (Token-based authentication).
- **Environment**: XAMPP (Apache).

## 📂 Project Structure

guvi/
├── backend/
│   ├── config/             # Database connection files (MySQL, MongoDB, Redis)
│   ├── login.php           # Authenticates user and generates session token
│   ├── logout.php          # Destroys session in Redis
│   ├── register.php        # Handles user registration (MySQL)
│   ├── profile_fetch.php   # Retrieves data from MySQL & MongoDB
│   └── profile_update.php  # Updates profile data in MongoDB
├── frontend/
│   ├── css/                # Custom Stylesheet
│   ├── js/                 # Logic files (login.js, register.js, profile.js, notify.js)
│   ├── login.html          # Login Page
│   ├── register.html       # Registration Page
│   └── profile.html        # User Profile Dashboard
└── composer.json           # PHP Dependencies


## ⚙️ Setup & Installation

### 1. Prerequisites
- **XAMPP/WAMP**: For Apache and MySQL.
- **MongoDB**: Installed and running locally on port `27017`.
- **Redis**: Installed and running locally on port `6379`.
- **Composer**: To install PHP dependencies.

### 2. Database Setup
1. Open **phpMyAdmin** (`http://localhost/phpmyadmin`).
2. Create a database named `mydb`.
3. Create a `users` table:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
   );
   ```

### 3. Installation
1. Clone or download the repository to your `htdocs` folder.
2. Navigate to the `backend` folder in your terminal.
3. Run `composer install` to install the MongoDB PHP library (`mongodb/mongodb`).
   ```bash
   cd backend
   composer install
   ```

### 4. Running the App
1. Start **Apache** and **MySQL** in XAMPP.
2. Ensure **MongoDB** and **Redis** servers are running.
3. Open your browser and navigate to:
   `http://localhost/guvi/frontend/register.html`

## 🔒 Security Measures
- **Password Hashing**: Passwords are hashed using `password_hash()` (Bcrypt).
- **SQL Injection Protection**: All SQL queries use Prepared Statements.
- **Session Security**: No PHP default sessions; uses cryptographically secure tokens stored in Redis.
- **XSS Protection**: Proper output encoding and specialized frontend/backend separation.

## 📜 License
This project is developed for educational purposes under the GUVI Internship program.
 
