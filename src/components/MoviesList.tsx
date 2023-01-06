import React, { useCallback, useEffect, useState } from "react";
import { MovieElement } from "../types";
import MovieCard from "./MovieCard";
import "../styles/movies.scss";
import { useFilter } from "../context/FilterContext";
import CustomModal from "../partials/CustomModal";
import MovieDetails from "./MovieDetails";
import CustomPaginator from "../partials/CustomPaginator";

interface MoviesProps {
  page: number;
  results: MovieElement[];
  total_pages: number;
  total_results: number;
  handlePaginationChange: (page: number) => void;
}

export const MoviesList = ({
  page,
  results,
  total_pages,
  total_results,
  handlePaginationChange,
}: MoviesProps) => {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<number>(0);
  const [pageRange, setPageRange] = useState<number>(10);
  const { filter } = useFilter();

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    function handleResize() {
      const screen = window.innerWidth;
      if (screen >= 900) {
        setPageRange(10);
      } else if (541 < screen && screen <= 800) {
        setPageRange(5);
      } else if (screen < 540) {
        setPageRange(2);
      }
    }

    window.addEventListener("resize", handleResize);
  }, []);

  const paginationChange = useCallback(
    (page: number) => {
      handlePaginationChange(page);
      setCurrentPage(page);
    },
    // eslint-disable-next-line
    [currentPage]
  );

  if (total_results === 0) {
    return (
      <div className="noResults">
        {page === 1 ? (
          <p>
            Ooops! No results found for your search: <span>{filter}</span>.
            Please try to search again.
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
      <CustomPaginator
        currentPage={currentPage}
        total_pages={total_pages}
        pageRange={pageRange}
        onPaginationChange={paginationChange}
      />
      <CustomModal isOpen={open} onClose={() => setOpen(!open)}>
        {selectedMovie && <MovieDetails movieId={selectedMovie} />}
      </CustomModal>
    </section>
  );
};
