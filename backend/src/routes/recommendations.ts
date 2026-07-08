import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

/*
======================================
PERSONALIZED RECOMMENDATIONS
======================================
*/

router.get("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    /*
    ----------------------------------
    Load User Data
    ----------------------------------
    */

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

        ratings: {
          include: {
            media: true,
          },
        },

        watchlists: {
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

    /*
    ----------------------------------
    User Preferences
    ----------------------------------
    */

    const favoriteIds = new Set(
      user.favorites.map((f) => f.mediaId)
    );

    const watchlistIds = new Set(
      user.watchlists.map((w) => w.mediaId)
    );

    const ratedIds = new Set(
      user.ratings.map((r) => r.mediaId)
    );

    /*
    Genre Score
    */

    const genreWeights = new Map<
      string,
      number
    >();

    /*
    Favorites
    */

    user.favorites.forEach((fav) => {
      fav.media.genres.forEach((genre) => {
        genreWeights.set(
          genre,
          (genreWeights.get(genre) || 0) + 5
        );
      });
    });

    /*
    Ratings
    */

    user.ratings.forEach((rating) => {
      rating.media.genres.forEach((genre) => {
        genreWeights.set(
          genre,
          (genreWeights.get(genre) || 0) +
            rating.score
        );
      });
    });

    /*
    ----------------------------------
    Load Media
    ----------------------------------
    */

    const media =
      await prisma.media.findMany();

    /*
    ----------------------------------
    Score Media
    ----------------------------------
    */

    const recommendations =
      media
        .filter(
          (item) =>
            !favoriteIds.has(item.id) &&
            !watchlistIds.has(item.id) &&
            !ratedIds.has(item.id)
        )
        .map((item) => {
          let score = 0;

          /*
          Genre Matching
          */

          item.genres.forEach((genre) => {
            score +=
              genreWeights.get(genre) || 0;
          });

          /*
          Same Media Type
          */

          const favoriteType =
            user.favorites.find(
              (f) =>
                f.media.mediaType ===
                item.mediaType
            );

          if (favoriteType) {
            score += 10;
          }

          /*
          Average User Rating Bonus
          */

          const ratings =
            user.ratings.filter(
              (r) =>
                r.media.mediaType ===
                item.mediaType
            );

          if (ratings.length > 0) {
            const avg =
              ratings.reduce(
                (sum, r) =>
                  sum + r.score,
                0
              ) / ratings.length;

            score += avg;
          }

          return {
            ...item,
            recommendationScore:
              score,
          };
        })
        .sort(
          (a, b) =>
            b.recommendationScore -
            a.recommendationScore
        );

    res.json(recommendations.slice(0, 30));
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error:
        "Failed to generate recommendations",
    });
  }
});

export default router;