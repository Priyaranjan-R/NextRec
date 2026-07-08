import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

/*
====================================
CREATE OR UPDATE REVIEW
====================================
*/
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      mediaId,
      content,
    } = req.body;

    const existing =
      await prisma.review.findFirst({
        where: {
          userId,
          mediaId,
        },
      });

    if (existing) {
      const updated =
        await prisma.review.update({
          where: {
            id: existing.id,
          },
          data: {
            content,
          },
        });

      return res.json(updated);
    }

    const review =
      await prisma.review.create({
        data: {
          userId,
          mediaId,
          content,
        },
      });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to save review",
    });
  }
});

/*
====================================
GET REVIEWS OF MEDIA
====================================
*/
router.get("/media/:mediaId", async (req, res) => {
  try {
    const mediaId = Number(req.params.mediaId);

    const reviews =
      await prisma.review.findMany({
        where: {
          mediaId,
        },

        include: {
          user: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(reviews);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch reviews",
    });
  }
});

/*
====================================
GET USER REVIEWS
====================================
*/
router.get("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const reviews =
      await prisma.review.findMany({
        where: {
          userId,
        },

        include: {
          media: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(reviews);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch reviews",
    });
  }
});

/*
====================================
DELETE REVIEW
====================================
*/
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.review.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete review",
    });
  }
});

export default router;