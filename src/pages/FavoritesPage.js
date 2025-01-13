import React from "react";
import { observer } from "mobx-react-lite";
import favoritesStore from "../stores/FavoritesStore";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, CardMedia, Button, Box } from "@mui/material";

const FavoritesPage = observer(() => {
  const navigate = useNavigate();

  if (favoritesStore.favorites.length === 0) {
    return (
      <Typography variant="h5" align="center" style={{ marginTop: "20px" }}>
        Избранных фильмов пока нет.
      </Typography>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Избранные фильмы
      </Typography>
      <Grid container spacing={3}>
        {favoritesStore.favorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
            <Card>
              <CardMedia
                component="img"
                image={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title}
                style={{
                  height: "450px", // Фиксированная высота для всех постеров
                  objectFit: "cover", // Пропорциональное масштабирование
                }}
              />
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {movie.Year}
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/movies/${movie.imdbID}`)}
                  >
                    Подробнее
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => favoritesStore.removeFavorite(movie.imdbID)}
                  >
                    Удалить
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default FavoritesPage;
