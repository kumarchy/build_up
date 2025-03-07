import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/db.config.js";

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Signup
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      status: 400,
      message: "Enter the required credentials",
    });
  }

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "Email already exists. Please use another email.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return res.json({
    status: 200,
    success: true,
    data: newUser,
    message: "User created successfully",
  });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: 400,
      message: "Enter the required credentials",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.json({
      status: 404,
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({
      status: 401,
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return res.json({
    status: 200,
    success: true,
    data: {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    },
    message: "Login successful",
  });
};
