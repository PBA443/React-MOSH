import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService.js";
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
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    setMovies(getMovies());
    setGenres(genres);
  }, []);

  const handleDelete = (movie) => {
    setMovies(movies.filter((m) => m._id !== movie._id));
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

  if (movies.length === 0) return <p>There are no movies in the database.</p>;

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
