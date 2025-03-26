import React, { useState, useEffect } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService.js";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/listGroup.jsx";
import MoviesTable from "./moviesTable.jsx";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import SearchBox from "./searchBox.jsx";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGenres() {
      try {
        const { data } = await getGenres();
        const genres = [{ _id: "", name: "All Genres" }, ...data];
        setGenres(genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }

    async function fetchMovies() {
      try {
        const { data: movies } = await getMovies();
        setMovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchGenres();
    fetchMovies();
  }, []);

  const handleDelete = async (movie) => {
    const previousMovies = [...movies];
    try {
      await deleteMovie(movie._id);
      setMovies((m) => m.filter((m) => m._id !== movie._id));
    } catch (error) {
      setMovies(previousMovies);
      if (error.response && error.response.status === 404) {
        toast.error("This movie has already been deleted.");
      } else {
        toast.error("An error occurred while deleting the movie.");
      }
    }
  };

  const handleLike = (movie) => {
    const updatedMovies = movies.map((m) =>
      m._id === movie._id ? { ...m, liked: !m.liked } : m
    );
    setMovies(updatedMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPageData = () => {
    let filtered = movies;
    if (searchQuery)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatedMovies };
  };

  const handleSave = () => {
    navigate("/movies/new");
  };

  if (movies.length === 0)
    return (
      <>
        <p>There are no movies in the database.</p>
        <button onClick={handleSave} className="btn btn-primary mb-3">
          Add movie
        </button>
      </>
    );

  const { totalCount, data: paginatedMovies } = getPageData();

  return (
    <>
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={handleGenreSelect}
          />
        </div>
        <div className="col">
          <button onClick={handleSave} className="btn btn-primary mb-3">
            Add movie
          </button>
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={handleSearch}></SearchBox>
          <MoviesTable
            movies={paginatedMovies}
            sortColumn={sortColumn}
            onDelete={handleDelete}
            onLike={handleLike}
            onSort={handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Movies;
