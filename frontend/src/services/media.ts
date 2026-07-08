import api from "./api";

export async function syncAnime(malId: number) {
  const response = await api.post("/media/sync/anime", {
    malId,
  });

  return response.data;
}

export async function syncMovie(movieId: number) {
  const response = await api.post("/media/sync/movie", {
    movieId,
  });

  return response.data;
}

export async function syncTV(tvId: number) {
  const response = await api.post("/media/sync/tv", {
    tvId,
  });

  return response.data;
}

export async function syncGame(gameId: number) {
  const response = await api.post("/media/sync/game", {
    gameId,
  });

  return response.data;
}