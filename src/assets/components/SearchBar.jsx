import React from "react";

function SearchBar() {
  return (
      <div className="bg-darknavbg py-3 px-4 shadow-md w-full">
        <form className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full">

          {/* Search Keyword */}
          <input
              className="w-full md:flex-1 px-4 py-2 border border-gray-300 !rounded-md bg-transparent placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="search"
              placeholder="Search Keyword"
              aria-label="Search"
          />

          {/* City */}
          <input
              className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-md bg-transparent placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="text"
              placeholder="City"
              aria-label="City"
          />

          {/* Province */}
          <input
              className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-md bg-transparent placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="text"
              placeholder="Province"
              aria-label="Province"
          />

          {/* Search Button */}
          <button
              className="w-full md:w-auto bg-white text-navbg px-4 py-2 !rounded-md border border-white hover:bg-gray-200 transition"
              type="submit"
          >
            Search
          </button>
        </form>
      </div>


  );
}

export default SearchBar;
