import React from "react";
import { MovieElement, Movies } from "../types";
import MovieCard from "./MovieCard";
import "../styles/movies.scss";
import { useFilter } from "../context/FilterContext";

export const MoviesList = (props: Movies) => {
  const { page, results, total_results } = props;
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

  return (
    <section className="moviesSection">
      <h2>{total_results} search result(s)</h2>
      <div className="moviesContainer">
        {results.map((val: MovieElement) => (
          <MovieCard key={val.id} {...val} />
        ))}
      </div>
    </section>
  );
};
