// Preact
import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';

// Images
import SearchIcon from '../../assets/search.svg'

// Styles
import styles from './search.module.css'; // Optional: CSS Modules


function SearchBar({ onSearch, timeout }) {

    const [search_input, setSearchInput] = useState('');
    const timeout_id = useRef(null);
    timeout = timeout | 0;

    const handleInputChange = (event) => {

        const new_search_input = event.target.value;
        setSearchInput(new_search_input);

        if (timeout_id.current) {
            clearTimeout(timeout_id.current);
        }

        timeout_id.current = setTimeout(() => {
            onSearch(new_search_input);
        }, timeout);
    };

    useEffect(() => {
        return () => {
            if (timeout_id.current) {
                clearTimeout(timeout_id.current);
            }
        };
    }, []);

    return (
        <div className={styles.searchBarContainer}>
        <img src={SearchIcon} className={styles.searchIcon}></img>
            <input
                type="text"
                placeholder="Search"
                value={search_input}
                onInput={handleInputChange}
                className={styles.searchBarInput}
            />
        </div>
    );
}

export default SearchBar;