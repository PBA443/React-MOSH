import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar.jsx";
import Movies from "./components/movies.jsx";
import NotFound from "./components/notFound.jsx";
import Customers from "./components/customers.jsx";
import Rentals from "./components/rentals.jsx";
import MovieForm from "./components/movieForm.jsx";
import LoginForm from "./components/loginForm.jsx";
import RegisterForm from "./components/registerForm.jsx";
import { getCurrentUser } from "./services/authService.js";
import Logout from "./components/logout.jsx";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);
  return (
    <>
      <ToastContainer></ToastContainer>
      <NavBar user={user}></NavBar>
      <div className="content">
        <Routes>
          <Route
            path="/login"
            element={<LoginForm setUser={setUser}></LoginForm>}
          ></Route>
          <Route path="/logout" element={<Logout></Logout>}></Route>
          <Route
            path="/register"
            element={<RegisterForm></RegisterForm>}
          ></Route>
          <Route
            path="/movies/:id"
            element={
              user ? (
                <MovieForm user={user}></MovieForm>
              ) : (
                <Navigate to="/login" state={{ from: location }}></Navigate>
              )
            }
          ></Route>
          <Route path="/" element={<Movies user={user}></Movies>}></Route>
          <Route path="/movies" element={<Navigate to="/"></Navigate>}></Route>
          <Route path="/rentals" element={<Rentals></Rentals>}></Route>
          <Route path="/customers" element={<Customers></Customers>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
