// OMDb API Key
const API_KEY = "f8b50a9d";

// Elements
const input = document.getElementById("movieInput");
const button = document.getElementById("searchBtn");
const container = document.getElementById("movieContainer");
const loader = document.getElementById("loader");

// Search Button
button.addEventListener("click", searchMovie);

// Enter Key Support
input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        searchMovie();

    }

});

// Search Function
async function searchMovie() {

    const movie = input.value.trim();

    if (!movie) {

        alert("Enter movie name");

        return;

    }

    loader.style.display = "block";

    container.innerHTML = "";

    try {

        const response = await fetch(

            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`

        );

        const data = await response.json();

        loader.style.display = "none";

        if (data.Response === "False") {

            container.innerHTML = "<h2>Movie not found</h2>";

            return;

        }

        container.innerHTML = `

        <div class="movie">

            <img src="${data.Poster}" alt="Poster">

            <h2>${data.Title}</h2>

            <p><b>Year:</b> ${data.Year}</p>

            <p><b>Genre:</b> ${data.Genre}</p>

            <p><b>Director:</b> ${data.Director}</p>

            <p><b>Actors:</b> ${data.Actors}</p>

            <p><b>IMDb:</b> ${data.imdbRating}</p>

            <p>${data.Plot}</p>

        </div>

        `;

    }

    catch (error) {

        loader.style.display = "none";

        container.innerHTML = "<h2>Something went wrong.</h2>";

        console.log(error);

    }

}