import React from 'react'

const Search = ({ handleSearch }) => {
  return (
    <div>
        <input
          className="form-control me-2 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleSearch}
        />
    </div>
  )
}

export default Search
