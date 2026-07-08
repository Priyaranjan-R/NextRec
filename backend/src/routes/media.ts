import { Router } from "express";
import prisma from "../lib/prisma";
import axios from "axios";

const router = Router();

/*
====================================
GET ALL MEDIA
====================================
*/
router.get("/", async (req, res) => {
  try {
    const media = await prisma.media.findMany();

    res.json(media);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch media",
    });
  }
});

/*
====================================
SEARCH MEDIA
====================================
*/
router.get("/search/query", async (req, res) => {
  try {
    const q = String(req.query.q || "");

    const results = await prisma.media.findMany({
      where: {
        title: {
          contains: q,
          mode: "insensitive",
        },
      },
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({
      error: "Search failed",
    });
  }
});

/*
====================================
GET SINGLE MEDIA
====================================
*/
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const media = await prisma.media.findUnique({
      where: {
        id,
      },
    });

    if (!media) {
      return res.status(404).json({
        error: "Media not found",
      });
    }

    res.json(media);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch media",
    });
  }
});

/*
====================================
CREATE MEDIA
====================================
*/
router.post("/", async (req, res) => {
  try {
    const {
      externalId,
      source,
      title,
      description,
      imageUrl,
      mediaType,
      genres,
    } = req.body;

    const media = await prisma.media.create({
      data: {
        externalId,
        source,
        title,
        description,
        imageUrl,
        mediaType,
        genres: genres || [],
      },
    });

    res.status(201).json(media);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create media",
    });
  }
});

/*
====================================
SYNC ANIME
====================================
*/
router.post("/sync/anime", async (req, res) => {
  try {
    const { malId } = req.body;

    if (!malId) {
      return res.status(400).json({
        error: "malId is required",
      });
    }

    const existing = await prisma.media.findFirst({
      where: {
        externalId: malId.toString(),
        source: "JIKAN",
      },
    });

    if (existing) {
      return res.json(existing);
    }

    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${malId}`
    );

    const anime = response.data.data;

    const media = await prisma.media.create({
      data: {
        externalId: anime.mal_id.toString(),
        source: "JIKAN",
        title: anime.title,
        description: anime.synopsis || "",
        imageUrl:
          anime.images?.jpg?.large_image_url ||
          anime.images?.jpg?.image_url,
        mediaType: "ANIME",
        genres:
          anime.genres?.map(
            (g: any) => g.name
          ) || [],
      },
    });

    res.json(media);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      error: "Failed to sync anime",
    });
  }
});

/*
====================================
SYNC MOVIE
====================================
*/
router.post("/sync/movie", async (req, res) => {
  try {
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({
        error: "movieId is required",
      });
    }

    const existing = await prisma.media.findFirst({
      where: {
        externalId: movieId.toString(),
        source: "TMDB",
      },
    });

    if (existing) {
      return res.json(existing);
    }

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    const movie = response.data;

    const media = await prisma.media.create({
      data: {
        externalId: movie.id.toString(),
        source: "TMDB",
        title: movie.title,
        description: movie.overview || "",
        imageUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        mediaType: "MOVIE",
        genres:
          movie.genres?.map(
            (g: any) => g.name
          ) || [],
      },
    });

    res.json(media);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to sync movie",
    });
  }
});

/*
====================================
SYNC TV
====================================
*/
router.post("/sync/tv", async (req, res) => {
  try {
    const { tvId } = req.body;

    if (!tvId) {
      return res.status(400).json({
        error: "tvId is required",
      });
    }

    const existing = await prisma.media.findFirst({
      where: {
        externalId: tvId.toString(),
        source: "TMDB",
      },
    });

    if (existing) {
      return res.json(existing);
    }

    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvId}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    const tv = response.data;

    const media = await prisma.media.create({
      data: {
        externalId: tv.id.toString(),
        source: "TMDB",
        title: tv.name,
        description: tv.overview || "",
        imageUrl: tv.poster_path
          ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
          : null,
        mediaType: "TV",
        genres:
          tv.genres?.map(
            (g: any) => g.name
          ) || [],
      },
    });

    res.json(media);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to sync TV show",
    });
  }
});

/*
====================================
SYNC GAME
====================================
*/
router.post("/sync/game", async (req, res) => {
  try {
    const { gameId } = req.body;

    if (!gameId) {
      return res.status(400).json({
        error: "gameId is required",
      });
    }

    const existing = await prisma.media.findFirst({
      where: {
        externalId: gameId.toString(),
        source: "RAWG",
      },
    });

    if (existing) {
      return res.json(existing);
    }

    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}`,
      {
        params: {
          key: process.env.RAWG_API_KEY,
        },
      }
    );

    const game = response.data;

    const media = await prisma.media.create({
      data: {
        externalId: game.id.toString(),
        source: "RAWG",
        title: game.name,
        description: game.description_raw || "",
        imageUrl: game.background_image,
        mediaType: "GAME",
        genres:
          game.genres?.map(
            (g: any) => g.name
          ) || [],
      },
    });

    res.json(media);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to sync game",
    });
  }
});

export default router;