const API_URL = "https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json"

export async function loadMovie(){
    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error ("There is a problem while fetching data !!")
        }
        const movies = await response.json()
        return movies;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}
 export function saveFavorites(favorites) {
    localStorage.setItem("favorites" , JSON.stringify(favorites));
 }