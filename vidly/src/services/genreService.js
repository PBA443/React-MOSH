import http from "./httpService";

export function getGenres() {
  return http.get(import.meta.env.VITE_API_URL + "/genres");
}
