import axios from "axios";

const API_KEY = "1c5abaaeaa13c66b570ad3042a0d51f4";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";

function getImgPath(poster_path: string) {
  return poster_path ? `${IMG_PATH}/${poster_path}` : "/no_image.svg";
}

function getGenreList(query: string, page: number) {
  return axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY, query, page },
  });
}

function getFilteredMovies(query: string, page: number) {
  return axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query, page },
  });
}

function getMovieDetails(movieId: number, query: string, page: number) {
  return axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY, query, page },
  });
}

const MovieService = {
  getImgPath,
  getGenreList,
  getFilteredMovies,
  getMovieDetails,
};

export default MovieService;
