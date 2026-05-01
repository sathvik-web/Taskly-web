# Taskly — Full-Stack Task Manager

🔗 **Live Demo:** https://taskly-frontend-d71o.onrender.com

A full-stack task management app with user authentication, built with React, Node.js, Prisma, and PostgreSQL.

---

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 18, React Router, Tailwind CSS, Vite |
| Backend  | Node.js, Express                        |
| Database | PostgreSQL + Prisma ORM                 |
| Auth     | JWT + bcryptjs                          |

---

## Features

- User signup & login with secure password hashing
- JWT-based authentication with protected routes
- Create, view, and delete personal tasks
- Dark mode toggle (persisted via localStorage)
- Fully responsive UI

---

## Project Structure

```
.
Taskly-web/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma        # Database models (User, Task)
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── prismaClient.js
│   │   └── server.js
│   └── package.json
│
└── frontend/
├── src/
│   ├── components/
│   │   ├── LoginForm.jsx
│   │   ├── SignupForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskCard.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```
---

## Getting Started Locally

### 1 — Configure environment

```bash
# Backend
cd backend
cp .env.example .env
# Fill in DATABASE_URL and JWT_SECRET

# Frontend
cd ../frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
```

### 2 — Run backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
# → http://localhost:5000
```

### 3 — Run frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## API Reference

### Auth
| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/auth/signup` | `{ name, email, password }` |
| POST | `/api/auth/login` | `{ email, password }` |

### Tasks (require `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all user tasks |
| POST | `/api/tasks` | Create a task `{ title }` |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Deployment

- **Backend** → Render (Web Service)
- **Frontend** → Render (Static Site)
- **Database** → Render PostgreSQL

---

## License

Open source — free to use for learning and personal projects.