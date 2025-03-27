import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovies, saveMovie } from "../services/movieService";
import Form from "./common/form";
import Input from "./common/input";
import Select from "./common/select";
import { useParams, useNavigate } from "react-router-dom";

const MovieForm = () => {
  const [genres, setGenres] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  const [defaultValues, setDefaultValues] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: genresData } = await getGenres();
        setGenres(genresData);

        if (id === "new") return;

        const { data: movies } = await getMovies();
        const movie = movies.find((m) => m._id === id);
        if (!movie) {
          navigate("/not-found", { replace: true });
          return;
        }
        setDefaultValues(mapToViewModel(movie));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id, navigate]);

  const mapToViewModel = (movie) => ({
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  const doSubmit = async (data) => {
    try {
      await saveMovie(data);
      navigate("/movies");
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  return (
    <div className="form-group">
      <h1>Movie Form</h1>
      <Form schema={schema} doSubmit={doSubmit} defaultValues={defaultValues}>
        <Input name="title" label="Title" />
        <Select name="genreId" label="Genre" options={genres} />
        <Input name="numberInStock" label="Number in Stock" type="number" />
        <Input name="dailyRentalRate" label="Rate" type="number" />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </Form>
    </div>
  );
};

export default MovieForm;
