import axios from "axios";

const API_KEY = "80ab8214a81c8273a9f3475cebdfd63c";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_BASE = "https://image.tmdb.org/t/p";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  media_type?: string;
}

export interface MovieDetails extends Movie {
  runtime?: number;
  genres: { id: number; name: string }[];
  tagline?: string;
  status?: string;
  videos?: { results: Video[] };
  credits?: { cast: Cast[] };
  similar?: { results: Movie[] };
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export const getTrending = (page = 1) =>
  tmdb.get<{ results: Movie[]; total_pages: number }>("/trending/all/week", { params: { page } });

export const getPopular = (page = 1) =>
  tmdb.get<{ results: Movie[]; total_pages: number }>("/movie/popular", { params: { page } });

export const getTopRated = (page = 1) =>
  tmdb.get<{ results: Movie[]; total_pages: number }>("/movie/top_rated", { params: { page } });

export const getNowPlaying = (page = 1) =>
  tmdb.get<{ results: Movie[]; total_pages: number }>("/movie/now_playing", { params: { page } });

export const getTVPopular = (page = 1) =>
  tmdb.get<{ results: Movie[]; total_pages: number }>("/tv/popular", { params: { page } });

export const getMovieDetails = (id: number) =>
  tmdb.get<MovieDetails>(`/movie/${id}`, { params: { append_to_response: "videos,credits,similar" } });

export const getTVDetails = (id: number) =>
  tmdb.get<MovieDetails>(`/tv/${id}`, { params: { append_to_response: "videos,credits,similar" } });

export const searchMulti = (query: string, page = 1) =>
  tmdb.get<{ results: Movie[]; total_pages: number }>("/search/multi", { params: { query, page } });

export const getGenres = () =>
  tmdb.get<{ genres: { id: number; name: string }[] }>("/genre/movie/list");

export const posterUrl = (path: string | null, size = "w500") =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const backdropUrl = (path: string | null, size = "original") =>
  path ? `${IMG_BASE}/${size}${path}` : null;
