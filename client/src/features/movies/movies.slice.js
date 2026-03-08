import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  trending: [],
  popular: [],
  topRated: [],
  nowPlaying: [],
  tvPopular: [],
  searchResults: [],
  movieDetails: null,
  totalPages: 1,
  loading: false,
  error: null
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,

  reducers: {

    moviesStart: (state) => {
      state.loading = true
      state.error = null
    },

    trendingSuccess: (state, action) => {
      state.trending = action.payload
    },

    popularSuccess: (state, action) => {
      state.popular = action.payload
    },

    topRatedSuccess: (state, action) => {
      state.topRated = action.payload
    },

    nowPlayingSuccess: (state, action) => {
      state.loading = false
      state.nowPlaying = action.payload
    },

    tvPopularSuccess: (state, action) => {
      state.loading = false
      state.tvPopular = action.payload
    },
    movieDetailsSuccess: (state, action) => {
      state.loading = false
      state.movieDetails = action.payload
    },
    searchSuccess: (state, action) => {
      state.loading = false;
      state.searchResults = action.payload.results;
      state.totalPages = action.payload.total_pages;
    },

    moviesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }

  }

})

export const {
  moviesStart,
  trendingSuccess,
  popularSuccess,
  topRatedSuccess,
   movieDetailsSuccess,
  nowPlayingSuccess,
  tvPopularSuccess,
  moviesFailure,
  searchSuccess
} = moviesSlice.actions

export default moviesSlice.reducer