import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const q = req.query.q;

    const results = await Promise.allSettled([
      axios.get(
        `https://api.jikan.moe/v4/anime?q=${q}&limit=5`
      ),

      axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: process.env.TMDB_API_KEY,
            query: q,
          },
        }
      ),

      axios.get(
        "https://api.themoviedb.org/3/search/tv",
        {
          params: {
            api_key: process.env.TMDB_API_KEY,
            query: q,
          },
        }
      ),

      axios.get(
        "https://api.rawg.io/api/games",
        {
          params: {
            key: process.env.RAWG_API_KEY,
            search: q,
            page_size: 5,
          },
        }
      ),
    ]);

    res.json({
      anime:
        results[0].status === "fulfilled"
          ? results[0].value.data.data
          : [],

      movies:
        results[1].status === "fulfilled"
          ? results[1].value.data.results
          : [],

      tv:
        results[2].status === "fulfilled"
          ? results[2].value.data.results
          : [],

      games:
        results[3].status === "fulfilled"
          ? results[3].value.data.results
          : [],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Search failed",
    });
  }
});

export default router;