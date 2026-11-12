 export function renderMovies(movies) {
    const moviesContainer = document.getElementById("movies-container")
    const moviesHTML = movies.map((movie) =>{
        return `
                    <article class="bg-[#131317] rounded-xl  border border-[#24242B] hover:border-red-500 transition">
                <img 
                    src="${movie.image}" 
                    alt="${movie.title}"
                    class="w-full object-cover"
                >

                <div class="p-4">
                    <h3 class="text-white font-bold text-lg mb-2">
                        ${movie.title}
                    </h3>

                    <div class="flex justify-between items-center">
                        <span class="text-[#9496A1] text-sm">
                            ${movie.releaseYear}
                        </span>

                        <span class="bg-[#E80E1B] text-white text-xs px-3 py-1 rounded-full">
                            ${movie.type}
                        </span>
                    </div>
                </div>
            </article>
        `
    });

    moviesContainer.innerHTML = moviesHTML.join("")
}
