import { makeAutoObservable } from "mobx";
import axios from "axios";

class MovieStore {
  movies = [];
  currentMovie = null;
  query = "";
  trailerUrl = "";
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async searchMovies(query) {
    this.query = query;
    this.loading = true;
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=7e59b8de&s=${query}`
      );
      this.movies = response.data.Search || [];
    } catch (error) {
      console.error("Ошибка при поиске фильмов:", error);
    } finally {
      this.loading = false;
    }
  }

  async fetchMovieDetails(imdbID) {
    this.loading = true;
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=7e59b8de&i=${imdbID}`
      );
      this.currentMovie = response.data;
      // После получения деталей фильма ищем трейлер
      await this.fetchTrailer(response.data.Title);
    } catch (error) {
      console.error("Ошибка при загрузке деталей фильма:", error);
    } finally {
      this.loading = false;
    }
  }

  async fetchTrailer(movieTitle) {
    try {
      const apiKey = "AIzaSyAj_Jh0-OebRp2DC73QwvvBgG8GbOz-kAM"; // Вставьте ваш YouTube API ключ
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          movieTitle + " trailer"
        )}&key=${apiKey}&maxResults=1&type=video`
      );
      if (response.data.items.length > 0) {
        this.trailerUrl = `https://www.youtube.com/embed/${response.data.items[0].id.videoId}`;
      } else {
        this.trailerUrl = ""; // Если трейлер не найден
      }
    } catch (error) {
      console.error("Ошибка при поиске трейлера:", error);
      this.trailerUrl = "";
    }
  }
}

const movieStore = new MovieStore();
export default movieStore;
