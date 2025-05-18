// Preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

// Functions
import { getModVersions, getMod } from '../services/mods';

// Components
import Button from '../components/Buttons/button';

// Images
import logo from '../assets/logo.png'
import download_icon from '../assets/download_alt.svg'
import GameIcon from '../assets/game.svg'
import LoaderIcon from '../assets/loader.svg'
import PlatformIcon from '../assets/hardware_platform.svg'

// Styles
import styles from '../styles/content_page.module.css'

function ModVersionsPage({name}) { 

    // UseState
    const [mod, setMod] = useState({})
    const [versions, setVersions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [owner, setOwner] = useState(false);
    const [currentVersion, setCurrentVersion] = useState(null);

    // UseEffect
    useEffect(() => {
        // Load mod informations
        async function loadItems() {
            setLoading(true);
            setError(false);
            try {
                const fetched_mod = await getMod(name);
                setMod(fetched_mod);
                const fetched_versions = await getModVersions(name, {});
                setVersions(fetched_versions);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadItems();

    }, []); // <-- Tells useEffect to run once after render

    // Handles
    const handleDeleteVersion = async () => {
        //TODO
        console.warn("Cannot delete version: Not implemented");
        // await deleteMod(mod.name);
        // location.replace('/dashboard');
    };

    const handleSelectVersion = (version) => {

        console.debug("Selected ", version);
        setCurrentVersion(version)
    }

    if (currentVersion == null) {
            //TODO make it work
            if (versions.length != 0) {
                setCurrentVersion(versions[0]);
                console.debug(currentVersion);
            }
    }

        // Load user informations
        //TODO use a service
        //? for some reason, doesn't work inside useEffect
        const token = Cookies.get('authToken');
        if (token) {
            const decoded_token = jwtDecode(token);
            if (decoded_token) {
                if (decoded_token.username === mod.author) {
                    setOwner(true);
                }
            }
        }

        const base_page = (
            <>
                <a href="/">
                    <img src={logo} class="logo img" alt="WF" />
                    <p class="logo text"> mods </p>
                </a>
            </>
        );
    
        if (loading) {
            // TODO replace by loading screen
            return (
                <>
                    {base_page}
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <p className={styles.title}>Loading...</p>
                        </div>
                        <div className={styles.infosPanel}> </div>
                    </div>
                </>
            );
        }
        if (error) {
            // TODO replace by popup
                return (
                <>
                    {base_page}
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <p className={styles.title}>Couldn't load mod versions</p>
                            <p className={styles.fullDescription}>{error}</p>
                        </div>
                        <div className={styles.infosPanel}> </div>
                    </div>
                </>
            );
        }

    return (
        <>
            {base_page}
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.backgroundImage}></div>
                    <p className={styles.title}>Versions</p>
                        <div className={styles.timeline}>

                            {versions.map( (version) => {
                                return (
                                <a href={versions.url}>
                                    <svg className={styles.versionDot}>
                                        <circle 
                                            cx="11"  cy="11" r="10" 
                                            stroke="#3a3a3a"  stroke-width="1" 
                                            fill="#1a1a1a" 
                                            onClick={() => {handleSelectVersion(version)}}/>
                                    </svg>
                                    <div className={styles.version} onClick={() => {handleSelectVersion(version)}}>
                                        {`${version.channel} ${version.version_number}`}
                                    </div> 
                                </a>)
                            })}

                        </div>
                </div>
                
                <div className={styles.infosPanel}>

                    {currentVersion ? (
                        <>
                        <div className={styles.bigPanelTitle}>
                            {`${currentVersion.version_number} ${currentVersion.channel}`}
                        </div>

                        <div className={styles.compatContainer}>
                            <div className={styles.count}>
                                <img src={GameIcon} className={styles.countIcon} alt='Game version'></img>
                                { currentVersion.game_version || '?'}
                            </div>
                            <div className={styles.count}>
                                <img src={LoaderIcon} className={styles.countIcon} alt='Mod loader'></img>
                                { currentVersion.platform || '?'}
                            </div>
                            <div className={styles.count}>
                                <img src={PlatformIcon} className={styles.countIcon} alt='Environment'></img>
                                { currentVersion.environment || '?'}
                            </div>

                        </div>

                        <div className={styles.countsContainer}>
                            <div className={styles.count}>
                                <img src={download_icon} className={styles.countIcon} alt='Downloads count'></img>
                                {mod.mod_infos.downloads_count || 0}
                            </div>
                            <Button className={styles.countButton} href={currentVersion.url} >Download</Button>
                        </div>

                        <div className={styles.fullChangelog}>
                            {currentVersion.changelog || "No changelog"}
                        </div>

                        { owner ? (
                            <div className={styles.panelActions}>
                                <Button
                                    variant='delete'
                                    className={styles.deleteButton}
                                    onClick={handleDeleteVersion}
                                    >
                                        Delete
                                </Button>
                            </div>
                            ) : (
                                <> </>
                            )
                        }
                        </>
                        ) : (
                        <>
                        
                        </>
                        )}                    
                </div>
            </div>

        </>)
}

export default ModVersionsPage