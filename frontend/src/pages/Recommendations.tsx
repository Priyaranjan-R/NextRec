import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import MediaCard from "../components/MediaCard";
import { useAuth } from "../context/AuthContext";

function Recommendations() {
  const { user } = useAuth();

  const [recommendations, setRecommendations] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchRecommendations =
      async () => {
        if (!user) {
          setLoading(false);
          return;
        }

        try {
          const response =
            await api.get(
              `/recommendations/${user.id}`
            );

          setRecommendations(
            response.data
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchRecommendations();
  }, [user]);

  if (!user) {
    return (
      <MainLayout>
        <h2
          style={{
            color: "white",
            padding: 50,
          }}
        >
          Login to see personalized recommendations.
        </h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        style={{
          padding: 35,
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: 30,
          }}
        >
          ⭐ Recommended For You
        </h1>

        {loading ? (
          <h2 style={{ color: "white" }}>
            Loading...
          </h2>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(260px,1fr))",
              gap: 25,
            }}
          >
            {recommendations.map(
              (media) => (
                <MediaCard
                  key={media.id}
                  id={media.id}
                  type={media.mediaType}
                  title={media.title}
                  imageUrl={media.imageUrl}
                  description={
                    media.description
                  }
                  genres={media.genres}
                  link={`/${media.mediaType.toLowerCase()}/${media.externalId}`}
                />
              )
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Recommendations;