import moment from "moment";
import { MovieElement } from "../types";
import MovieService from "../MovieService";
import "../styles/movies.scss";

function MovieCard(props: MovieElement) {
  const { id, title, release_date, poster_path } = props;
  const releaseDate = release_date ? moment(release_date).format("YYYY") : "-";

  return (
    <figure className="movieCard" key={id}>
      <img
        className="moviePoster"
        src={MovieService.getImgPath(poster_path)}
        alt={title}
      />
      <figcaption className="movieTitle">
        {title} ({releaseDate})
      </figcaption>
    </figure>
  );
}

export default MovieCard;
