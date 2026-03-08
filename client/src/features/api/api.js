import axios from "axios"

const api = axios.create({
  baseURL: "https://movie-platform-mw1w.onrender.com/api",
  withCredentials: true,
})


export default api