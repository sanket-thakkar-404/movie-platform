import axios from "axios";


const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY


const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: MOVIE_API_KEY }
})


export default tmdb



