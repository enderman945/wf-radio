// Preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// Functions
import { listMods } from '../services/mods';

// Components
import FiltersPanel from '../components/Filters/panel'

// Images
import logo from '../assets/logo.png'

// Styles
import GridCard from '../components/Cards/grid';
import RowCard from '../components/Cards/row';


function ModsPage() {

    // UseState
    const [mods, setMods] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // UseEffect
    useEffect(() => {
        async function loadItems() {
            setLoading(true);
            setError(false);
            try {
                const fetched_mods = await listMods();
                setMods(fetched_mods);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadItems();
    }, []); // <-- Tells useEffect to run once after render

    // Base page
    const base_page = (
        <>
            <a href="/" target="_blank">
                <img src={logo} class="logo img" alt="WF" />
                <p class="logo text"> mods </p>
            </a>
            <FiltersPanel></FiltersPanel>
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
                return <RowCard key={mod.name} item={mod}/>
            })}
        </div>
      </>
  );
}

export default ModsPage;