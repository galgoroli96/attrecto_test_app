import logo from "./assets/logo.png";
import "./App.scss";
import { useFilter } from "./context/FilterContext";
import FilterInput from "./components/FilterInput";

function App() {
  const { filter } = useFilter();

  const handleSearch = () => {
    // getFilteredMovies();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // getFilteredMovies();
    }
  };

  return (
    <div className="app">
      <header className="appHeader">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <FilterInput handleSearch={handleSearch} handleKeyDown={handleKeyDown} />
      <section className="moviesSection">{/* moviesList */}</section>
    </div>
  );
}

export default App;
