import Pagination from "react-pagination-main";
import "../styles/pagination.scss";

interface PaginationProps {
  currentPage: number;
  total_pages: number;
  pageRange: number;
  onPaginationChange: (page: number) => void;
}

const CustomPaginator = ({
  currentPage,
  total_pages,
  pageRange,
  onPaginationChange,
}: PaginationProps) => {
  if (total_pages === 1) {
    return <></>;
  }
  return (
    <Pagination
      activePage={currentPage}
      totalPageRange={total_pages}
      pageRangeDisplayed={pageRange}
      onChange={onPaginationChange}
    >
      {(result: any) => (
        <ul className="pagination">
          {result.renderArrowsLeft(
            ({ isLastArrow, isAvailable, handleChange }: any) => (
              <li
                key={`arrows_left_${isLastArrow}`}
                className={` ${isAvailable ? "pageItem" : "pageItemDisabled"}`}
                onClick={handleChange}
              >
                <span>{isLastArrow ? "<<" : "Prev"}</span>
              </li>
            )
          )}
          {result.numbers.map(({ isActive, number, handleChange }: any) => (
            <li
              key={number}
              className={`pageItem ${isActive ? "activePage" : ""}`}
              onClick={handleChange}
            >
              {number}
            </li>
          ))}
          {result.renderArrowsRight(
            ({ isLastArrow, isAvailable, handleChange }: any) => (
              <li
                key={`arrows_right_${isLastArrow}`}
                className={` ${isAvailable ? "pageItem" : "pageItemDisabled"}`}
                onClick={handleChange}
              >
                <span>{isLastArrow ? ">>" : "Next"}</span>
              </li>
            )
          )}
        </ul>
      )}
    </Pagination>
  );
};

export default CustomPaginator;
