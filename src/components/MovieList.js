import React from "react";
import { observer } from "mobx-react-lite";
import movieStore from "../stores/MovieStore";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, CardMedia, Box } from "@mui/material";

const MovieList = observer(() => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      {movieStore.movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
          <Card
            onClick={() => navigate(`/movies/${movie.imdbID}`)}
            style={{
              cursor: "pointer",
              transition: "transform 0.2s",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                overflow: "hidden",
                height: 350,
              }}
            >
              <CardMedia
                component="img"
                image={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title}
                style={{
                  width: "auto",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <CardContent>
              <Typography variant="h6" noWrap title={movie.Title}>
                {movie.Title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {movie.Year}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export default MovieList;
