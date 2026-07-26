import express from "express";
import cors from "cors";

import mediaRoutes from "./routes/media";
import animeRoutes from "./routes/anime";
import authRoutes from "./routes/auth";
import watchlistRoutes from "./routes/watchlist";
import ratingRoutes from "./routes/ratings";
import favoriteRoutes from "./routes/favorites";
import reviewRoutes from "./routes/reviews";
import movieRoutes from "./routes/movies";
import tvRoutes from "./routes/tv";
import gameRoutes from "./routes/games";
import recommendationRoutes from "./routes/recommendations";
import importRoutes from "./routes/import";
import searchRoutes from "./routes/search";
import profileRoutes from "./routes/profile";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to NextRec 🚀",
  });
});

app.use("/api/media", mediaRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/tv", tvRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/import", importRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/profile", profileRoutes);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});