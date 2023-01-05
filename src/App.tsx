import logo from "./assets/logo.png";
import "./App.scss";
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
  const isLoading = useRef(false);
  const [moviesList, setMoviesList] = useState<Movies>(moviesInitialState);

  useEffect(() => {
    if (filter.length >= 3) {
      isLoading.current = true;
      const delayDebounceFn = setTimeout(() => {
        getFilteredMovies(1);
      }, 800);

      return () => clearTimeout(delayDebounceFn);
    } else if (filter === "") {
      isLoading.current = false;
      setMoviesList(moviesInitialState);
    }
    // eslint-disable-next-line
  }, [filter]);

  const getFilteredMovies = (page: number) => {
    MovieService.getFilteredMovies(filter, page)
      .then((resp) => {
        setMoviesList(resp.data);
      })
      .then(() => (isLoading.current = false));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
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
        {isLoading.current ? (
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
