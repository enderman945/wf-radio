// Preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';

// Functions
import { listMods } from '../services/mods';

// Components
import Button from '../components/Buttons/button'

// Images
import Logo from '../assets/logo.png'
import Add from '../assets/add.svg'

// Styles
import styles from '../styles/dashboard.module.css'

function DashboardPage() {

    // useStates

    const [creations, setCreations] = useState([]);
    const [loading_creations, setLoadingCreations] = useState(true)
    const [creations_error, setCreationsError] = useState(null)


    // Functions

    let user;
    async function loadUserInformations() {
        //TODO use a service
        const token = Cookies.get('authToken');
        if (token) {
            const decoded_token = jwtDecode(token);
            if (decoded_token) {
                user = decoded_token.username
            }
        }

        if (!user) {
            console.error("Cannot retrieve user from token");
            location.replace('/login')
        }
    }

    async function loadCreations() {
    
        setLoadingCreations(true);
        setCreationsError(false);
        
        try {
            const fetched_items = await listMods({author: user});
            setCreations(fetched_items);
        } catch (err) {
            setCreationsError(err.message);
        } finally {
            setLoadingCreations(false);
        }
    }


    // useEffects
    useEffect(async ()=> {
        await loadUserInformations();
        await loadCreations();
    }, []);


    // Handles

    const handleCreate = () => {
        window.location.href('/create/mod');
    }


    // Page

    // Base page
    const base_page = (
        <a href='/' target="_blank">
                <img src={Logo} class="logoSmall img" alt="WF" />
                <p class="logoSmall text"> dashboard </p>
        </a>
    );

    if (loading_creations) {
        // TODO replace by icons
        return (
            <>
                {base_page}
                <div class='container'>
                    <p>Loading</p>
                </div>
            </>
            );
    }
    if (creations_error) {
        // TODO replace by popup
            return (
            <>
                {base_page}
                <div class='container'>
                    <p>Error: {creations_error}</p>   
                </div>
            </>
            );
    }

    return (
        <>
            {base_page}
            <div class='container'>
                <div className={styles.category}>
                    <p className={styles.title}>
                        Favorites
                    </p>
                    <div className={styles.tiles}>
                        <div className={styles.emptyTile}>
                            <p className={styles.emptyTileText}>
                                You have no favorites for the moment
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.category}>
                    <p className={styles.title}>
                        Your creations
                    </p>
                    <div className={styles.tiles}>
                        
                        {/* Temporary, missing card component */}
                        {creations.map( (item) => {
                            console.debug(item.name);
                            return (<div className={styles.emptyTile}>
                                <div className={styles.emptyTileText}>
                                    {item.display_name}
                                </div>
                            </div>);
                        })}

                        <a className={styles.emptyTile} href='/create/mod'>
                            <p className={styles.emptyTileText}>
                                <img src={Add} ></img>
                            </p>
                        </a>
                    </div>
                </div>
                <div className={styles.toolbar}>
                    <div className={styles.toolbarRightItems}>
                        <Button 
                            className={styles.createButton} 
                            href='/create/mod'
                            > 
                                Create 
                            </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;