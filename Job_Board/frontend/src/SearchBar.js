import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setJobs }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`/api/jobs/search?query=${query}`);
    setJobs(res.data);
  };

  return (
    <form onSubmit={handleSearch}>
      <input type="text" placeholder="Search jobs..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
