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

import { syncTV } from "../services/media";
import { useAuth } from "../context/AuthContext";
import { useRequireAuth } from "../hooks/useRequireAuth";

function TVDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const requireAuth =
    useRequireAuth();

  const { user } = useAuth();

  const [tv, setTV] =
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
    const fetchTV =
      async () => {
        try {
          const response =
            await api.get(
              `/tv/${id}`
            );

          setTV(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchTV();
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

  if (!tv) {
    return (
      <MainLayout>
        <h2
          style={{
            color: "white",
            padding: 50,
          }}
        >
          TV Show not found
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
              tv.poster_path
                ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                : "https://via.placeholder.com/300x450"
            }
            title={tv.name}
          />
        }
      >
        <button
          onClick={() =>
            navigate("/tv")
          }
          style={{
            marginBottom: 25,
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background:
              "#8B5CF6",
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
          {tv.name}
        </h1>

        <Rating
          rating={tv.vote_average}
        />

        <GenreChips
          genres={
            tv.genres?.map(
              (g: any) =>
                g.name
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
              First Air Date:
            </strong>{" "}
            {tv.first_air_date}
          </p>

          <p>
            <strong>
              Seasons:
            </strong>{" "}
            {tv.number_of_seasons}
          </p>

          <p>
            <strong>
              Episodes:
            </strong>{" "}
            {tv.number_of_episodes}
          </p>

          <p>
            <strong>
              Status:
            </strong>{" "}
            {tv.status}
          </p>

          <p>
            <strong>
              Language:
            </strong>{" "}
            {tv.original_language?.toUpperCase()}
          </p>

          <p>
            <strong>
              Popularity:
            </strong>{" "}
            {tv.popularity}
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
          {tv.overview}
        </p>
                <ActionBar
          onFavorite={() =>
            requireAuth(async () => {
              if (!user) return;

              try {
                const media =
                  await syncTV(tv.id);

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
              setShowRating(
                true
              );
            })
          }
          onReview={() =>
            requireAuth(() => {
              setShowReview(
                true
              );
            })
          }
        />
      </DetailLayout>

      <RatingModal
        open={showRating}
        title={tv.name}
        onClose={() =>
          setShowRating(false)
        }
        onSubmit={async (
          score
        ) => {
          if (!user) return;

          try {
            const media =
              await syncTV(tv.id);

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
        title={tv.name}
        onClose={() =>
          setShowReview(false)
        }
        onSubmit={async (
          content
        ) => {
          if (!user) return;

          try {
            const media =
              await syncTV(tv.id);

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
  title={tv.name}
  progressLabel="Episodes"

  total={
    tv.number_of_episodes ||
    undefined
  }

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
        await syncTV(tv.id);

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

export default TVDetails;