import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import MediaCard from "../components/MediaCard";
import api from "../services/api";

function Home() {
  const [anime, setAnime] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [tv, setTv] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);

  const [featured, setFeatured] =
    useState<any>(null);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    const loadHome = async () => {
      try {
        const [
          animeRes,
          movieRes,
          tvRes,
          gameRes,
        ] = await Promise.all([
          api.get("/anime/top"),
          api.get("/movies/popular"),
          api.get("/tv/top-rated"),
          api.get("/games/popular"),
        ]);

        const animeData =
          animeRes.data.data || [];

        setAnime(animeData.slice(0, 12));

        setMovies(
          movieRes.data.results?.slice(0, 12) ||
            []
        );

        setTv(
          tvRes.data.results?.slice(0, 12) ||
            []
        );

        setGames(
          gameRes.data.results?.slice(0, 12) ||
            []
        );

        if (animeData.length > 0) {
          setFeatured(animeData[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadHome();
  }, []);

  const renderSection = (
    title: string,
    items: any[],
    type: string
  ) => (
    <section
      style={{
        marginTop: 70,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: 32,
          }}
        >
          {title}
        </h2>

        <span
          style={{
            color: "#8B5CF6",
            cursor: "pointer",
          }}
        >
          View All →
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          paddingBottom: 15,
        }}
      >
                {items.map((item) => {
          if (type === "anime") {
            return (
              <MediaCard
                key={item.mal_id}
                id={item.mal_id}
                type="ANIME"
                title={item.title}
                imageUrl={
                  item.images?.jpg?.large_image_url
                }
                description={
                  item.synopsis || ""
                }
                rating={item.score}
                genres={
                  item.genres?.map(
                    (g: any) => g.name
                  ) || []
                }
                link={`/anime/${item.mal_id}`}
              />
            );
          }

          if (type === "movie") {
            return (
              <MediaCard
                key={item.id}
                id={item.id}
                type="MOVIE"
                title={item.title}
                imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                description={item.overview}
                rating={item.vote_average}
                genres={[]}
                link={`/movie/${item.id}`}
              />
            );
          }

          if (type === "tv") {
            return (
              <MediaCard
                key={item.id}
                id={item.id}
                type="TV"
                title={item.name}
                imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                description={item.overview}
                rating={item.vote_average}
                genres={[]}
                link={`/tv/${item.id}`}
              />
            );
          }

          return (
            <MediaCard
              key={item.id}
              id={item.id}
              type="GAME"
              title={item.name}
              imageUrl={
                item.background_image
              }
              description=""
              rating={item.rating}
              genres={
                item.genres?.map(
                  (g: any) => g.name
                ) || []
              }
              link={`/games/${item.id}`}
            />
          );
        })}
      </div>
    </section>
  );

  return (
    <MainLayout>
      <div
        style={{
          background: "#090B13",
          minHeight: "100vh",
          color: "white",
        }}
      >
        {featured && (
          <section
            style={{
              height: "90vh",
              backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(9,11,19,1)), url(${featured.images.jpg.large_image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              padding: "0 70px",
            }}
          >
            <div
              style={{
                maxWidth: 700,
              }}
            >
              <div
                style={{
                  color: "#8B5CF6",
                  fontWeight: 700,
                  marginBottom: 15,
                  letterSpacing: 2,
                }}
              >
                FEATURED ANIME
              </div>

              <h1
                style={{
                  fontSize: 68,
                  marginBottom: 20,
                  lineHeight: 1.05,
                }}
              >
                {featured.title}
              </h1>

              <p
                style={{
                  color: "#DDD",
                  lineHeight: 1.8,
                  fontSize: 18,
                  marginBottom: 35,
                }}
              >
                {featured.synopsis?.substring(
                  0,
                  250
                )}
                ...
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 15,
                }}
              >
                <Link
                  to={`/anime/${featured.mal_id}`}
                  style={{
                    padding:
                      "14px 34px",
                    borderRadius: 12,
                    background:
                      "#8B5CF6",
                    color: "white",
                    textDecoration:
                      "none",
                    fontWeight: 700,
                  }}
                >
                  ▶ View Details
                </Link>

                <Link
                  to="/recommendations"
                  style={{
                    padding:
                      "14px 34px",
                    borderRadius: 12,
                    border:
                      "1px solid #666",
                    color: "white",
                    textDecoration:
                      "none",
                  }}
                >
                  AI Picks
                </Link>
              </div>
            </div>
          </section>
        )}

        <div
          style={{
            maxWidth: 1600,
            margin: "0 auto",
            padding: "0 45px 70px",
          }}
        >
          {user.id && (
            <div
              style={{
                marginTop: 60,
                padding: 30,
                borderRadius: 18,
                background:
                  "linear-gradient(135deg,#8B5CF6,#4F46E5)",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    marginBottom: 10,
                  }}
                >
                  Personalized Recommendations
                </h2>

                <p>
                  We've generated
                  recommendations
                  based on your
                  favorites, ratings,
                  reviews and watchlist.
                </p>
              </div>

              <Link
                to="/recommendations"
                style={{
                  background:
                    "white",
                  color: "#4F46E5",
                  padding:
                    "14px 28px",
                  borderRadius: 12,
                  fontWeight: 700,
                  textDecoration:
                    "none",
                }}
              >
                Explore →
              </Link>
            </div>
          )}

          {renderSection(
            "🔥 Trending Anime",
            anime,
            "anime"
          )}

          {renderSection(
            "🎬 Popular Movies",
            movies,
            "movie"
          )}

          {renderSection(
            "📺 Top TV Shows",
            tv,
            "tv"
          )}

          {renderSection(
            "🎮 Popular Games",
            games,
            "game"
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;