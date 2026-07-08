import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

/*
GET COMPLETE USER PROFILE
*/
router.get("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      include: {
        favorites: {
          include: {
            media: true,
          },
        },

        watchlists: {
          include: {
            media: true,
          },
        },

        ratings: {
          include: {
            media: true,
          },
        },

        reviews: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch profile",
    });
  }
});

export default router;