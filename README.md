# User Dashboard App - Full Stack

A simple, beginner-friendly full-stack web application with user authentication and task management.

## 🚀 Quick Start

### Step 1: Setup Backend

```bash
cd backend
npm install
```

**Setup PostgreSQL** (choose one):

**Option A - Docker (Recommended)**
```bash
docker run --name postgres-dashboard \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=dashboard_db \
  -p 5432:5432 \
  -d postgres:15
```

**Option B - Local PostgreSQL**
1. Create database: `CREATE DATABASE dashboard_db;`
2. Update `.env` with credentials

**Initialize database:**
```bash
npx prisma migrate dev --name init
```

**Start backend:**
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Step 2: Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

**That's it!** Open your browser to the frontend URL.

## 📚 Tech Stack

### Backend
- **Node.js + Express** - Web server and API routes
- **Prisma ORM** - Database management (type-safe)
- **PostgreSQL** - Relational database
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing and security

### Frontend
- **React 18** - UI framework
- **React Router** - Page navigation
- **Axios** - HTTP requests to backend
- **Vite** - Fast development server

## ✨ Features

### User Authentication
- ✅ Signup with name, email, password
- ✅ Secure password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Login with email/password
- ✅ Protected routes (only logged-in users can access)

### Task Management
- ✅ Create tasks with title
- ✅ View all your tasks
- ✅ Delete tasks
- ✅ Tasks linked to specific users
- ✅ Created date tracking

### Security
- ✅ Passwords are hashed, never stored as plain text
- ✅ JWT tokens expire after 7 days
- ✅ Protected routes prevent unauthorized access
- ✅ CORS enabled for development

## 📁 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js - Signup/login logic
│   │   │   └── taskController.js - Task CRUD operations
│   │   ├── middleware/
│   │   │   └── authMiddleware.js - JWT token verification
│   │   ├── routes/
│   │   │   ├── authRoutes.js - Auth endpoints
│   │   │   └── taskRoutes.js - Task endpoints
│   │   └── server.js - Express server setup
│   ├── prisma/
│   │   └── schema.prisma - Database models
│   ├── package.json
│   └── .env - Database & JWT config
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── LoginForm.jsx - Login page
    │   │   ├── SignupForm.jsx - Signup page
    │   │   └── TaskList.jsx - Tasks display
    │   ├── pages/
    │   │   └── Dashboard.jsx - Main dashboard
    │   ├── services/
    │   │   └── api.js - Axios API client
    │   ├── App.jsx - Routing setup
    │   └── main.jsx - React entry point
    ├── public/
    │   └── index.html - HTML template
    ├── package.json
    ├── vite.config.js
    └── .env - Backend URL config
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup
POST   /api/auth/login
```

### Tasks (Protected - requires token)
```
GET    /api/tasks        - Get user's tasks
POST   /api/tasks        - Create new task
DELETE /api/tasks/:id    - Delete task
```

## 📝 Example API Usage

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

Response:
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "Buy groceries"}'
```

## 🛠️ Troubleshooting

### Backend won't start
- Check if PostgreSQL is running
- Verify DATABASE_URL in `.env`
- Run `npx prisma migrate dev --name init`

### Frontend can't reach backend
- Make sure backend is running on port 5000
- Check `.env` in frontend (VITE_API_URL)
- Check browser console for CORS errors

### Login not working
- Verify email and password are correct
- Check if user exists in database
- Check backend logs for errors

### Tokens not working
- Make sure JWT_SECRET in backend `.env` is set
- Tokens expire after 7 days - login again
- Check if token is stored in localStorage

## 🚀 Deployment

### Backend (Node.js)
- Deploy to Heroku, Railway, or DigitalOcean
- Set environment variables (DATABASE_URL, JWT_SECRET, PORT)
- Use PostgreSQL database service

### Frontend (React/Vite)
- Run `npm run build` to create production bundle
- Deploy to Vercel, Netlify, or GitHub Pages
- Update VITE_API_URL to point to production backend

## 📖 Learning Path

If you're learning:
1. Start by understanding the database schema in `prisma/schema.prisma`
2. Follow the authentication flow: signup → login → token storage
3. Learn how API calls work in `frontend/src/services/api.js`
4. Understand routing in `frontend/src/App.jsx`
5. Trace a task creation from form → API call → database

## 💡 Key Concepts

- **JWT Authentication**: Secure token-based login system
- **Password Hashing**: bcryptjs makes passwords unrecoverable
- **CORS**: Allows frontend to communicate with backend
- **Protected Routes**: Middleware checks token before allowing access
- **React Hooks**: useState, useEffect for component state
- **Axios Interceptors**: Auto-attach token to requests

## 📚 Next Steps to Improve

- Add task editing functionality
- Add user profile page
- Add password reset
- Add email verification
- Add task categories/tags
- Add dark mode
- Add animations
- Add error boundaries
- Add loading states
- Write unit tests

## 📄 License

Open source and free to use for learning purposes.

---

**Happy coding!** 🎉
