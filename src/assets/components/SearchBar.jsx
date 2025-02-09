import React from "react";
import PropTypes from "prop-types";

function SearchBar() {
  return (
    <div className="container-fluid">
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search Keyword"
          aria-label="Search"
        />
        <input
          className="form-control me-2"
          type="text"
          placeholder="City"
          aria-label="City"
        />
        <input
          className="form-control me-2"
          type="text"
          placeholder="Province"
          aria-label="Province"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  // Define props here
};

export default SearchBar;
