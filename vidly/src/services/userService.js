import http from "./httpService";

const apiEndpoint = import.meta.env.VITE_API_URL + "/users";

export function register(user) {
  console.log("Data after submitted:", user);

  return http
    .post(apiEndpoint, {
      email: user.email,
      password: user.password,
      name: user.name,
    })
    .then((response) => {
      console.log("API Response:", response.data);
      return response;
    })
    .catch((error) => {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
}
