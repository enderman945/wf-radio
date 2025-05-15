// Preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// Functions
import { fetchMod } from '../services/api';

// Components

// Images
import logo from '../assets/logo.png'
import profile from '../assets/profile.svg'
import download_icon from '../assets/download_alt.svg'
import favorite_icon from '../assets/favorite.svg'

// Styles
import styles from '../styles/content_page.module.css'

function ModPage({name}) { 

    // UseState
    const [mod, setMod] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // UseEffect
        useEffect(() => {
            async function loadItems() {
                setLoading(true);
                setError(false);
                try {
                    const fetched_mod = await fetchMod(name);
                    setMod(fetched_mod);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
    
            loadItems();
        }, []); // <-- Tells useEffect to run once after render
    
        if (loading) {
            // TODO replace by loading screen
            return <div>Loading mod</div>
        }
        if (error) {
            // TODO replace by popup
            return <div>Couldn't load mod: {error}</div>
        }

    return (
        <>
            <a href="/">
                <img src={logo} class="logo img" alt="WF" />
                <p class="logo text"> mods </p>
            </a>

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.backgroundImage}></div>
                    <p className={styles.title}>{mod.display_name || mod.name }</p>
                    <p className={styles.fullDescription}>{mod.mod_infos.full_description || "No description"}</p>
                </div>
                

                <div className={styles.infosPanel}>

                    <a href={"/users/" + mod.author}>
                        <img src={profile} className={styles.profilePicture}></img>
                        <p className={styles.author}>{mod.author}</p>
                    </a>

                    <div className={styles.countsContainer}>
                        <div className={styles.count}>
                            <img src={download_icon} className={styles.countIcon}></img>
                            {mod.mod_infos.downloads_count || 0}
                        </div>
                        <div className={styles.count}>
                            <img src={favorite_icon} className={styles.countIcon}></img>
                            {mod.mod_infos.favorites_count || 0}
                        </div>
                    </div>

                    <p className={styles.panelTitle}>Versions</p>
                    <div className={styles.timeline}>
                        <a href={"/notfound"}>
                            <svg className={styles.versionDot}>
                                <circle cx="11" cy="11" r="10" stroke="#3a3a3a" stroke-width="1" fill="#1a1a1a" />
                            </svg>
                            <div className={styles.version}>
                                v3.0 (latest)
                            </div> 
                        </a>
                        <a href={"/notfound"}>
                            <svg className={styles.versionDot}>
                                <circle cx="11" cy="11" r="10" stroke="#3a3a3a" stroke-width="1" fill="#1a1a1a" />
                            </svg>
                            <div className={styles.version}>
                                v2.0
                            </div>
                        </a>

                        <a href={"/notfound"}>
                            <svg className={styles.versionDot}>
                                <circle cx="11" cy="11" r="10" stroke="#3a3a3a" stroke-width="1" fill="#1a1a1a" />
                            </svg>
                            <div className={styles.version}>
                                v1.0
                            </div>
                        </a>
                    </div>

                </div>
            </div>

        </>)
}

export default ModPage