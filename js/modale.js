export function modal(movies){
    
    const modal = document.getElementById("modal")
    const modalBody = document.getElementById("modal-body")
    const moviesContainer = document.getElementById("movies-container")
    const closeBtn = document.querySelector("#close-btn")

    moviesContainer.addEventListener("click" , (e) =>{
        const card = e.target.closest("[data-id]")
        if (!card) return;
        const movie = movies.find((item) => item.id === card.dataset.id );
        if (!movie) return;

        const duration = movie.type === "movie"
        ? `${movie.duration} min`
        : `${movie.seasons.length} seasons`
        modalBody.innerHTML = `
            <div class="flex flex-col md:flex-row gap-6">

                <img
                    src="${movie.image}"
                    alt="${movie.title}"
                    class="w-full md:w-64 h-80 object-cover rounded-lg"
                >

                <div class="flex-1 text-white">

                    <h2 class="text-3xl font-bold mb-3">
                        ${movie.title}
                    </h2>

                    <div class="flex gap-3 items-center mb-4">
                        <span class="text-[#9496A1]">${movie.releaseYear}</span>
                        <span class="bg-[#E80E1B] px-3 py-1 rounded-full text-sm">
                            ${movie.type}
                        </span>
                    </div>

                    <p class="text-[#9496A1] mb-4">
                        ${movie.description}
                    </p>

                    <div class="mb-3">
                        <h3 class="font-bold mb-1">
                            ${movie.type === "movie" ? "Duration" : "Seasons"}
                        </h3>
                        <p class="text-[#9496A1]">${duration}</p>
                    </div>

                    <div class="mb-3">
                        <h3 class="font-bold mb-1">Genres</h3>
                        <p class="text-[#9496A1]">${movie.genres.join(", ")}</p>
                    </div>

                    <div class="mb-3">
                        <h3 class="font-bold mb-1">Directors</h3>
                        <p class="text-[#9496A1]">${movie.directors.join(", ")}</p>
                    </div>

                    <div>
                        <h3 class="font-bold mb-1">Production Countries</h3>
                        <p class="text-[#9496A1]">${movie.productionCountries.join(", ")}</p>
                    </div>

                </div>
            </div>
        `;   
        modal.classList.remove("hidden")
        modal.classList.add("flex");    
    })

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("flex");
        modal.classList.add("hidden");
    });

    window.addEventListener("click", e => {
        if (e.target === modal) {
            modal.classList.remove("flex");
            modal.classList.add("hidden");
        }
});
}