import moment from "moment";
import MovieService from "../MovieService";
import "../styles/movies.scss";

interface MovieElementProps {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
  onClick: (movieId: number) => void;
}

function MovieCard({
  id,
  title,
  release_date,
  poster_path,
  onClick,
}: MovieElementProps) {
  const releaseDate = release_date ? moment(release_date).format("YYYY") : "-";

  function handleCardClick() {
    onClick(id);
  }

  return (
    <figure className="movieCard" key={id} onClick={() => handleCardClick()}>
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
