import { loadMovie , getFavorites , saveFavorites } from "./store.js";
import { renderMovies } from "./render.js";
import { modal } from "./modale.js";
async function init() {
    const movies= await loadMovie();
    let favorites = getFavorites();
    renderMovies(movies, favorites)
    modal(movies)

    const moviesContainer = document.getElementById("movies-container")

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