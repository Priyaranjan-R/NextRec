import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import MediaCard from "../components/MediaCard";
import api from "../services/api";

function Home() {
  const [anime, setAnime] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animeResponse =
          await api.get("/anime/trending");

        setAnime(
          animeResponse.data.data || []
        );

        const movieResponse =
          await api.get("/movies/popular");

        setMovies(
          movieResponse.data.results || []
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div
        style={{
          backgroundColor: "#0B0F19",
          minHeight: "100vh",
          color: "white",
        }}
      >
        {/* Hero Banner */}
        <section
          style={{
            height: "75vh",
            backgroundImage:
              "url('https://images.alphacoders.com/633/633262.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            padding: "60px",
          }}
        >
          <div
            style={{
              background:
                "rgba(0,0,0,0.65)",
              padding: "30px",
              borderRadius: "12px",
              maxWidth: "600px",
            }}
          >
            <h1
              style={{
                fontSize: "72px",
                marginBottom: "10px",
              }}
            >
              NextRec
            </h1>

            <p
              style={{
                fontSize: "20px",
                lineHeight: "1.6",
              }}
            >
              Discover Anime,
              Movies, TV Shows,
              and Games in one place.
            </p>
          </div>
        </section>

        {/* Top Anime */}
        <section
          style={{
            padding: "40px",
          }}
        >
          <h2>Top Anime</h2>

          <div
            style={{
              display: "flex",
              overflowX: "auto",
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
        </section>

        {/* Popular Movies */}
        <section
          style={{
            padding: "40px",
          }}
        >
          <h2>Popular Movies</h2>

          <div
            style={{
              display: "flex",
              overflowX: "auto",
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
        </section>
      </div>
    </MainLayout>
  );
}

export default Home;