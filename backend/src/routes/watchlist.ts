import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

/*
====================================
ADD TO WATCHLIST
====================================
*/
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      mediaId,
      status = "PLANNING",
      progress = 0,
    } = req.body;

    const watchlist = await prisma.watchlist.upsert({
      where: {
        userId_mediaId: {
          userId,
          mediaId,
        },
      },

      update: {
        status,
        progress,

        startedAt:
          status === "WATCHING"
            ? new Date()
            : undefined,

        completedAt:
          status === "COMPLETED"
            ? new Date()
            : undefined,
      },

      create: {
        userId,
        mediaId,
        status,
        progress,

        startedAt:
          status === "WATCHING"
            ? new Date()
            : null,

        completedAt:
          status === "COMPLETED"
            ? new Date()
            : null,
      },
    });

    res.status(201).json(watchlist);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to save watchlist",
    });
  }
});

/*
====================================
UPDATE WATCHLIST
====================================
*/
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      status,
      progress,
    } = req.body;

    const updated =
      await prisma.watchlist.update({
        where: {
          id,
        },

        data: {
          status,
          progress,

          startedAt:
            status === "WATCHING"
              ? new Date()
              : undefined,

          completedAt:
            status === "COMPLETED"
              ? new Date()
              : undefined,
        },
      });

    res.json(updated);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update watchlist",
    });
  }
});

/*
====================================
GET USER WATCHLIST
====================================
*/
router.get("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const watchlist =
      await prisma.watchlist.findMany({
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

    res.json(watchlist);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch watchlist",
    });
  }
});

/*
====================================
DELETE WATCHLIST ITEM
====================================
*/
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.watchlist.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Removed from watchlist",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete watchlist item",
    });
  }
});

/*
====================================
CLEAR USER WATCHLIST
====================================
*/
router.delete("/clear/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    await prisma.watchlist.deleteMany({
      where: {
        userId,
      },
    });

    res.json({
      success: true,
      message: "Watchlist cleared successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to clear watchlist",
    });
  }
});

export default router;