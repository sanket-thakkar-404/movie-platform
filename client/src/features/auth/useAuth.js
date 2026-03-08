import { useDispatch, useSelector } from "react-redux"
import { authStart, authFailure, authSuccess, logout as logoutAction } from "./authSlice"
import { loginAPI, registerAPI, logoutAPI } from "./authAPI"

export const useAuth = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)

  const login = async (data) => {
    try {
      dispatch(authStart())
      const res = await loginAPI(data)
      dispatch(authSuccess(res))
      return { success: true }
    } catch (err) {
      dispatch(authFailure(err.message))
    }
  }

  const register = async (data) => {
    try {
      dispatch(authStart())
      const res = await registerAPI(data)
      dispatch(authSuccess(res))
      return { success: true }
    } catch (err) {
      dispatch(authFailure(err.message))
    }
  }

  const logout = async () => {
    try {
      dispatch(authStart())

      await logoutAPI()

      dispatch(logoutAction())

      return { success: true }

    } catch (err) {
      dispatch(authFailure(err.message))
    }
  }

  return {
    ...user,
    login,
    register,
    logout
  }

}