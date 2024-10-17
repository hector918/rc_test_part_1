import React, { useState } from "react";
import axios from "axios";

const SearchMovies = () => {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3001/search?title=${title}`
      );
      console.log(response);
      setResults(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div>
        Only search movie titles below:
        <ul>
          <li>The Matrix</li>
          <li>The Godfather</li>
          <li>The Dark Knight</li>
          <li>Pulp Fiction</li>
          <li>Inception</li>
          <li>Avatar</li>
          <li>Titanic</li>
        </ul>
      </div>
      <form onSubmit={handleSearch}>
        <label>
          Movie Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            pattern="^[\p{L}\p{N}\s?*]+$"
            title="Only letters, numbers, spaces, question marks, and asterisks are allowed"
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {results.length > 0 && (
        <ul>
          {results.map((result, index) => {
            const date = new Date(result.release_date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            const formattedDate = `${year}-${month}-${day}`;
            return (
              <li key={index}>
                {result.title} release date: {formattedDate}{" "}
              </li>
            );
          })}
        </ul>
      )}
      ------------------------
      <div>
        Insert the line below into the input box:(including the ')
        <br />
        <span>' OR 1=1; SELECT * FROM users --</span>
      </div>
      <div>
        {results.length > 1 && (
          <ol>
            {results.map((result, index) => (
              <li key={index}>{result.name}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
