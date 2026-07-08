import { Router } from "express";
import axios from "axios";

const router = Router();

/*
====================================
SEARCH GAMES
====================================
*/
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    const response = await axios.get(
      "https://api.rawg.io/api/games",
      {
        params: {
          key: process.env.RAWG_API_KEY,
          search: q,
          page_size: 20,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch games",
    });
  }
});

/*
====================================
POPULAR GAMES
====================================
*/
router.get("/popular", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.rawg.io/api/games",
      {
        params: {
          key: process.env.RAWG_API_KEY,
          ordering: "-added",
          page_size: 20,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch popular games",
    });
  }
});

/*
====================================
TOP RATED GAMES
====================================
*/
router.get("/top-rated", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.rawg.io/api/games",
      {
        params: {
          key: process.env.RAWG_API_KEY,
          ordering: "-rating",
          page_size: 20,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch top rated games",
    });
  }
});

/*
====================================
NEW RELEASES
====================================
*/
router.get("/new", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.rawg.io/api/games",
      {
        params: {
          key: process.env.RAWG_API_KEY,
          ordering: "-released",
          page_size: 20,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch new games",
    });
  }
});

/*
====================================
GAME DETAILS
====================================
*/
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}`,
      {
        params: {
          key: process.env.RAWG_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch game details",
    });
  }
});

export default router;