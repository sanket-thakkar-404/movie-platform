
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  favorite: [],
  loading: false,
  error: null
}

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,

  reducers: {

    favoriteStart: (state) => {
      state.loading = true
      state.error = null
    },

    favoriteSuccess: (state, action) => {
      state.loading = false

      if (Array.isArray(action.payload)) {
        state.favorite = action.payload
      } else if (action.payload.favorite) {
        state.favorite.push(action.payload.favorite)
      } else {
        state.favorite.push(action.payload)
      }
    },

    favoriteFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },


    remove: (state, action) => {
      state.favorite = state.favorite.filter(
        (movie) => Number(movie.tmdbId) !== Number(action.payload)
      )
    }

  }

})

export const { favoriteStart, favoriteSuccess, favoriteFailure, remove } = favoriteSlice.actions

export default favoriteSlice.reducer