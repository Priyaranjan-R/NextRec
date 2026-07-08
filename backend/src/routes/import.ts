import { Router } from "express";
import axios from "axios";
import prisma from "../lib/prisma";

const router = Router();

/*
====================================
IMPORT ANIME
====================================
*/
router.post("/anime", async (req, res) => {
  try {
    const { title } = req.body;

    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
        title
      )}&limit=1`
    );

    const anime = response.data.data[0];

    if (!anime) {
      return res.status(404).json({
        error: "Anime not found",
      });
    }

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

        genres: anime.genres.map(
          (genre: { name: string }) => genre.name
        ),
      },
    });

    res.status(201).json(media);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to import anime",
    });
  }
});

/*
====================================
IMPORT MOVIE
====================================
*/
router.post("/movie", async (req, res) => {
  try {
    const { title } = req.body;

    const searchResponse = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: title,
        },
      }
    );

    const movie = searchResponse.data.results[0];

    if (!movie) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    const detailsResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie.id}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

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

        genres: detailsResponse.data.genres.map(
          (genre: { name: string }) => genre.name
        ),
      },
    });

    res.status(201).json(media);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to import movie",
    });
  }
});

/*
====================================
IMPORT TV SHOW
====================================
*/
router.post("/tv", async (req, res) => {
  try {
    const { title } = req.body;

    const searchResponse = await axios.get(
      "https://api.themoviedb.org/3/search/tv",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: title,
        },
      }
    );

    const tv = searchResponse.data.results[0];

    if (!tv) {
      return res.status(404).json({
        error: "TV show not found",
      });
    }

    const detailsResponse = await axios.get(
      `https://api.themoviedb.org/3/tv/${tv.id}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

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

        genres: detailsResponse.data.genres.map(
          (genre: { name: string }) => genre.name
        ),
      },
    });

    res.status(201).json(media);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to import TV show",
    });
  }
});

/*
====================================
IMPORT GAME
====================================
*/
router.post("/game", async (req, res) => {
  try {
    const { title } = req.body;

    const response = await axios.get(
      "https://api.rawg.io/api/games",
      {
        params: {
          key: process.env.RAWG_API_KEY,
          search: title,
          page_size: 1,
        },
      }
    );

    const game = response.data.results[0];

    if (!game) {
      return res.status(404).json({
        error: "Game not found",
      });
    }

    const media = await prisma.media.create({
      data: {
        externalId: game.id.toString(),
        source: "RAWG",

        title: game.name,
        description: "",

        imageUrl: game.background_image,

        mediaType: "GAME",

        genres: game.genres.map(
          (genre: { name: string }) => genre.name
        ),
      },
    });

    res.status(201).json(media);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to import game",
    });
  }
});

export default router;