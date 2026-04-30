# Backend Setup Guide

## Prerequisites
- Node.js (v16+)
- PostgreSQL (running on localhost:5432)

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Setup Database

### Option A: Manual PostgreSQL Setup

1. Open PostgreSQL and create a database:
```sql
CREATE DATABASE dashboard_db;
```

2. Update `.env` with your database credentials:
```
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/dashboard_db"
```

### Option B: Using Docker (Easier)

Run PostgreSQL in Docker:
```bash
docker run --name postgres-dashboard \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=dashboard_db \
  -p 5432:5432 \
  -d postgres:15
```

This creates a PostgreSQL database that you can use with the default `.env` settings.

## Step 3: Initialize Prisma

```bash
npx prisma migrate dev --name init
```

This will:
- Create all database tables
- Generate Prisma client

## Step 4: Start the Server

```bash
npm run dev
```

You should see:
```
✅ Backend server running on http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login and get token

### Tasks (require JWT token)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `DELETE /api/tasks/:id` - Delete a task

## Testing the API

Use curl, Postman, or any HTTP client:

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'

# Get tasks (replace TOKEN with actual token from login response)
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

## Troubleshooting

### "connect ECONNREFUSED 127.0.0.1:5432"
- PostgreSQL is not running
- Check your DATABASE_URL in `.env`
- Make sure your database name exists

### "P1000: Can't reach database server"
- Database connection failed
- Verify credentials in `.env`
- Ensure PostgreSQL service is running

### "UNIQUE constraint failed: User.email"
- Email already exists in database
- Use a different email to sign up
