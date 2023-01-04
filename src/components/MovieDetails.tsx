import { useEffect, useState } from "react";
import MovieService from "../MovieService";
import IMDbLink from "../partials/IMDbLink";
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
};

function MovieDetails({ movieId }: DetailProps) {
  const [details, setDetails] = useState<MovieDetail>(detailsInitialState);

  useEffect(() => {
    MovieService.getMovieDetails(movieId).then((resp) => setDetails(resp));
  }, [movieId]);

  function mapCountry(countryList: ProdCountries[]) {
    return countryList[0]?.name || "";
  }

  return (
    <article className="movieDetails">
      {details && (
        <>
          <img
            className="moviePoster"
            src={MovieService.getImgPath(details.poster_path || "")}
            alt="moviePoster"
          />
          <figcaption className="movieData">
            <h1>{details.title}</h1>
            <div className="releaseAndImdbContainer">
              <IMDbLink imdbId={details.imdb_id} />
              <p>Released: {details.release_date}</p>
            </div>
            <p>{details.overview}</p>
            <p>Country: {mapCountry(details.production_countries)}</p>
            <ul className="genreList">
              {details.genres.map((genre: Genre) => (
                <li>{genre.name}</li>
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
