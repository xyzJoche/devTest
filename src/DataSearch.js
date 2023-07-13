import React, { useState } from 'react';
import axios from 'axios';

const DataSearch = () => {
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('');

  const search = async () => {
    try {
      const response = await axios.get('/search', { params: { filter } });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  const sortResultsByDateDescending = () => {
    const sortedResults = [...results].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    setResults(sortedResults);
  };

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <button onClick={search}>Search</button>
      <button onClick={sortResultsByDateDescending}>Sort by Date (Descending)</button>

      <ul>
        {results.map((result) => (
          <li key={result._id}>
            {/* Displays data in human readable fashion. */}
            {result.timestamp}: {result.symbol}, {result.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataSearch;
