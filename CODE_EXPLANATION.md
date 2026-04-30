# Code Explanation Guide

This guide explains the key concepts and how all the code pieces work together.

---

## 🔐 Authentication Flow

### How Login/Signup Works (Step by Step)

#### User Signs Up:
1. **User enters**: Name, Email, Password
2. **Frontend sends** to backend: `POST /api/auth/signup`
3. **Backend checks**: Is this email already used?
4. **Backend hashes** the password (makes it unreadable)
5. **Backend saves** user to database
6. **Backend creates** JWT token (a code that proves they're logged in)
7. **Backend sends back** user info + token
8. **Frontend stores** token in `localStorage`
9. **Frontend redirects** to dashboard

#### User Logs In:
1. **User enters**: Email, Password
2. **Frontend sends** to backend: `POST /api/auth/login`
3. **Backend finds** user by email
4. **Backend checks** if password matches (using bcrypt)
5. **Backend creates** new JWT token
6. **Frontend stores** token
7. **Frontend redirects** to dashboard

#### Future Requests:
1. **Frontend needs** to do something (like create a task)
2. **Frontend includes** the token in the request header
3. **Backend receives** request with token
4. **Backend verifies** token using `authMiddleware`
5. **Backend knows** who the user is from token
6. **Backend does** the action

---

## 🔑 JWT Tokens Explained

**JWT = JSON Web Token**

It's like a ticket that proves you're logged in.

```
Header.Payload.Signature

Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4OTk4OTAwMH0.xyz...
```

- **Header**: Type of token (JWT) and algorithm (HS256)
- **Payload**: User ID and token creation time
- **Signature**: Encrypted proof that it's real (using JWT_SECRET)

**How it works:**
- Backend signs token with secret
- Frontend sends token with each request
- Backend verifies signature using same secret
- If signature is valid, user is real
- If someone changes the token, signature breaks

**Security:**
- Only backend knows the JWT_SECRET
- Token can't be faked without the secret
- Token expires after 7 days (then must login again)

---

## 🔒 Password Hashing with bcryptjs

**Why we don't store passwords:**
- If database is hacked, passwords are protected
- We can't even see user passwords ourselves

**How bcryptjs works:**
```javascript
// During signup
const password = "myPassword123"
const hashedPassword = await bcrypt.hash(password, 10)
// hashedPassword is now: $2a$10$n9qo8ucoInH...xyz (can't be reversed)

// During login
const passwordCorrect = await bcrypt.compare(providedPassword, hashedPassword)
// Returns true or false
```

**Why it's slow on purpose:**
- Salt rounds = 10 makes it intentionally slow
- If someone tries to guess password, it takes 10^10 longer
- Protects against brute force attacks

---

## 📊 Database Models

### User Model
```prisma
model User {
  id        Int     @id @default(autoincrement())
  // id: 1, 2, 3... (auto-incremented)
  
  name      String
  // name: "John Doe"
  
  email     String  @unique
  // email must be different for each user
  
  password  String
  // password: hashed, encrypted, never stored as plain text
  
  tasks     Task[]
  // relationship: this user can have many tasks
  
  createdAt DateTime @default(now())
  // automatically set to current time when created
}

model Task {
  id        Int     @id @default(autoincrement())
  // id: 1, 2, 3...
  
  title     String
  // title: "Buy groceries"
  
  userId    Int
  // which user does this task belong to?
  
  user      User    @relation(fields: [userId], references: [id])
  // foreign key: links to User.id
  
  createdAt DateTime @default(now())
}
```

**Relationship:**
- One User has Many Tasks
- One Task belongs to One User
- If user is deleted, their tasks are deleted too (onDelete: Cascade)

---

## 🚀 Express API Routes

### Route Structure

```javascript
// server.js
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

// This creates URLs like:
// POST /api/auth/signup
// POST /api/auth/login
// GET /api/tasks
// POST /api/tasks
// DELETE /api/tasks/5
```

### Route Handlers (Controllers)

```javascript
// This is called when someone POSTs to /api/auth/signup
export const signup = async (req, res) => {
  // req.body has the data sent by frontend
  // res.json() sends data back to frontend
}
```

**req (request)** - what frontend sends:
- `req.body` - the JSON data
- `req.params` - URL parameters (like `/tasks/5` → id=5)
- `req.headers` - authorization token, etc
- `req.userId` - added by middleware

**res (response)** - what we send back:
- `res.json()` - send JSON
- `res.status()` - HTTP status code (200=ok, 404=not found, 500=error)
- `res.send()` - send text

---

## 🛡️ Middleware Explained

**Middleware = code that runs before the route handler**

```javascript
// authMiddleware.js
export const authMiddleware = (req, res, next) => {
  // 1. Get token from header
  const token = req.headers.authorization?.split(" ")[1]
  
  // 2. If no token, return error
  if (!token) return res.status(401).json({ error: "No token" })
  
  // 3. Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
  // 4. Add user ID to request
  req.userId = decoded.userId
  
  // 5. Call next() to continue to route handler
  next()
}

// In taskRoutes.js
router.use(authMiddleware) // All routes below require token

// Only users with valid token can reach here
router.get("/", getTasks)
```

**Flow:**
1. Request arrives → `authMiddleware` runs
2. If token invalid → return error
3. If token valid → add userId to request → call `next()`
4. Route handler (`getTasks`) receives request with userId

---

## ⚛️ React Frontend Flow

### Authentication (Frontend)

```javascript
// LoginForm.jsx
const handleSubmit = async (e) => {
  // 1. Send email/password to backend
  const response = await authAPI.login(email, password)
  
  // 2. Backend returns token
  // 3. Save token to localStorage
  localStorage.setItem("token", response.data.token)
  
  // 4. Redirect to dashboard
  navigate("/dashboard")
}
```

### Protected Routes

```javascript
// App.jsx
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token")
  
  // If no token, redirect to login
  if (!token) return <Navigate to="/login" />
  
  // If token exists, show component
  return children
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### API Calls with Axios

```javascript
// api.js
// Create axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

// Intercept all requests to add token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Now every request automatically includes the token!
// No need to manually add Authorization header every time
```

### React Hooks Used

```javascript
// useState - store data that can change
const [email, setEmail] = useState("")
// email is the current value
// setEmail is the function to change it

// useEffect - run code when component mounts
useEffect(() => {
  fetchTasks() // runs when component loads
}, []) // empty [] means run once on mount

// useNavigate - redirect to different pages
const navigate = useNavigate()
navigate("/dashboard")
```

---

## 🔄 How Task Creation Works (End to End)

1. **User types "Buy groceries" in TaskList.jsx**
2. **User clicks "Add Task" button**
3. **handleAddTask runs:**
   ```javascript
   await taskAPI.createTask(newTask)
   // This sends: POST /api/tasks with body { title: "Buy groceries" }
   ```
4. **Axios adds token automatically:**
   ```
   Authorization: Bearer eyJhbGc...
   ```
5. **Backend receives request at POST /api/tasks**
6. **authMiddleware verifies token → adds userId to request**
7. **createTask controller runs:**
   ```javascript
   await prisma.task.create({
     data: { title, userId }
   })
   ```
8. **Prisma creates record in PostgreSQL:**
   ```sql
   INSERT INTO "Task" (title, "userId", "createdAt") 
   VALUES ('Buy groceries', 1, '2024-01-15T10:30:00Z')
   ```
9. **Backend sends back created task with id**
10. **Frontend adds task to state:**
    ```javascript
    setTasks([response.data.task, ...tasks])
    ```
11. **React re-renders UI with new task**
12. **User sees task appear in the list! ✨**

---

## 🧪 Testing Manually

### Using curl in PowerShell

```powershell
# Signup
curl -X POST http://localhost:5000/api/auth/signup `
  -H "Content-Type: application/json" `
  -d '{"name":"Test","email":"test@example.com","password":"123456"}'

# Login (save the token from response)
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"123456"}'

# Get tasks (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/tasks `
  -H "Authorization: Bearer TOKEN"

# Create task
curl -X POST http://localhost:5000/api/tasks `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer TOKEN" `
  -d '{"title":"My task"}'
```

---

## 📚 Key Takeaways

1. **Authentication**: JWT tokens prove user identity
2. **Security**: Passwords are hashed, never stored as plain text
3. **Database**: Prisma makes database operations simple and type-safe
4. **API**: Express routes handle requests and responses
5. **Frontend**: React stores token and includes it with requests
6. **Middleware**: Verifies token before allowing access to protected routes

---

Now you understand the entire flow! 🎉
