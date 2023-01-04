import { useFilter } from "../context/FilterContext";
import "../styles/filter.scss";
import { FilterInputProps } from "../types";

const FilterInput = ({ handleKeyDown }: FilterInputProps) => {
  const { filter, updateFilter } = useFilter();

  return (
    <section className="filterSection">
      <h1>Search:</h1>
      <input
        type="search"
        value={filter}
        onChange={(event) => updateFilter(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
      />
    </section>
  );
};

export default FilterInput;
