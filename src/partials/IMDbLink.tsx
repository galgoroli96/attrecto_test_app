import MovieService from "../MovieService";
import imdb_logo from "../assets/imdb_logo.svg";

interface IMDbProps {
  imdbId: string;
}

function IMDbLink({ imdbId }: IMDbProps) {
  if (!imdbId) {
    return <></>;
  }

  return (
    <a
      href={MovieService.getImdbLink(imdbId)}
      target="_blank"
      rel="noopener noreferrer"
      className="imdbLink"
    >
      <img src={imdb_logo} alt="imdb" />
    </a>
  );
}

export default IMDbLink;
