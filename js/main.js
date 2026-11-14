
import { loadMovie, getFavorites, saveFavorites } from "./store.js";
import { renderMovies } from "./render.js";
import { modal } from "./modale.js";

async function init() {
    const movies = await loadMovie();
    let favorites = getFavorites();

    const moviesContainer = document.getElementById("movies-container");
    const favContainer = document.getElementById("fav-container");
    const favoriteCount = document.getElementById("favorite-count");
    const favMoviesCount = document.getElementById("fav-movies-count");
    const favSeriesCount = document.getElementById("fav-series-count");
    const searchInput = document.getElementById("search");
    const typeFilter = document.getElementById("type-filter");
    const pagination = document.getElementById("pagination");

    let currentPage = 1;
    const moviesPerPage = 8;
    let filteredMovies = movies;

    modal(movies);

    function displayMovies() {
        const start = (currentPage - 1) * moviesPerPage;
        const end = start + moviesPerPage;

        const moviesToDisplay = filteredMovies.slice(start, end);

        renderMovies(moviesToDisplay, favorites);
        renderPagination();
    }

    function renderPagination() {
        const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

        if (totalPages <= 1) {
            pagination.innerHTML = "";
            return;
        }

        let buttons = `
            <button data-page="${currentPage - 1}"
                ${currentPage === 1 ? "disabled" : ""}
                class="px-3 py-2 rounded-lg bg-[#24242B] text-white disabled:opacity-30">
                Previous
            </button>
        `;

        for (let i = 1; i <= totalPages; i++) {
            buttons += `
                <button data-page="${i}"
                    class="px-3 py-2 rounded-lg ${currentPage === i ? "bg-red-600 text-white" : "bg-[#24242B] text-white"}">
                    ${i}
                </button>
            `;
        }

        buttons += `
            <button data-page="${currentPage + 1}"
                ${currentPage === totalPages ? "disabled" : ""}
                class="px-3 py-2 rounded-lg bg-[#24242B] text-white disabled:opacity-30">
                Next
            </button>
        `;

        pagination.innerHTML = buttons;
    }

    pagination.addEventListener("click", (e) => {
        const button = e.target.closest("[data-page]");

        if (!button || button.disabled) return;

        currentPage = Number(button.dataset.page);

        displayMovies();
    });

    function filterMovies() {
        const searchValue = searchInput.value.toLowerCase().trim();
        const typeValue = typeFilter.value;

        filteredMovies = movies.filter(movie => {
            const matchTitle = movie.title.toLowerCase().includes(searchValue);
            const matchType = typeValue === "all" || movie.type === typeValue;

            return matchTitle && matchType;
        });

        currentPage = 1;
        displayMovies();
    }

    function renderFavorites() {
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

        if (favoriteMovies.length === 0) {
            favContainer.innerHTML = `
                <p class="text-[#9496A1] text-sm text-center">
                    Aucun favori pour le moment.
                </p>
            `;
            return;
        }

        const favoritesHTML = favoriteMovies.map(movie => {
            return `
                <div class="flex items-center gap-3 bg-[#202027] rounded-lg p-2">
                    <img src="${movie.image}" alt="${movie.title}"
                        class="w-12 h-16 object-cover">

                    <div class="flex-1 min-w-0">
                        <p class="text-white text-sm font-semibold truncate">
                            ${movie.title}
                        </p>
                        <p class="text-[#9496A1] text-xs">
                            ${movie.releaseYear} · ${movie.type}
                        </p>
                    </div>

                    <button data-remove-favorite="${movie.id}"
                        class="text-red-500 text-xl">
                        ×
                    </button>
                </div>
            `;
        });

        favContainer.innerHTML = favoritesHTML.join("");
    }

    moviesContainer.addEventListener("click", (e) => {
        const button = e.target.closest("[data-favorite]");

        if (!button) return;

        e.stopPropagation();

        const movieId = button.dataset.favorite;

        if (favorites.includes(movieId)) {
            favorites = favorites.filter(id => id !== movieId);
        } else {
            favorites.push(movieId);
        }

        saveFavorites(favorites);

        button.textContent = favorites.includes(movieId) ? "♥" : "♡";
        button.classList.toggle("text-red-500", favorites.includes(movieId));

        renderFavorites();
    });

    favContainer.addEventListener("click", (e) => {
        const button = e.target.closest("[data-remove-favorite]");

        if (!button) return;

        const movieId = button.dataset.removeFavorite;

        favorites = favorites.filter(id => id !== movieId);

        saveFavorites(favorites);

        const movieButton = moviesContainer.querySelector(
            `[data-favorite="${movieId}"]`
        );

        if (movieButton) {
            movieButton.textContent = "♡";
            movieButton.classList.remove("text-red-500");
        }

        renderFavorites();
    });

    searchInput.addEventListener("input", filterMovies);
    typeFilter.addEventListener("change", filterMovies);

    displayMovies();
    renderFavorites();
}

init();
