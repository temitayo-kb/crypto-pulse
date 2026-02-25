import "./Search.css";
import { SearchRounded } from "@mui/icons-material";

function Search({ search, onSearchChange }) {
  return (
    <div className="search-flex">
      <SearchRounded />
      <input
        placeholder="Search"
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e)}
      />
    </div>
  );
}

export default Search;
