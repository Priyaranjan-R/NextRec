import { useEffect, useState } from "react";
import api from "../services/api";
import MediaCard from "../components/MediaCard";
import MainLayout from "../layouts/MainLayout";

function Movies() {
  const [popular, setPopular] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [
          popularRes,
          topRatedRes,
          upcomingRes,
        ] = await Promise.all([
          api.get("/movies/popular"),
          api.get("/movies/top-rated"),
          api.get("/movies/upcoming"),
        ]);

        setPopular(
          popularRes.data.results || []
        );

        setTopRated(
          topRatedRes.data.results || []
        );

        setUpcoming(
          upcomingRes.data.results || []
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const renderRow = (
    title: string,
    movies: any[]
  ) => (
    <section
      style={{
        marginBottom: "60px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "white",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          paddingBottom: "10px",
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
                : "https://via.placeholder.com/300x450"
            }
            description={
              movie.overview || ""
            }
            rating={
              movie.vote_average
            }
            genres={[]}
            link={`/movie/${movie.id}`}
          />
        ))}
      </div>
    </section>
  );

  return (
    <MainLayout>
      <div
        style={{
          padding: "40px",
          color: "white",
        }}
      >
        <h1
          style={{
            marginBottom: "40px",
          }}
        >
          🎬 Movies
        </h1>

        {renderRow(
          "🔥 Popular Movies",
          popular
        )}

        {renderRow(
          "⭐ Top Rated Movies",
          topRated
        )}

        {renderRow(
          "🎥 Upcoming Movies",
          upcoming
        )}
      </div>
    </MainLayout>
  );
}

export default Movies;