import React, { useState } from "react";
import { MovieElement } from "../types";
import MovieCard from "./MovieCard";
import "../styles/movies.scss";
import { useFilter } from "../context/FilterContext";
import CustomModal from "../partials/CustomModal";
import MovieDetails from "./MovieDetails";

interface MoviesProps {
  page: number;
  results: MovieElement[];
  total_pages: number;
  total_results: number;
}

export const MoviesList = ({ page, results, total_results }: MoviesProps) => {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<number>(0);
  const { filter } = useFilter();

  if (total_results === 0) {
    return (
      <div className="noResults">
        {page === 1 ? (
          <p>
            Ooops! No results found for your search: {filter}. Please try to
            search again.
          </p>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    );
  }

  function handleCardClick(movieId: number) {
    if (movieId) {
      setOpen(true);
      setSelectedMovie(movieId);
    }
  }

  return (
    <section className="moviesSection">
      <h2>{total_results} search result(s)</h2>
      <div className="moviesContainer">
        {results.map((val: MovieElement) => (
          <MovieCard
            key={val.id}
            {...val}
            onClick={() => handleCardClick(val.id)}
          />
        ))}
      </div>
      <CustomModal isOpen={open} onClose={() => setOpen(!open)}>
        {selectedMovie && <MovieDetails movieId={selectedMovie} />}
      </CustomModal>
    </section>
  );
};
