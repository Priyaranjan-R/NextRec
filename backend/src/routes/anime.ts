import { Router } from "express";
import axios from "axios";

const router = Router();

/*
ANIME DETAILS
*/
router.get("/details/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}`
    );

    res.json(response.data.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch anime details",
    });
  }
});

/*
SEARCH ANIME
*/
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${q}&limit=24`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch anime",
    });
  }
});

/*
TOP ANIME
*/
router.get("/top", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.jikan.moe/v4/top/anime"
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch top anime",
    });
  }
});

/*
CURRENTLY AIRING ANIME
*/
router.get("/airing", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.jikan.moe/v4/seasons/now"
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch airing anime",
    });
  }
});

/*
UPCOMING ANIME
*/
router.get("/upcoming", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.jikan.moe/v4/seasons/upcoming"
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch upcoming anime",
    });
  }
});

export default router;