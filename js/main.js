import { loadMovie , getFavorites , saveFavorites } from "./store.js";
import { renderMovies } from "./render.js";
import { modal } from "./modale.js";
async function init() {
    const movies= await loadMovie();
    let favorites = getFavorites();
    renderMovies(movies, favorites)
    modal(movies)
    const moviesContainer = document.getElementById("movies-container")
    const favContainer = document.getElementById("fav-container")
    const favoriteCount = document.getElementById("favorite-count")
    const favMoviesCount = document.getElementById("fav-movies-count")
    const favSeriesCount = document.getElementById("fav-series-count")

    function renderFavorites(favorites) {
        const favoriteMovies = movies.filter(movie =>
            favorites.includes(movie.id)
        );

        favoriteCount.textContent = `${favoriteMovies.length} TITRES`;

        favMoviesCount.textContent = favoriteMovies.filter(
            movie => movie.type === "movie"
        ).length;

        favSeriesCount.textContent = favoriteMovies.filter(
            movie => movie.type === "series"
        ).length;
    }

    moviesContainer.addEventListener("click" , (e) => {
        const button = e.target.closest("[data-favorite]");

        if (!button) return;
        e.stopPropagation()
        const movieId = button.dataset.favorite;

        if(favorites.includes(movieId)) {
            favorites = favorites.filter(id => id !== movieId);
        }
        else {
            favorites.push(movieId);
        }
        saveFavorites(favorites);

        button.textContent = favorites.includes(movieId) ? "♥" : "♡" ;
        button.classList.toggle("text-red-500", favorites.includes(movieId));
    })
}
init();