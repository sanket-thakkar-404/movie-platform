import api from "../api/api";


export const getWatchLaterAPI = async () => {
  const res = await api.get("/watch-later/")
  return res.data
}
export const addWatchLaterAPI = async (data) => {
  const res = await api.post("/watch-later/",data)
  return res.data
}
export const removeWatchLaterAPI = async (id) => {
  const res = await api.delete(`/watch-later/${id}`)
  return res.data
}
