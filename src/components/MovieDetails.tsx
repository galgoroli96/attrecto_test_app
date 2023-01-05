import { useEffect, useState } from "react";
import MovieService from "../MovieService";
import IMDbLink from "../partials/IMDbLink";
import Loader from "../partials/Loader";
import "../styles/movies.scss";
import { Genre, MovieDetail, ProdCountries } from "../types";

interface DetailProps {
  movieId: number;
}

const detailsInitialState = {
  poster_path: "",
  title: "",
  overview: "",
  genres: [],
  release_date: "",
  imdb_id: "",
  runtime: 0,
  production_countries: [],
  original_language: "",
  tagline: "",
  spoken_languages: [],
};

function MovieDetails({ movieId }: DetailProps) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<MovieDetail>(detailsInitialState);

  useEffect(() => {
    MovieService.getMovieDetails(movieId)
      .then((resp) => setDetails(resp))
      .then(() => setLoading(false));
  }, [movieId]);

  function mapCountry(countryList: ProdCountries[]) {
    return countryList[0]?.name || "";
  }

  function findLanguage(languageCode: string) {
    if (languageCode && details.spoken_languages) {
      return details.spoken_languages.find(
        (lang) => lang.iso_639_1 === languageCode
      )?.english_name;
    }
    return "";
  }

  return (
    <article className="movieDetails">
      {loading ? (
        <Loader />
      ) : (
        <>
          <img
            className="moviePoster"
            src={MovieService.getImgPath(details.poster_path || "")}
            alt="moviePoster"
          />
          <figcaption className="movieData">
            <h1>{details.title}</h1>
            <h4>{details.tagline}</h4>
            <div className="releaseAndImdbContainer">
              <IMDbLink imdbId={details.imdb_id} />
              <p>Released: {details.release_date}</p>
            </div>
            <p className="overview">{details.overview}</p>
            <p>Country: {mapCountry(details.production_countries)}</p>
            <p>Language: {findLanguage(details.original_language)}</p>
            <ul className="genreList">
              {details.genres.map((genre: Genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <p>Length: {details.runtime} mins</p>
          </figcaption>
        </>
      )}
    </article>
  );
}

export default MovieDetails;
