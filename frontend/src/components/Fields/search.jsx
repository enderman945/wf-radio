import { h } from 'preact';
import { useState } from 'preact/hooks';
import { searchMods } from '../services/api'; // Your API fetching function
import styles from './SearchBar.module.css'; // Optional: CSS Modules

function SearchBar({ onResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      onResults([]); // Clear results if search term is empty
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchItems(searchTerm);
      onResults(results); // Pass the fetched results to the parent component
    } catch (err) {
      setError('Failed to fetch search results.');
      onResults([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}

export default SearchBar;