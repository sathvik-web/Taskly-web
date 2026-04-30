# Frontend Setup Guide

## Prerequisites
- Node.js (v16+)
- Backend running on `http://localhost:5000`

## Step 1: Install Dependencies

```bash
cd frontend
npm install
```

## Step 2: Environment Configuration

The `.env` file is already configured to use the backend at `http://localhost:5000/api`.

If your backend is at a different URL, update `.env`:
```
VITE_API_URL=http://your-backend-url/api
```

## Step 3: Start Development Server

```bash
npm run dev
```

You should see:
```
VITE v4.4.0  ready in 100 ms

➜  Local:   http://localhost:5173/
```

Open your browser to `http://localhost:5173/`

## Building for Production

```bash
npm run build
```

This creates an optimized `dist/` folder for deployment.

## Features Overview

### Pages
1. **Login Page** (`/login`)
   - Sign in with email and password
   - Redirects to dashboard on success

2. **Signup Page** (`/signup`)
   - Create new account with name, email, password
   - Auto-login after signup

3. **Dashboard** (`/dashboard`)
   - Protected page (requires login)
   - View all your tasks
   - Add new tasks
   - Delete tasks
   - Logout button

## How It Works

### Authentication Flow
1. User enters credentials
2. Frontend sends request to backend
3. Backend verifies and returns JWT token
4. Token is stored in localStorage
5. Token is sent with every protected request
6. Backend validates token before allowing access

### Task Flow
1. User adds task title
2. Frontend sends to backend with JWT token
3. Backend creates task linked to user
4. Frontend updates task list
5. User can delete tasks (only their own)

## Troubleshooting

### "Failed to create task" or "Failed to load tasks"
- Check if backend is running on http://localhost:5000
- Check browser console for error details
- Verify token is stored in localStorage

### Blank page or white screen
- Check browser console (F12)
- Make sure backend is running
- Try clearing localStorage: `localStorage.clear()`

### "Unauthorized" errors
- Your token may have expired
- Try logging out and back in
- Check if backend JWT_SECRET matches

## Local Storage

The app stores:
- `token` - JWT authentication token (7 days validity)
- `user` - Current user info (id, name, email)

To clear and start fresh:
```javascript
localStorage.clear()
```

## Component Structure

```
src/
├── App.jsx - Main routing component
├── main.jsx - React entry point
├── components/
│   ├── LoginForm.jsx - Login form
│   ├── SignupForm.jsx - Signup form
│   └── TaskList.jsx - Task management
├── pages/
│   └── Dashboard.jsx - Dashboard page
└── services/
    └── api.js - API requests with Axios
```
