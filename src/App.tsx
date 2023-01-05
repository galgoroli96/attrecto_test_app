import logo from "./assets/logo.png";
import { useFilter } from "./context/FilterContext";
import FilterInput from "./components/FilterInput";
import { useEffect, useRef, useState } from "react";
import MovieService from "./MovieService";
import { Movies } from "./types";
import { MoviesList } from "./components/MoviesList";
import Loader from "./partials/Loader";

const moviesInitialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

function App() {
  const { filter } = useFilter();
  const lock = useRef(false);
  const [loading, setLoading] = useState(true);
  const [moviesList, setMoviesList] = useState<Movies>(moviesInitialState);

  useEffect(() => {
    if (!lock.current) {
      MovieService.getGenreList().then((resp) => {
        sessionStorage.setItem("genres", JSON.stringify(resp.data.genres));
        lock.current = false;
      });
    }
    if (filter.length >= 3) {
      setLoading(true);
      const delayDebounceFn = setTimeout(() => {
        getFilteredMovies(1);
      }, 800);

      return () => clearTimeout(delayDebounceFn);
    } else if (filter === "") {
      setLoading(false);
      setMoviesList(moviesInitialState);
    }
    // eslint-disable-next-line
  }, [filter]);

  const getFilteredMovies = (page: number) => {
    MovieService.getFilteredMovies(filter, page)
      .then((resp) => setMoviesList(resp.data))
      .then(() => setLoading(false));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setLoading(true);
      getFilteredMovies(1);
    }
  };

  const handlePaginationChange = (page: number) => {
    getFilteredMovies(page);
  };

  return (
    <div className="app">
      <header className="appHeader">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <FilterInput handleKeyDown={handleKeyDown} />
      <>
        {loading ? (
          <Loader />
        ) : (
          <MoviesList
            {...moviesList}
            handlePaginationChange={handlePaginationChange}
          />
        )}
      </>
    </div>
  );
}

export default App;
