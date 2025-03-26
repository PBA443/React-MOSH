import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar.jsx";
import Movies from "./components/movies.jsx";
import NotFound from "./components/notFound.jsx";
import Customers from "./components/customers.jsx";
import Rentals from "./components/rentals.jsx";
import MovieForm from "./components/movieForm.jsx";
import LoginForm from "./components/loginForm.jsx";
import RegisterForm from "./components/registerForm.jsx";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer></ToastContainer>
      <NavBar></NavBar>
      <div className="content">
        <Routes>
          <Route path="/login" element={<LoginForm></LoginForm>}></Route>
          <Route
            path="/register"
            element={<RegisterForm></RegisterForm>}
          ></Route>
          <Route path="/movies/:id" element={<MovieForm></MovieForm>}></Route>
          <Route path="/" element={<Movies></Movies>}></Route>
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
