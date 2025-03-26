import http from "./httpService";

const apiEndpoint = import.meta.env.VITE_API_URL + "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    console.log(body);
    return http.put(apiEndpoint + "/" + movie._id, body);
  }
  return http.post(apiEndpoint, movie);
}
