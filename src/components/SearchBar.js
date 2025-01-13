import React, { useState } from "react";
import movieStore from "../stores/MovieStore";
import { TextField } from "@mui/material";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value.length > 2) {
      movieStore.searchMovies(value);
    }
  };

  return (
    <TextField
      fullWidth
      label="Введите название фильма"
      variant="outlined"
      value={query}
      onChange={handleSearch}
      style={{ marginBottom: "20px" }}
    />
  );
};

export default SearchBar;
