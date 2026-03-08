import { Movie } from "./tmdb";

const getList = (key: string): Movie[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const setList = (key: string, list: Movie[]) =>
  localStorage.setItem(key, JSON.stringify(list));

const userKey = (userId: string, type: "favorites" | "watchlater") =>
  `cineverse_${type}_${userId}`;

export const getFavorites = (userId: string) => getList(userKey(userId, "favorites"));

export const isFavorite = (userId: string, movieId: number) =>
  getFavorites(userId).some((m) => m.id === movieId);

export const toggleFavorite = (userId: string, movie: Movie): boolean => {
  const key = userKey(userId, "favorites");
  const list = getList(key);
  const exists = list.some((m) => m.id === movie.id);
  if (exists) {
    setList(key, list.filter((m) => m.id !== movie.id));
    return false;
  } else {
    setList(key, [movie, ...list]);
    return true;
  }
};

export const getWatchLater = (userId: string) => getList(userKey(userId, "watchlater"));

export const isWatchLater = (userId: string, movieId: number) =>
  getWatchLater(userId).some((m) => m.id === movieId);

export const toggleWatchLater = (userId: string, movie: Movie): boolean => {
  const key = userKey(userId, "watchlater");
  const list = getList(key);
  const exists = list.some((m) => m.id === movie.id);
  if (exists) {
    setList(key, list.filter((m) => m.id !== movie.id));
    return false;
  } else {
    setList(key, [movie, ...list]);
    return true;
  }
};
