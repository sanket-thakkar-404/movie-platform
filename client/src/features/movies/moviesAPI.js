import tmdb from "../api/movieAPI"

const fetchMovies = async (endpoint = {}) => {
  try {

    const res = await tmdb.get(endpoint)
    return res.data.results
  } catch (err) {
    console.error("API error:", err)
  }
}
export const getTrendingAPI = () => fetchMovies("/trending/all/week")
export const getPopularAPI = () => fetchMovies("/movie/popular")
export const getTopRatedAPI = () => fetchMovies("/movie/top_rated")
export const getTVPopularAPI = () => fetchMovies("/tv/popular")
export const getNowPlayingAPI = () => fetchMovies("/movie/now_playing")

export const getMovieDetailsAPI = async (id) => {
  const res = await tmdb.get(`/movie/${id}`, {
    params: { append_to_response: "videos,credits,similar" }
  })
  return res.data
}

export const getTVDetailsAPI = async (id) => {
  const res = await tmdb.get(`/tv/${id}`, {
    params: { append_to_response: "videos,credits,similar" }
  })
  return res.data
}

export const searchMultiAPI = async (query, page = 1) => {
  const res = await tmdb.get("/search/multi", {
    params: { query, page }
  })

  return res.data
}