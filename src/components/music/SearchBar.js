import './SearchBar.css';

const SearchBar = ({ value, onChange, className }) => {
  return (
    <div className={`search-bar ${className}`}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="What do you want to listen to?"
        value={value}
        onChange={onChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;