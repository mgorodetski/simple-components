const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b06dcf0ee8fd65164ea5be48c3b68101&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=b06dcf0ee8fd65164ea5be48c3b68101&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

//Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);

    console.log(data);
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <div class="movie">
            <img src="${IMG_PATH + poster_path}" alt="${title} poster">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColorByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        </div>
        `
        main.appendChild(movieEl);
    })
}

function getColorByRate(votes) {
    if (votes <= 5) {
        return 'red';
    } else if (votes <= 7) {
        return 'orange';
    } else {
        return 'green';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
})