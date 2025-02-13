# 🚀 User Authentication API with Express.js & MongoDB

This is a simple user authentication API built with **Express.js**, **MongoDB**, and **JWT**. It allows users to **register**, **log in (with email or username)**, and **search for users**.

---

## 📌 Features
- User registration with validation  
- Secure password hashing using **bcrypt**  
- JWT-based authentication  
- Login using **email or username**  
- Search user by **username or email**  
- Express Validator for request validation  

---

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/anantkrsingh/Toposel

# Navigate to the project folder
cd Toposel

# Install dependencies
yarn install  
⚙️ Environment Variables
Create a .env file in the root directory and add:

env
Copy
Edit
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
  Running the Server
bash
Copy
Edit
# Start the development server
yarn dev  

  API Endpoints
  User Registration
POST /api/auth/register
Request Body

json
Copy
Edit
{
    "email":"anant@gmail.com",
    "userName":"anant",
    "name":"anant kumar",
    "dob":"2000-02-11",
    "country":"india",
    "password":"1234",
    "gender":"male"
}
Response:

json
Copy
Edit
{
  "message": "Registration successful"
}
🔹 User Login (Email or Username)
POST /api/auth/login
Request Body

json
Copy
Edit
{
    "identifier":"anant",
    
    "password":"1234"
   
}
Response:

json
Copy
Edit
{
    "message": "Login successful",
    "user": {
        "id": "67ae4afe286d81842634e242",
        "userName": "anant",
        "email": "anant@gmail.com",
        "gender": "male",
        "dob": "2000-02-11T00:00:00.000Z",
        "country": "india"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWU0YWZlMjg2ZDgxODQyNjM0ZTI0MiIsImlhdCI6MTczOTQ3NTcxNCwiZXhwIjoxNzQwMDgwNTE0fQ.jJiCHvjYdjzaKqtYnBN1rORbdmQM-JtdCZCIuQfSMR8"
}
🔹 Search User
GET /api/auth/search?query=anant

query can be email or username
Response:
json
Copy
Edit
{
    "message": "Users found",
    "users": [
        {
            "_id": "67ae4afe286d81842634e242",
            "email": "anant@gmail.com",
            "userName": "anant",
            "gender": "male",
            "dob": "2005-09-12T00:00:00.000Z",
            "country": "india",
            "__v": 0
        }
    ]
}
📌 Authentication
All protected routes require a JWT token in the headers:

json
Copy
Edit
{
  "Authorization": "Bearer your_jwt_token"
}
📌 Tools & Technologies
Express.js - Backend framework
MongoDB & Mongoose - Database
bcrypt - Password hashing
jsonwebtoken (JWT) - Authentication
Express Validator - Input validation
Postman - API testing
📌 Author
👤 Anant Kumar


📌 License
This project is open-source and available under the MIT License.