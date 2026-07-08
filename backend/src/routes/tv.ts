import { Router } from "express";
import axios from "axios";

const router = Router();

/*
SEARCH TV
*/
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    const response = await axios.get(
      "https://api.themoviedb.org/3/search/tv",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: q,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch TV series",
    });
  }
});

/*
POPULAR TV
*/
router.get("/popular", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/tv/popular",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch TV series",
    });
  }
});

/*
TOP RATED TV
*/
router.get("/top-rated", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/tv/top_rated",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch TV series",
    });
  }
});

/*
CURRENTLY AIRING TV
*/
router.get("/on-air", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/tv/on_the_air",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch TV series",
    });
  }
});

/*
TV DETAILS
*/
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch TV details",
    });
  }
});

export default router;