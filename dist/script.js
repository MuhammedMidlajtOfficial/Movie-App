"use strict";
const API_KEY = 'api_key=fe2819c53695fc9e7cb8e269b402e5b9';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(API_URL);
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        showMovies(data.results);
    });
}
function showMovies(data) {
    main.innerHTML = '';
    data.forEach((movie) => {
        const { title, poster_path, overview, vote_average } = movie;
        const movieEl = document.createElement('div');
        movieEl.className = 'movie';
        movieEl.innerHTML = `
                <img src="${IMG_URL + poster_path} "http://via.placeholder.com/1080x1580" }" alt="${title}">

                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getColor(vote_average)}">${vote_average.toFixed(1)}</span>
                </div>

                <div class="overview">

                    <h3>Overview</h3>
                    ${overview}
                    <br/> 
                </div>
            `;
        main === null || main === void 0 ? void 0 : main.appendChild(movieEl);
    });
}
function getColor(vote) {
    if (vote >= 7) {
        return 'green';
    }
    else if (vote >= 5) {
        return 'orange';
    }
    else {
        return 'red';
    }
}
form.addEventListener('submit', event => {
    event.preventDefault();
    let searchTerm = search.value;
    if (searchTerm.trim()) {
        getMovies(SEARCH_URL + '&query=' + searchTerm);
    }
    else {
        getMovies(API_URL);
    }
});
