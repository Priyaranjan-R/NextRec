import type { Media } from "../types/media";

export function mapAnime(anime: any): Media {
  return {
    id: anime.mal_id,

    externalId: anime.mal_id.toString(),

    type: "ANIME",

    title: anime.title,

    imageUrl:
      anime.images?.jpg?.large_image_url ||
      anime.images?.jpg?.image_url ||
      "",

    description:
      anime.synopsis || "",

    rating: anime.score || 0,

    genres:
      anime.genres?.map(
        (g: any) => g.name
      ) || [],

    releaseDate:
      anime.aired?.from,

    link: `/anime/${anime.mal_id}`,
  };
}

export function mapMovie(movie: any): Media {
  return {
    id: movie.id,

    externalId: movie.id.toString(),

    type: "MOVIE",

    title: movie.title,

    imageUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "",

    description:
      movie.overview || "",

    rating:
      movie.vote_average || 0,

    genres: [],

    releaseDate:
      movie.release_date,

    link: `/movie/${movie.id}`,
  };
}

export function mapTV(show: any): Media {
  return {
    id: show.id,

    externalId: show.id.toString(),

    type: "TV",

    title: show.name,

    imageUrl: show.poster_path
      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
      : "",

    description:
      show.overview || "",

    rating:
      show.vote_average || 0,

    genres: [],

    releaseDate:
      show.first_air_date,

    link: `/tv/${show.id}`,
  };
}

export function mapGame(game: any): Media {
  return {
    id: game.id,

    externalId: game.id.toString(),

    type: "GAME",

    title: game.name,

    imageUrl:
      game.background_image || "",

    description:
      game.slug || "",

    rating:
      game.rating || 0,

    genres:
      game.genres?.map(
        (g: any) => g.name
      ) || [],

    releaseDate:
      game.released,

    link: `/game/${game.id}`,
  };
}