import { useState } from "react";
import api from "../services/api";
import MediaCard from "../components/MediaCard";
import MainLayout from "../layouts/MainLayout";

function Search() {
  const [query, setQuery] = useState("");

  const [anime, setAnime] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [tv, setTv] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const searchAll = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const response = await api.get(
        `/search?q=${query}`
      );

      setAnime(response.data.anime || []);
      setMovies(response.data.movies || []);
      setTv(response.data.tv || []);
      setGames(response.data.games || []);
    } catch (error) {
      console.error(error);
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          padding: "30px",
        }}
      >
        <h1>Search Everything</h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Search anime, movies, tv, games..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            style={{
              padding: "12px",
              width: "400px",
            }}
          />

          <button onClick={searchAll}>
            Search
          </button>
        </div>

        {loading && <h3>Loading...</h3>}

        {/* Anime */}
        {anime.length > 0 && (
          <>
            <h2>Anime</h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {anime.map((item) => (
                <MediaCard
                  key={item.mal_id}
                  id={item.mal_id}
                  type="ANIME"
                  title={item.title}
                  imageUrl={
                    item.images?.jpg
                      ?.large_image_url
                  }
                  description={
                    item.synopsis || ""
                  }
                  link={`/anime/${item.mal_id}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Movies */}
        {movies.length > 0 && (
          <>
            <h2>Movies</h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {movies.map((movie) => (
                <MediaCard
                  key={movie.id}
                  id={movie.id}
                  type="MOVIE"
                  title={movie.title}
                  imageUrl={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : ""
                  }
                  description={
                    movie.overview || ""
                  }
                  link={`/movie/${movie.id}`}
                />
              ))}
            </div>
          </>
        )}

        {/* TV */}
        {tv.length > 0 && (
          <>
            <h2>TV Series</h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {tv.map((show) => (
                <MediaCard
                  key={show.id}
                  id={show.id}
                  type="TV"
                  title={show.name}
                  imageUrl={
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                      : ""
                  }
                  description={
                    show.overview || ""
                  }
                  link={`/tv/${show.id}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Games */}
        {games.length > 0 && (
          <>
            <h2>Games</h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {games.map((game) => (
                <MediaCard
                  key={game.id}
                  id={game.id}
                  type="GAME"
                  title={game.name}
                  imageUrl={
                    game.background_image || ""
                  }
                  description=""
                  link={`/game/${game.id}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default Search;