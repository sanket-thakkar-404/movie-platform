import api from "../api/api";


export const getFavoriteAPI = async () => {
  const res = await api.get("/favorites/")
  return res.data
}
export const addFavoriteAPI = async (data) => {
  const res = await api.post("/favorites/",data)
  return res.data
}
export const removeFavoriteAPI = async (id) => {
  const res = await api.delete(`/favorites/${id}`)
  return res.data
}
