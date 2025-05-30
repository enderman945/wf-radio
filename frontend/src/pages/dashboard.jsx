// Preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';

// Functions
import { listMods } from '../services/mods';

// Components
import Button from '../components/Buttons/button'
import SmallCard from '../components/Cards/small_card';

// Images
import Logo from '../assets/logo.png'
import Add from '../assets/add.svg'

// Styles
import styles from '../styles/dashboard.module.css'

function DashboardPage() {
    //TODO takes too long to load

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
                <div class={styles.container}>
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
                <div class={styles.container}>
                    <p>Error: {creations_error}</p>   
                </div>
            </>
            );
    }

    return (
        <>
            {base_page}
            <div className={styles.container}>
                <div className={styles.category}>
                    <p className={styles.title}>
                        Favorites
                    </p>
                    <div className={styles.tiles}>
                        <SmallCard 
                            variant='empty'
                            item={"You have no favorites for the moment"}
                            />
                    </div>
                </div>
                <div className={styles.category}>
                    <p className={styles.title}>
                        Your creations
                    </p>
                    <div className={styles.tiles}>
                        
                        {/* Temporary, missing card component */}
                        {creations.map( (item) => {
                            return (
                            <SmallCard 
                                variant='mod'
                                href={'/mods/'+item.name}
                                item={item}
                                />
                            );
                        })}

                        <SmallCard 
                            variant='empty'
                            item={<img src={Add} ></img>}
                            href='/create/mod'
                        />
                    </div>
                </div>
                <div style="height: 2rem"/>
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
        </>
    );
}

export default DashboardPage;