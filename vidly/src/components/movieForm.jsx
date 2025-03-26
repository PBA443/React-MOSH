import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import Input from "./common/input"; // Assuming Input and Select are your reusable components
import Select from "./common/select";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie, saveMovie } from "../services/fakeMovieService";

const MovieForm = () => {
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});
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

  useEffect(() => {
    const fetchedGenres = getGenres();
    setGenres(fetchedGenres);
    if (id === "new") return;
    const movie = getMovie(id);
    if (!movie) return navigate("/not-found", { replace: true });
    setData(mapToViewModel(movie));
  }, [id, navigate]);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const validate = () => {
    const { error } = Joi.validate(data, schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propertySchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, propertySchema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const updatedErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) updatedErrors[input.name] = errorMessage;
    else delete updatedErrors[input.name];

    setData((prevData) => ({
      ...prevData,
      [input.name]: input.value,
    }));
    setErrors(updatedErrors);
  };

  const renderButton = (label) => {
    return (
      <button disabled={validate()} type="submit" className="btn btn-primary">
        {label}
      </button>
    );
  };

  const renderInput = (name, label) => {
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={name === "password" ? "password" : "text"}
        onChange={handleChange}
        placeholder={`Enter ${label}`}
        error={errors[name]}
      />
    );
  };

  const renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const doSubmit = () => {
    saveMovie(data);
    navigate("/movies");
  };

  return (
    <div className="form-group">
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("title", "Title")}
        {renderSelect("genreId", "Genre", genres)}
        {renderInput("numberInStock", "Number in Stock")}
        {renderInput("dailyRentalRate", "Rate")}
        {renderButton("Save")}
      </form>
    </div>
  );
};

export default MovieForm;
