// Preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// Functions
import { listMods } from '../services/mods';

// Components
import FiltersPanel from '../components/Filters/panel'
import SearchBar from '../components/Fields/search';

// Assets
import '../styles/filters_bar.css'

// Images
import logo from '../assets/logo.png'

// Components
import GridCard from '../components/Cards/grid';
import RowCard from '../components/Cards/row';
import Checkbox from '../components/Buttons/checkbox';


function ModsPage() {

    // List mods
    const [mods, setMods] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // Filters
    const [search_input, setSearchInput] = useState('');
    const [selected_categories, setSelectedCategories] = useState([]);

    const handleSearch = (new_search_input) => {
        setSearchInput(new_search_input);
    };


    async function loadItems() {
    
        setLoading(true);
        setError(false);
        
        try {
            const filters = {
                search: search_input,
            };
            console.debug("Searching", search_input);
            const fetched_mods = await listMods(filters);
            setMods(fetched_mods);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    // useEffect
    useEffect(() => {
        loadItems();
    }, [search_input]);


    // Base page
    const base_page = (
        <>
            <a href="/" target="_blank">
                <img src={logo} class="logo img" alt="WF" />
                <p class="logo text"> mods </p>
            </a>
            <FiltersPanel>                    
                <SearchBar onSearch={handleSearch} />
                <div class='filterTitle'>
                    Platform
                </div>
                <div class='filterOptions'>
                <Checkbox 
                    id='client'
                    label='Client'
                    />
                                    <Checkbox 
                    id='server'
                    label='Server'
                    />
                    </div>
            </FiltersPanel>
        </>
    );

    if (loading) {
        // TODO replace by loading screen
        return (
            <>
                {base_page}
                <div class='content-container'>
                    <div class='loadingContent'>
                        Loading mods
                    </div>
                </div>
                
            </>
            );
    }
    if (error) {
        // TODO replace by popup
            return (
            <>
                {base_page}
                <div class='content-container'>
                    <div class='loadingContent'>
                        Couldn't load mods: {error}
                    </div>
                </div>
                
            </>
            );
    }

    return (
      <>
        {base_page}
        <div class='content-container'>
            {/* <GridCard>Test card</GridCard> */}
            {/* <GridCard/> */}

            {mods.map((mod) => {
                console.debug(mod.name);
                // return <div key={mod.name}>Test</div>
                return <RowCard key={mod.name} item={mod} />
            })}
        </div>
      </>
  );
}

export default ModsPage;