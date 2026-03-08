import { useDispatch, useSelector } from "react-redux"
import { watchLaterStart, watchLaterSuccess, watchLaterFailure, watchLaterRemove } from "./watchLater.slice"
import { addWatchLaterAPI, removeWatchLaterAPI, getWatchLaterAPI } from "./watchLaterAPI"

export const useWatchLater = () => {
  const dispatch = useDispatch()
  const watchLater = useSelector((state) => state.watchLater)



  const addToWatchLater = async (data) => {
    try {
      dispatch(watchLaterStart())
      const res = await addWatchLaterAPI(data)
      dispatch(watchLaterSuccess(res))
      return { success: true }
    } catch (err) {
      dispatch(watchLaterFailure(err.message))
      console.error("adding favorite error", err.message)
      return { success: false }
    }
  }


  const getWatchLater = async () => {
    try {
      dispatch(watchLaterStart())
      const res = await getWatchLaterAPI()
      dispatch(watchLaterSuccess(res))
      return { success: true }
    } catch (err) {
      dispatch(watchLaterFailure(err.message))
      console.error("getting favorite error", err.message)
      return { success: false }
    }
  }

  const removeWatchLater = async (id) => {
    try {
      dispatch(watchLaterStart())
      await removeWatchLaterAPI(id)
      dispatch(watchLaterRemove(id))
      return { success: true }
    } catch (err) {
      dispatch(watchLaterFailure(err.message))
      console.error("removing favorite error", err.message)
      return { success: false }
    }
  }


  return {
    ...watchLater, addToWatchLater, getWatchLater, removeWatchLater
  }

}
