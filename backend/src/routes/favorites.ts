import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

/*
ADD TO FAVORITES
*/
router.post("/", async (req, res) => {
  try {
    const { userId, mediaId } = req.body;

    const favorite = await prisma.favorite.upsert({
      where: {
        userId_mediaId: {
          userId,
          mediaId,
        },
      },
      update: {},
      create: {
        userId,
        mediaId,
      },
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to add favorite",
    });
  }
});

/*
GET USER FAVORITES
*/
router.get("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const favorites = await prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        media: true,
      },
    });

    res.json(favorites);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch favorites",
    });
  }
});

/*
DELETE FAVORITE
*/
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.favorite.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Favorite removed successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to remove favorite",
    });
  }
});

export default router;