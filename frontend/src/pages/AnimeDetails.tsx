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

import { syncAnime } from "../services/media";

import { useAuth } from "../context/AuthContext";
import { useRequireAuth } from "../hooks/useRequireAuth";

import RatingModal from "../components/RatingModal";
import ReviewModal from "../components/ReviewModal";

function AnimeDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const requireAuth =
    useRequireAuth();

  const { user } = useAuth();

  const [anime, setAnime] =
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
    const fetchAnime = async () => {
      try {
        const response =
          await api.get(
            `/anime/details/${id}`
          );

        setAnime(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
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

  if (!anime) {
    return (
      <MainLayout>
        <h2
          style={{
            color: "white",
            padding: 50,
          }}
        >
          Anime not found
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
              anime.images.jpg
                .large_image_url
            }
            title={anime.title}
          />
        }
      >
        <button
          onClick={() =>
            navigate("/anime")
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
          {anime.title}
        </h1>

        <Rating
          rating={anime.score}
        />

        <GenreChips
          genres={
            anime.genres?.map(
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
              Episodes:
            </strong>{" "}
            {anime.episodes}
          </p>

          <p>
            <strong>
              Status:
            </strong>{" "}
            {anime.status}
          </p>

          <p>
            <strong>
              Season:
            </strong>{" "}
            {anime.season}
          </p>

          <p>
            <strong>
              Year:
            </strong>{" "}
            {anime.year}
          </p>

          <p>
            <strong>
              Studio:
            </strong>{" "}
            {anime.studios
              ?.map(
                (s: any) =>
                  s.name
              )
              .join(", ")}
          </p>
        </div>

        <h2
          style={{
            color: "white",
          }}
        >
          Synopsis
        </h2>

        <p
          style={{
            color: "#ccc",
            lineHeight: 1.8,
            fontSize: 17,
          }}
        >
          {anime.synopsis}
        </p>

        <ActionBar
          onFavorite={() =>
            requireAuth(async () => {
              if (!user) return;

              const media =
                await syncAnime(
                  anime.mal_id
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
        title={anime.title}
        onClose={() =>
          setShowRating(false)
        }
        onSubmit={async (score) => {
          if (!user) return;

          try {
            const media =
              await syncAnime(
                anime.mal_id
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
        title={anime.title}
        onClose={() =>
          setShowReview(false)
        }
        onSubmit={async (content) => {
          if (!user) return;

          try {
            const media =
              await syncAnime(
                anime.mal_id
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
  title={anime.title}
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
        await syncAnime(
          anime.mal_id
        );

      await api.post(
        "/watchlist",
        {
          userId: user.id,
          mediaId: media.id,
          status,
          progress,
        }
      );

      alert(
        "Progress saved!"
      );

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

export default AnimeDetails;