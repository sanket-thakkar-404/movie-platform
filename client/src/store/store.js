import { configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"

import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"

import authReducer from "../features/auth/authSlice"
import favoriteReducer from "../features/Favorites/favorites.slice"
import watchLaterReducer from "../features/watchLater/watchLater.slice"
import moviesReducer from "../features/movies/movies.slice"
import usersReducer from "../features/user/user.slice"

const rootReducer = combineReducers({
  movies: moviesReducer,
  users: usersReducer,
  auth: authReducer,
  favorite: favoriteReducer,
  watchLater: watchLaterReducer
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "favorite", "watchLater"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER
        ]
      }
    })
})

export const persistor = persistStore(store)