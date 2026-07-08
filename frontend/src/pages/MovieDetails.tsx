import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

import MainLayout from "../layouts/MainLayout";

import DetailLayout from "../details/DetailLayout";
import Poster from "../details/Poster";
import Rating from "../details/Rating";
import GenreChips from "../details/GenreChips";
import ActionBar from "../details/ActionBar";
import ProgressModal from "../components/ProgressModal";
import RatingModal from "../components/RatingModal";
import ReviewModal from "../components/ReviewModal";

import { syncMovie } from "../services/media";

import { useAuth } from "../context/AuthContext";
import { useRequireAuth } from "../hooks/useRequireAuth";

function MovieDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const requireAuth =
    useRequireAuth();

  const { user } = useAuth();

  const [movie, setMovie] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [showRating, setShowRating] =
    useState(false);

  const [showReview, setShowReview] =
    useState(false);

  const [showProgress, setShowProgress] =
  useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response =
          await api.get(`/movies/${id}`);

        setMovie(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <h2
          style={{
            color: "white",
            padding: 50,
          }}
        >
          Loading...
        </h2>
      </MainLayout>
    );
  }

  if (!movie) {
    return (
      <MainLayout>
        <h2
          style={{
            color: "white",
            padding: 50,
          }}
        >
          Movie not found
        </h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <DetailLayout
        poster={
          <Poster
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450"
            }
            title={movie.title}
          />
        }
      >
        <button
          onClick={() =>
            navigate("/movies")
          }
          style={{
            marginBottom: 25,
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "#8B5CF6",
            color: "white",
          }}
        >
          ← Back
        </button>

        <h1
          style={{
            color: "white",
            fontSize: 48,
            marginBottom: 5,
          }}
        >
          {movie.title}
        </h1>

        <Rating
          rating={movie.vote_average}
        />

        <GenreChips
          genres={
            movie.genres?.map(
              (g: any) => g.name
            ) || []
          }
        />

        <div
          style={{
            color: "white",
            lineHeight: 2,
            marginBottom: 25,
          }}
        >
          <p>
            <strong>
              Release Date:
            </strong>{" "}
            {movie.release_date}
          </p>

          <p>
            <strong>
              Runtime:
            </strong>{" "}
            {movie.runtime} min
          </p>

          <p>
            <strong>
              Language:
            </strong>{" "}
            {movie.original_language?.toUpperCase()}
          </p>

          <p>
            <strong>
              Status:
            </strong>{" "}
            {movie.status}
          </p>

          <p>
            <strong>
              Popularity:
            </strong>{" "}
            {movie.popularity}
          </p>
        </div>

        <h2
          style={{
            color: "white",
          }}
        >
          Overview
        </h2>

        <p
          style={{
            color: "#ccc",
            lineHeight: 1.8,
            fontSize: 17,
          }}
        >
          {movie.overview}
        </p>

        <ActionBar
          onFavorite={() =>
            requireAuth(async () => {
              if (!user) return;

              try {
                const media =
                  await syncMovie(
                    movie.id
                  );

                await api.post(
                  "/favorites",
                  {
                    userId: user.id,
                    mediaId: media.id,
                  }
                );

                alert(
                  "Added to Favorites ❤️"
                );
              } catch (error) {
                console.error(error);

                alert(
                  "Failed to add favorite"
                );
              }
            })
          }

          onWatchlist={() =>
  requireAuth(() => {
    setShowProgress(true);
  })
}

          onRate={() =>
            requireAuth(() => {
              setShowRating(true);
            })
          }

          onReview={() =>
            requireAuth(() => {
              setShowReview(true);
            })
          }
        />
              </DetailLayout>

      <RatingModal
        open={showRating}
        title={movie.title}
        onClose={() =>
          setShowRating(false)
        }
        onSubmit={async (score) => {
          if (!user) return;

          try {
            const media =
              await syncMovie(
                movie.id
              );

            await api.post(
              "/ratings",
              {
                userId: user.id,
                mediaId: media.id,
                score,
              }
            );

            alert(
              "⭐ Rating Saved!"
            );
          } catch (error) {
            console.error(error);

            alert(
              "Failed to save rating"
            );
          }
        }}
      />

      <ReviewModal
        open={showReview}
        title={movie.title}
        onClose={() =>
          setShowReview(false)
        }
        onSubmit={async (content) => {
          if (!user) return;

          try {
            const media =
              await syncMovie(
                movie.id
              );

              await api.post(
                "/reviews",
                {
                  userId: user.id,
                  mediaId: media.id,
                  content,
                }
              );

              alert(
                "Review saved!"
              );
          } catch (error) {
            console.error(error);

            alert(
              "Failed to save review"
            );
          }
        }}
      />
      <ProgressModal
  open={showProgress}
  title={movie.title}
  progressLabel="Minutes Watched"
  total={movie.runtime}
  onClose={() =>
    setShowProgress(false)
  }
  onSubmit={async (
    status,
    progress
  ) => {
    if (!user) return;

    try {
      const media =
        await syncMovie(movie.id);

      await api.post("/watchlist", {
        userId: user.id,
        mediaId: media.id,
        status,
        progress,
      });

      alert("Progress saved!");

      setShowProgress(false);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save progress"
      );
    }
  }}
/>
    </MainLayout>
  );
}

export default MovieDetails;