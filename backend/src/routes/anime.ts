import { Router } from "express";
import axios from "axios";

const router = Router();


async function fetchAnime(id: string) {
  for (let i = 0; i < 3; i++) {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}`,
        {
          timeout: 10000,
          headers: {
            "User-Agent": "NextRec/1.0",
            Accept: "application/json",
          },
        }
      );

      return response.data.data;
    } catch (err: any) {
      if (err.response?.status === 504 && i < 2) {
        console.log(`Retry ${i + 1}...`);
        await new Promise((r) => setTimeout(r, 1000));
        continue;
      }

      throw err;
    }
  }
}

/*
ANIME DETAILS
*/
router.get("/details/:id", async (req, res) => {
  try {
    const anime = await fetchAnime(req.params.id);
    res.json(anime);
  } catch (err: any) {
    res.status(err.response?.status || 500).json({
      error:
        err.response?.data?.message ||
        "Failed to fetch anime details",
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