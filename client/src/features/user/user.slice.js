import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  users: [],
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {

    usersStart: (state) => {
      state.loading = true
      state.error = null
    },

    usersSuccess: (state, action) => {
      state.loading = false
      state.users = action.payload
    },

    usersFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    banUserSuccess: (state, action) => {
      const user = state.users.find(
        (u) => u._id === action.payload._id
      )
      if (user) {
        user.isBanUser = action.payload.isBanUser
      }
    },

    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter((u) => {
        const keepUser = u._id !== action.payload
        return keepUser
      })

    }

  }

})

export const {
  usersStart,
  usersSuccess,
  usersFailure,
  banUserSuccess,
  deleteUserSuccess
} = userSlice.actions

export default userSlice.reducer