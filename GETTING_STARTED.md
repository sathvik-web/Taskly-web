# Getting Started - Step by Step

Follow these steps in order to run the application on your machine.

## Prerequisites

Make sure you have these installed:
- **Node.js** (version 16 or higher) - [Download](https://nodejs.org/)
- **Git** (optional but recommended)
- **PostgreSQL** or **Docker** (for the database)

To check if they're installed:
```bash
node --version
npm --version
```

---

## PART 1: Database Setup (Choose One)

### Option A: Using Docker (Easiest - Recommended for Beginners)

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)

2. Open PowerShell or Command Prompt and run:
```bash
docker run --name postgres-dashboard \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=dashboard_db \
  -p 5432:5432 \
  -d postgres:15
```

3. Verify PostgreSQL is running:
```bash
docker ps
```

✅ **Done!** Your database is ready. The `.env` in backend already has the correct connection string.

---

### Option B: Using Local PostgreSQL

1. Install [PostgreSQL](https://www.postgresql.org/download/)

2. Open PostgreSQL (pgAdmin or command line)

3. Create a new database:
```sql
CREATE DATABASE dashboard_db;
```

4. Update `backend/.env` with your PostgreSQL credentials:
```
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/dashboard_db"
```

---

## PART 2: Backend Setup

Open a terminal/PowerShell and navigate to the project:

```bash
cd d:\Projects\website\backend
```

### Step 1: Install dependencies
```bash
npm install
```

This downloads all required packages (Express, Prisma, JWT, etc.)
**Wait for it to complete** ⏳

### Step 2: Initialize the database
```bash
npx prisma migrate dev --name init
```

This creates tables in PostgreSQL based on the schema.
When asked "Enter a name for the new migration", just press Enter.

### Step 3: Start the backend server
```bash
npm run dev
```

You should see:
```
✅ Backend server running on http://localhost:5000
```

**Leave this terminal running!** ✅

---

## PART 3: Frontend Setup

Open a **new terminal/PowerShell** and navigate to frontend:

```bash
cd d:\Projects\website\frontend
```

### Step 1: Install dependencies
```bash
npm install
```

**Wait for it to complete** ⏳

### Step 2: Start the frontend server
```bash
npm run dev
```

You should see:
```
VITE v4.4.0  ready in 100 ms

➜  Local:   http://localhost:5173/
```

**Copy the URL and open in your browser!** 🌐

---

## 🎉 Your App is Running!

You should now see the **Login** page.

### Test It Out

1. **Sign Up**
   - Click "Sign up" link
   - Enter: Name, Email, Password
   - Click "Sign Up"

2. **See Dashboard**
   - You're now logged in! 🎉
   - You see a welcome message with your name

3. **Add Tasks**
   - Type "Buy groceries" in the text box
   - Click "Add Task"
   - Task appears in the list!

4. **Delete Tasks**
   - Click "Delete" button on any task
   - Task is removed

5. **Logout**
   - Click "Logout" button
   - Redirected to login page

---

## 🐛 Troubleshooting

### "Cannot find module" error
```
npm install
```

### Backend won't start - "connect ECONNREFUSED"
- PostgreSQL is not running
- If using Docker: `docker start postgres-dashboard`
- If using local: Start PostgreSQL service

### "UNIQUE constraint failed: User.email"
- Email already exists
- Use a different email to sign up

### Frontend shows "Failed to create task"
- Backend is not running on port 5000
- Check that backend terminal shows the running message

### "Cannot GET /api/tasks"
- Backend is not running
- Make sure both terminals have running servers

### Blank/white screen on frontend
1. Press `F12` to open Developer Tools
2. Check Console tab for errors
3. Refresh the page
4. Clear browser cache

---

## 📁 Project Files Explained

**Backend (API Server)**
- `backend/src/server.js` - Main server file
- `backend/src/controllers/` - Business logic
- `backend/src/routes/` - URL endpoints
- `backend/src/middleware/` - Token verification
- `backend/prisma/schema.prisma` - Database structure

**Frontend (User Interface)**
- `frontend/src/App.jsx` - Main routing
- `frontend/src/components/` - React components
- `frontend/src/pages/` - Pages
- `frontend/src/services/api.js` - API calls

---

## 🔗 How It Works (Simple Explanation)

1. **You sign up** → Frontend sends name/email/password to Backend
2. **Backend hashes password** → Saves user to PostgreSQL
3. **Backend creates JWT token** → Sends back to Frontend
4. **Frontend stores token** → Uses it for future requests
5. **You add a task** → Frontend sends task title + token to Backend
6. **Backend checks token** → Finds out who you are
7. **Backend creates task** → Linked to your user ID
8. **Frontend shows task** → Updates the list
9. **You delete task** → Frontend sends delete request
10. **Backend deletes it** → Removes from database

---

## 🎓 Next Steps to Learn

1. **Modify a component**: Try changing the login button color in `frontend/src/components/LoginForm.jsx`
2. **Add a field**: Try adding a "description" field to tasks
3. **Change styling**: Update colors in the JSX components
4. **Read the code**: Start with `backend/src/server.js` to understand the structure

---

## 📞 Common Questions

**Q: How long does the JWT token last?**
A: 7 days. Then you need to login again.

**Q: Can I share tasks with other users?**
A: Not in this basic version. Each user only sees their own tasks.

**Q: Where is my data stored?**
A: In PostgreSQL database on your computer (or Docker container).

**Q: Can I deploy this to the internet?**
A: Yes! See the main README.md for deployment instructions.

**Q: How do I stop the servers?**
A: Press `Ctrl+C` in each terminal.

---

## ✨ You're All Set!

You now have a fully functional full-stack web application running locally!

**Happy coding!** 🚀
