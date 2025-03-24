import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            style={{ cursor: "pointer" }}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            Previous
          </a>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              style={{ cursor: "pointer" }}
              onClick={() => onPageChange(page)}
              className="page-link"
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === pagesCount ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            style={{ cursor: "pointer" }}
            onClick={() =>
              currentPage < pagesCount && onPageChange(currentPage + 1)
            }
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
