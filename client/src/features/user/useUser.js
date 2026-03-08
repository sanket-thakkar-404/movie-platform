import { useDispatch, useSelector } from "react-redux"
import { usersStart, usersSuccess, usersFailure, banUserSuccess, deleteUserSuccess } from "./user.slice"
import { getUsersAPI, deleteUserAPI, banUserAPI } from "./userAPI"


export const useUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const getUsers = async () => {
    try {
      dispatch(usersStart())
      const res = await getUsersAPI()
      dispatch(usersSuccess(res))
      return { success: true }
    } catch (err) {
      dispatch(usersFailure(err.message))
    }
  }


  const deleteUser = async (id) => {
    try {
      dispatch(usersStart())
      const res = await deleteUserAPI(id)
      console.log(res)
      dispatch(deleteUserSuccess(id))
      return { success: true }
    } catch (err) {
      dispatch(usersFailure(err.message))
    }
  }

  const banUser = async (id) => {
    try {
      dispatch(usersStart())
      const res = await banUserAPI(id)
      dispatch(banUserSuccess(res.user))
      return { success: true, message: res.message }
    } catch (err) {
      dispatch(usersFailure(err.message))
    }
  }


  return {
    ...users, banUser, getUsers, deleteUser
  }

}
