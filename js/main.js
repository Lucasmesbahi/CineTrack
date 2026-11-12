import { loadMovie } from "./store.js";
import { renderMovies } from "./render.js";
import { modal } from "./modale.js";
async function init() {
    const movies= await loadMovie();

    renderMovies(movies)
    modal(movies)
}
init();