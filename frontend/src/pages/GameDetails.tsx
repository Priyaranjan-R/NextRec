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

import { syncGame } from "../services/media";
import { useAuth } from "../context/AuthContext";
import { useRequireAuth } from "../hooks/useRequireAuth";

function GameDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const requireAuth =
    useRequireAuth();

  const { user } = useAuth();

  const [game, setGame] =
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
    const fetchGame =
      async () => {
        try {
          const response =
            await api.get(
              `/games/${id}`
            );

          setGame(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchGame();
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

  if (!game) {
    return (
      <MainLayout>
        <h2
          style={{
            color: "white",
            padding: 50,
          }}
        >
          Game not found
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
              game.background_image ||
              "https://via.placeholder.com/300x450"
            }
            title={game.name}
          />
        }
      >
        <button
          onClick={() =>
            navigate("/games")
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
          {game.name}
        </h1>

        <Rating
          rating={game.rating}
          outOf={5}
        />

        <GenreChips
          genres={
            game.genres?.map(
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
              Released:
            </strong>{" "}
            {game.released}
          </p>

          <p>
            <strong>
              Playtime:
            </strong>{" "}
            {game.playtime} hrs
          </p>

          <p>
            <strong>
              Metacritic:
            </strong>{" "}
            {game.metacritic ?? "N/A"}
          </p>

          <p>
            <strong>
              Rating:
            </strong>{" "}
            {game.rating}/5
          </p>

          <p>
            <strong>
              ESRB:
            </strong>{" "}
            {game.esrb_rating?.name ||
              "N/A"}
          </p>

          <p>
            <strong>
              Platforms:
            </strong>{" "}
            {game.platforms
              ?.map(
                (p: any) =>
                  p.platform.name
              )
              .join(", ")}
          </p>
        </div>

        <h2
          style={{
            color: "white",
          }}
        >
          Description
        </h2>

        <p
          style={{
            color: "#ccc",
            lineHeight: 1.8,
            fontSize: 17,
          }}
        >
          {game.description_raw ||
            "No description available."}
        </p>
                <ActionBar
          onFavorite={() =>
            requireAuth(async () => {
              if (!user) return;

              try {
                const media =
                  await syncGame(
                    game.id
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
        title={game.name}
        onClose={() =>
          setShowRating(false)
        }
        onSubmit={async (
          score
        ) => {
          if (!user) return;

          try {
            const media =
              await syncGame(
                game.id
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
        title={game.name}
        onClose={() =>
          setShowReview(false)
        }
        onSubmit={async (
          content
        ) => {
          if (!user) return;

          try {
            const media =
              await syncGame(
                game.id
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
  title={game.name}
  progressLabel="Completion %"

  total={100}

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
        await syncGame(game.id);

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

export default GameDetails;