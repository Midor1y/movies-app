import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetails from "./components/MovieDetails";
import FavoritesPage from "./pages/FavoritesPage";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            Movies App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/favorites">
            Избранные
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:imdbID" element={<MovieDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
