
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  watchLater: [],
  loading: false,
  error: null
}

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState,

  reducers: {

    watchLaterStart: (state) => {
      state.loading = true
      state.error = null
    },

    watchLaterSuccess: (state, action) => {
      state.loading = false
      if (Array.isArray(action.payload)) {
        state.watchLater = action.payload
      } else if (action.payload.watchLater) {
        state.watchLater.push(action.payload.watchLater)
      } else {
        state.favorite.push(action.payload)
      }
    },
    watchLaterFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },


    watchLaterRemove: (state, action) => {
      state.watchLater = state.watchLater.filter(
        (movie) => Number(movie.tmdbId) !== Number(action.payload)
      )
    }

  }

})

export const { watchLaterFailure, watchLaterRemove, watchLaterStart, watchLaterSuccess } = watchLaterSlice.actions

export default watchLaterSlice.reducer