import api from "../api/api";

export const registerAPI = async (data) => {
  const res = await api.post("/auth/signup", data)
  console.log(res)
  return res.data
}
export const loginAPI = async (data) => {
  const res = await api.post("/auth/login", data)
  return res.data
}
export const logoutAPI = async () => {
  const res = await api.post("/auth/logout")
  return res.data
}