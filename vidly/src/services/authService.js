import http from "./httpService";
import { jwtDecode } from "jwt-decode";

const apiEndpoint = import.meta.env.VITE_API_URL + "/auth";
const tokenKey = "token";
http.setJwt(getJwt());
export async function login(data) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email: data.email,
    password: data.password,
  });
  localStorage.setItem(tokenKey, jwt);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
function getJwt() {
  return localStorage.getItem(tokenKey);
}
export function getCurrentUser() {
  const jwt = localStorage.getItem(tokenKey);
  if (!jwt) return null;
  try {
    return jwtDecode(jwt);
  } catch (ex) {
    console.error("Invalid token", ex);
    return null;
  }
}
