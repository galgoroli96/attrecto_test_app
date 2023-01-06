import axios from "axios";
import { MovieDetail } from "./types";

const API_KEY = "1c5abaaeaa13c66b570ad3042a0d51f4";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";

function getImgPath(poster_path: string) {
  return poster_path ? `${IMG_PATH}/${poster_path}` : "./assets/no_image.svg";
}
function getImdbLink(imdbId?: string) {
  return imdbId ? `https://www.imdb.com/title/${imdbId}/` : "";
}

function getGenreList() {
  return axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY },
  });
}

function getFilteredMovies(query: string, page: number) {
  return axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, include_adult: false, query, page },
  });
}

function getMovieDetails(movieId?: number) {
  return axios
    .get<MovieDetail>(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: API_KEY },
    })
    .then((resp) => resp.data);
}

const MovieService = {
  getImgPath,
  getImdbLink,
  getGenreList,
  getFilteredMovies,
  getMovieDetails,
};

export default MovieService;
