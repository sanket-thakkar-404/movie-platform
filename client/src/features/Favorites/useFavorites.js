import { useDispatch, useSelector } from "react-redux"
import { favoriteStart, favoriteFailure, favoriteSuccess,remove } from "./favorites.slice"
import { addFavoriteAPI, getFavoriteAPI, removeFavoriteAPI } from "./favoriteAPI"

export const useFavorite = () => {
  const dispatch = useDispatch()
  const favorite = useSelector((state) => state.favorite)


  const addToFavorite = async (data) => {
    try {
      dispatch(favoriteStart())
      const res = await addFavoriteAPI(data)
      dispatch(favoriteSuccess(res))
      return { success: true }
    } catch (err) {
      dispatch(favoriteFailure(err.message))
      console.error("adding favorite error", err.message)
      return { success: false }
    }
  }


  const getFavorite = async () => {
    try {
      dispatch(favoriteStart())
      const res = await getFavoriteAPI()
      dispatch(favoriteSuccess(res))
      return { success: true }
    } catch (err) {
      dispatch(favoriteFailure(err.message))
      console.error("getting favorite error", err.message)
      return { success: false }
    }
  }

  const removeFavorite = async (id) => {
    try {
      dispatch(favoriteStart())
      const res = await removeFavoriteAPI(id)
       dispatch(remove(id))
      dispatch(favoriteSuccess(res))
     
      return { success: true }
    } catch (err) {
      dispatch(favoriteFailure(err.message))
      console.error("removing favorite error", err.message)
      return { success: false }
    }
  }


  return {
    ...favorite, addToFavorite, getFavorite, removeFavorite
  }

}
