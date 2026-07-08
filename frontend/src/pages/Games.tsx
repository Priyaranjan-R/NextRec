import { useEffect, useState } from "react";
import api from "../services/api";
import MediaCard from "../components/MediaCard";
import MainLayout from "../layouts/MainLayout";

function Games() {
  const [popular, setPopular] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [newGames, setNewGames] = useState<any[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const [
          popularRes,
          topRatedRes,
          newRes,
        ] = await Promise.all([
          api.get("/games/popular"),
          api.get("/games/top-rated"),
          api.get("/games/new"),
        ]);

        setPopular(popularRes.data.results || []);
        setTopRated(topRatedRes.data.results || []);
        setNewGames(newRes.data.results || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, []);

  const renderRow = (
    title: string,
    games: any[]
  ) => (
    <div
      style={{
        marginBottom: "50px",
      }}
    >
      <h2>{title}</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {games.map((game) => (
          <MediaCard
            key={game.id}
            id={game.id}
            title={game.name}
            imageUrl={game.background_image}
            description={""}
            link={`/games/${game.id}`}
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
          Games
        </h1>

        {renderRow(
          "🔥 Popular Games",
          popular
        )}

        {renderRow(
          "⭐ Top Rated Games",
          topRated
        )}

        {renderRow(
          "🚀 New Releases",
          newGames
        )}
      </div>
    </MainLayout>
  );
}

export default Games;