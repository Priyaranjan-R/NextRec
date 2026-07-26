import { useEffect, useState } from "react";
import api from "../services/api";
import MediaCard from "../components/MediaCard";
import MainLayout from "../layouts/MainLayout";

function Anime() {
  const [topAnime, setTopAnime] = useState<any[]>([]);
  const [airingAnime, setAiringAnime] = useState<any[]>([]);
  const [upcomingAnime, setUpcomingAnime] =
    useState<any[]>([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const [
          topResponse,
          airingResponse,
          upcomingResponse,
        ] = await Promise.all([
          api.get("/anime/top"),
          api.get("/anime/airing"),
          api.get("/anime/upcoming"),
        ]);

        setTopAnime(
          topResponse.data.data || []
        );

        setAiringAnime(
          airingResponse.data.data || []
        );

        setUpcomingAnime(
          upcomingResponse.data.data || []
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnime();
  }, []);

  const renderRow = (
    title: string,
    animeList: any[]
  ) => (
    <div style={{ marginBottom: "50px" }}>
      <h2>{title}</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
        }}
      >
        {animeList.map((anime) => (
          <MediaCard
            key={anime.mal_id}
            id={anime.mal_id}
            type="ANIME"
            title={anime.title}
            imageUrl={
              anime.images?.jpg
                ?.large_image_url
            }
            description={
              anime.synopsis || ""
            }
            link={`/anime/${anime.mal_id}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div style={{ padding: "30px" }}>
        <h1>Anime</h1>

        {renderRow(
          "🏆 Top Anime",
          topAnime
        )}

        {renderRow(
          "🔥 Airing Anime",
          airingAnime
        )}

        {renderRow(
          "🚀 Upcoming Anime",
          upcomingAnime
        )}
      </div>
    </MainLayout>
  );
}

export default Anime;