# User Access Management System

## Overview
This project is a User Access Management System with a Node.js + Express backend and React frontend. It supports user registration, JWT authentication, software management, access requests, and managerial approvals.

## Tech Stack
- Backend: Node.js, Express, TypeORM, PostgreSQL, JWT, bcrypt
- Frontend: React, React Router, Axios
- Database: PostgreSQL

## Project Structure
- `backend/`: Node.js backend project
- `frontend/`: React frontend project
# User Access Management System

## Overview
This project is a User Access Management System with a Node.js + Express backend and React frontend. It supports user registration, JWT authentication, software management, access requests, and managerial approvals.

## Tech Stack
- Backend: Node.js, Express, TypeORM, PostgreSQL, JWT, bcrypt
- Frontend: React, React Router, Axios
- Database: PostgreSQL

## Project Structure
- `backend/`: Node.js backend project
- `frontend/`: React frontend project

## Setup Instructions

### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a PostgreSQL database and update `.env` file with your database credentials.
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend server will run on port 5000 by default.

### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will run on port 3000 by default.

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user (default role: Employee)
- `POST /api/auth/login` - Login and receive JWT token and role

### Software (Admin only)
- `POST /api/software` - Create new software

### Requests
- `POST /api/requests` - Submit access request (Employee only)
- `PATCH /api/requests/:id` - Approve or reject request (Manager only)

## Notes
- Use the JWT token returned on login in the `Authorization` header as `Bearer <token>` for protected routes.
- Role-based access control is enforced on backend and frontend.

## Evaluation Criteria
- Functionality: Sign-up, login, request creation, approval handling
- Code Structure: Modular, clean folders, reusable components
- Security: JWT handling, password encryption
- DB Integration: Correct schema, relations with TypeORM
- Completeness: All described features are functional and testable

## License
MIT

## Setup Instructions

### Backend
1. Navigate to the backend folder:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a PostgreSQL database and update `.env` file with your database credentials.
4. Start the backend server:
   ```
   npm run dev
   ```
   The backend server will run on port 5000 by default.

### Frontend
1. Navigate to the frontend folder:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend development server:
   ```
   npm start
   ```
   The frontend will run on port 3000 by default.

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user (default role: Employee)
- `POST /api/auth/login` - Login and receive JWT token and role

### Software (Admin only)
- `POST /api/software` - Create new software

### Requests
- `POST /api/requests` - Submit access request (Employee only)
- `PATCH /api/requests/:id` - Approve or reject request (Manager only)

## Notes
- Use the JWT token returned on login in the `Authorization` header as `Bearer <token>` for protected routes.
- Role-based access control is enforced on backend and frontend.

## Evaluation Criteria
- Functionality: Sign-up, login, request creation, approval handling
- Code Structure: Modular, clean folders, reusable components
- Security: JWT handling, password encryption
- DB Integration: Correct schema, relations with TypeORM
- Completeness: All described features are functional and testable 

## License
MIT
