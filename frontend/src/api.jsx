import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// har request me token apne aap lagao
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 aaye to refresh karke wahi request dobara bhejo
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (
      err.response?.status === 401 &&
      !original._retry &&
      !original.url.includes("/refresh")
    ) {
      original._retry = true;
      try {
        const { data } = await axios.post(
          `${API_URL}/refresh`,
          {},
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (e) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("businessLogin");
        window.location.href = "/";
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  }
);

export default api;