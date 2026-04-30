// src/controllers/authController.js
// Handles user signup and login logic

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

// SIGNUP: Create a new user
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password required" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password - bcryptjs makes it slow on purpose for security
    // 10 is the salt rounds (higher = slower but more secure)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create JWT token valid for 7 days
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Signup failed" });
  }
};

// LOGIN: Verify user credentials and return token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare provided password with hashed password in database
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT token valid for 7 days
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};
