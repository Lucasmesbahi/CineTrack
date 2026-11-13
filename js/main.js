import { loadMovie } from "./store.js";
import { renderMovies } from "./render.js";
import { modal } from "./modale.js";
import { getFavorites , saveFavorites } from "./store.js";
async function init() {
    const movies= await loadMovie();

    renderMovies(movies)
    modal(movies)
    const favorite = getFavorites();
    console.log(favorite);
}
init();