import { logout } from "../services/authService";
const Logout = () => {
  logout();
  window.location.href = "/";
  return null;
};

export default Logout;
