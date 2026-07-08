import { Router } from "express";
import prisma from "../lib/prisma";

import {
  authenticate,
  AuthRequest,
} from "../middleware/auth";

import {
  hashPassword,
  comparePassword,
} from "../utils/password";

import {
  generateToken,
} from "../utils/jwt";

const router = Router();

/*
=========================
CURRENT USER
=========================
*/

router.get(
  "/me",
  authenticate,
  async (
    req: AuthRequest,
    res
  ) => {
    try {
      const user =
        await prisma.user.findUnique({
          where: {
            id: req.userId,
          },

          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
          },
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch user",
      });
    }
  }
);

/*
=========================
REGISTER
=========================
*/

router.post(
  "/register",
  async (req, res) => {
    try {
      const {
        username,
        email,
        password,
      } = req.body;

      if (
        !username ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All fields are required",
        });
      }

      const existingUser =
        await prisma.user.findFirst({
          where: {
            OR: [
              {
                email,
              },
              {
                username,
              },
            ],
          },
        });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message:
            "User already exists",
        });
      }

      const hashedPassword =
        await hashPassword(
          password
        );

      const user =
        await prisma.user.create({
          data: {
            username,
            email,
            password:
              hashedPassword,
          },
        });

      const token =
        generateToken(
          user.id
        );

      res.status(201).json({
        success: true,

        message:
          "Registration successful",

        token,

        user: {
          id: user.id,
          username:
            user.username,
          email:
            user.email,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Registration failed",
      });
    }
  }
);

/*
=========================
LOGIN
=========================
*/

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const user =
        await prisma.user.findUnique({
          where: {
            email,
          },
        });

      if (!user) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid credentials",
        });
      }

      const validPassword =
        await comparePassword(
          password,
          user.password
        );

      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid credentials",
        });
      }

      const token =
        generateToken(
          user.id
        );

      res.json({
        success: true,

        message:
          "Login successful",

        token,

        user: {
          id: user.id,
          username:
            user.username,
          email:
            user.email,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Login failed",
      });
    }
  }
);

export default router;