import React from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Найдите свой любимый фильм
      </Typography>
      <SearchBar />
      <MovieList />
    </Box>
  );
};

export default HomePage;
