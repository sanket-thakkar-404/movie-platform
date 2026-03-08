import api from "../api/api";

export const getUsersAPI = async () => {
  const res = await api.get("/admin/users")
  return res.data
};

export const banUserAPI = async (id) => {
  const res = await api.patch(`/admin/users/${id}/ban`);
  return res.data
}

export const deleteUserAPI = async(id) => {
  const res = await api.delete(`/admin/users/${id}`)
  return res.data
}