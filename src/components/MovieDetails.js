import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import movieStore from "../stores/MovieStore";
import favoritesStore from "../stores/FavoritesStore";
import {
  Typography,
  Box,
  CircularProgress,
  Card,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";

const MovieDetails = observer(() => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [showFullPlot, setShowFullPlot] = useState(false);

  useEffect(() => {
    movieStore.fetchMovieDetails(imdbID);
  }, [imdbID]);

  const movie = movieStore.currentMovie;

  if (movieStore.loading) return <CircularProgress />;
  if (!movie) return <Typography>Фильм не найден.</Typography>;

  const isFavorite = favoritesStore.isFavorite(imdbID);

  const togglePlot = () => setShowFullPlot((prev) => !prev);

  const plot = movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "Описание недоступно.";

  return (
    <Box p={4}>
      <Button variant="contained" onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        Назад
      </Button>
      <Grid container spacing={4}>
        {/* Левый блок: постер */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
              alt={movie.Title}
              style={{ objectFit: "cover" }}
            />
          </Card>
        </Grid>

        {/* Правый блок: информация */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom>
            {movie.Title}
          </Typography>
          <Typography variant="body1">
            <strong>Год выпуска:</strong> {movie.Year}
          </Typography>
          <Typography variant="body1">
            <strong>Рейтинг:</strong> {movie.Rated}
          </Typography>
          <Typography variant="body1">
            <strong>Дата выхода:</strong> {movie.Released}
          </Typography>
          <Typography variant="body1">
            <strong>Длительность:</strong> {movie.Runtime}
          </Typography>
          <Typography variant="body1">
            <strong>Жанр:</strong> {movie.Genre}
          </Typography>
          <Typography variant="body1">
            <strong>Режиссер:</strong> {movie.Director}
          </Typography>
          <Typography variant="body1">
            <strong>Сценаристы:</strong> {movie.Writer}
          </Typography>
          <Typography variant="body1">
            <strong>Актеры:</strong> {movie.Actors}
          </Typography>
          <Typography variant="body1">
            <strong>Награды:</strong> {movie.Awards}
          </Typography>
          <Typography variant="body1">
            <strong>Страна:</strong> {movie.Country}
          </Typography>
          <Typography variant="body1">
            <strong>Описание:</strong>{" "}
            {showFullPlot ? plot : `${plot.substring(0, 150)}... `}
            {plot.length > 150 && (
              <Button
                variant="text"
                color="primary"
                onClick={togglePlot}
                style={{ textTransform: "none", fontWeight: "bold" }}
              >
                {showFullPlot ? "Свернуть" : "Читать далее"}
              </Button>
            )}
          </Typography>
          <iframe
            width="100%"
            height="400"
            src={movieStore.trailerUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
            style={{ marginTop: "20px" }}
          />
          <Button
            variant="contained"
            color={isFavorite ? "secondary" : "primary"}
            onClick={() => {
              isFavorite
                ? favoritesStore.removeFavorite(imdbID)
                : favoritesStore.addFavorite(movie);
            }}
            style={{ marginTop: "20px" }}
          >
            {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
});

export default MovieDetails;
