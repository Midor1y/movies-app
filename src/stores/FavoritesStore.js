import { makeAutoObservable } from "mobx";

class FavoritesStore {
  favorites = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFavorite(movie) {
    if (!this.favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      this.favorites.push(movie);
    }
  }

  removeFavorite(imdbID) {
    this.favorites = this.favorites.filter((movie) => movie.imdbID !== imdbID);
  }

  isFavorite(imdbID) {
    return this.favorites.some((movie) => movie.imdbID === imdbID);
  }
}

const favoritesStore = new FavoritesStore();
export default favoritesStore;
