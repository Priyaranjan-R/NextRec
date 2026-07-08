import { useEffect, useState } from "react";
import api from "../services/api";
import MediaCard from "../components/MediaCard";
import MainLayout from "../layouts/MainLayout";

function TV() {
  const [popular, setPopular] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [onAir, setOnAir] = useState<any[]>([]);

  useEffect(() => {
    const fetchTV = async () => {
      try {
        const [popularRes, topRatedRes, onAirRes] =
          await Promise.all([
            api.get("/tv/popular"),
            api.get("/tv/top-rated"),
            api.get("/tv/on-air"),
          ]);

        setPopular(popularRes.data.results || []);
        setTopRated(topRatedRes.data.results || []);
        setOnAir(onAirRes.data.results || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTV();
  }, []);

  const renderRow = (
    title: string,
    shows: any[]
  ) => (
    <div style={{ marginBottom: "50px" }}>
      <h2>{title}</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {shows.map((show) => (
          <MediaCard
            key={show.id}
            id={show.id}
            title={show.name}
            imageUrl={
              show.poster_path
                ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                : "https://via.placeholder.com/300x450"
            }
            description={
              show.overview || ""
            }
            link={`/tv/${show.id}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div
        style={{
          padding: "30px",
        }}
      >
        <h1
          style={{
            marginBottom: "40px",
          }}
        >
          TV Shows
        </h1>

        {renderRow(
          "🔥 Popular TV",
          popular
        )}

        {renderRow(
          "⭐ Top Rated TV",
          topRated
        )}

        {renderRow(
          "📺 Airing Now",
          onAir
        )}
      </div>
    </MainLayout>
  );
}

export default TV;