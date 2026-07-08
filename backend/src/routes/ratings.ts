import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

/*
====================================
CREATE OR UPDATE RATING
====================================
*/
router.post("/", async (req, res) => {
  try {
    const { userId, mediaId, score } = req.body;

    if (!userId || !mediaId || score === undefined) {
      return res.status(400).json({
        error: "userId, mediaId and score are required",
      });
    }

    if (score < 1 || score > 10) {
      return res.status(400).json({
        error: "Score must be between 1 and 10",
      });
    }

    const rating = await prisma.rating.upsert({
      where: {
        userId_mediaId: {
          userId,
          mediaId,
        },
      },

      update: {
        score,
      },

      create: {
        userId,
        mediaId,
        score,
      },
    });

    res.status(201).json(rating);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to save rating",
    });
  }
});

/*
====================================
GET ALL RATINGS OF USER
====================================
*/
router.get("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const ratings = await prisma.rating.findMany({
      where: {
        userId,
      },

      include: {
        media: true,
      },

      orderBy: {
        id: "desc",
      },
    });

    res.json(ratings);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch ratings",
    });
  }
});

/*
====================================
GET SINGLE RATING
====================================
*/
router.get("/single/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const rating = await prisma.rating.findUnique({
      where: {
        id,
      },

      include: {
        media: true,
        user: true,
      },
    });

    if (!rating) {
      return res.status(404).json({
        error: "Rating not found",
      });
    }

    res.json(rating);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch rating",
    });
  }
});

/*
====================================
UPDATE RATING
====================================
*/
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { score } = req.body;

    if (score < 1 || score > 10) {
      return res.status(400).json({
        error: "Score must be between 1 and 10",
      });
    }

    const rating = await prisma.rating.update({
      where: {
        id,
      },

      data: {
        score,
      },
    });

    res.json(rating);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update rating",
    });
  }
});

/*
====================================
DELETE RATING
====================================
*/
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.rating.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Rating deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete rating",
    });
  }
});

export default router;