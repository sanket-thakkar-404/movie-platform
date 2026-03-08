import { useDispatch, useSelector } from "react-redux"

import {
  moviesStart,
  trendingSuccess,
  popularSuccess,
  topRatedSuccess,
  nowPlayingSuccess,
  tvPopularSuccess,
  moviesFailure,
  searchSuccess,
} from "./movies.slice"

import {
  getTrendingAPI,
  getPopularAPI,
  getTopRatedAPI,
  getNowPlayingAPI,
  getTVPopularAPI,
  searchMultiAPI,
  getMovieDetailsAPI,
  getTVDetailsAPI
} from "./moviesAPI"

export const useMovies = () => {

  const dispatch = useDispatch()
  const movies = useSelector((state) => state.movies)

  const getTrending = async () => {
    try {
      dispatch(moviesStart())
      const res = await getTrendingAPI()
      dispatch(trendingSuccess(res))
    } catch (err) {
      dispatch(moviesFailure(err.message))
    }
  }

  const getPopular = async () => {
    try {
      dispatch(moviesStart())
      const res = await getPopularAPI()
      dispatch(popularSuccess(res))
    } catch (err) {
      dispatch(moviesFailure(err.message))
    }
  }

  const getTopRated = async () => {
    try {
      dispatch(moviesStart())
      const res = await getTopRatedAPI()
      dispatch(topRatedSuccess(res))
    } catch (err) {
      dispatch(moviesFailure(err.message))
    }
  }

  const getNowPlaying = async () => {
    try {
      dispatch(moviesStart())
      const res = await getNowPlayingAPI()
      dispatch(nowPlayingSuccess(res))
    } catch (err) {
      dispatch(moviesFailure(err.message))
    }
  }

  const getTVPopular = async () => {
    try {
      dispatch(moviesStart())
      const res = await getTVPopularAPI()
      dispatch(tvPopularSuccess(res))
    } catch (err) {
      dispatch(moviesFailure(err.message))
    }
  }

  const getMovieDetails = async (id) => {

    try {

      dispatch(moviesStart())

      const res = await getMovieDetailsAPI(id)

      dispatch(movieDetailsSuccess(res))

    } catch (err) {

      dispatch(moviesFailure(err.message))

    }

  }

  const getTVDetails = async (id) => {

    try {

      dispatch(moviesStart())

      const res = await getTVDetailsAPI(id)

      dispatch(movieDetailsSuccess(res))

    } catch (err) {

      dispatch(moviesFailure(err.message))

    }

  }

  const searchMovies = async (query, page = 1) => {

    try {
      dispatch(moviesStart());
      const res = await searchMultiAPI(query, page);
      dispatch(searchSuccess(res));
    } catch (err) {
      dispatch(moviesFailure(err.message));
    }

  };

  return {
    ...movies,
    getTrending,
    getPopular,
    getTopRated,
    getNowPlaying,
    getTVPopular,
    searchMovies,
    getMovieDetails,
    getTVDetails
  }

}