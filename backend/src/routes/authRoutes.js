// src/routes/authRoutes.js
// Defines authentication endpoints (signup, login)

import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/signup
// Creates a new user account
// Body: { name, email, password }
router.post("/signup", signup);

// POST /api/auth/login
// Authenticates user and returns JWT token
// Body: { email, password }
router.post("/login", login);

export default router;
