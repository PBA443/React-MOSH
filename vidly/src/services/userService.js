import http from "./httpService";

const apiEndpoint = import.meta.env.VITE_API_URL + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
