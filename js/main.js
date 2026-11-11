import { loadMovie } from "./store.js";
import { renderMovies } from "./render.js";
async function init() {
    const movies= await loadMovie();

    renderMovies(movies)
}
init();