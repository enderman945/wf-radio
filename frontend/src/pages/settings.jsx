// Preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks'; // If you need state for settings
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

// Functions
import { deleteUser } from '../services/users';

// Components
import Button from '../components/Buttons/button';
import Checkbox from '../components/Buttons/checkbox';

// Styles
import styles from '../styles/settings.module.css'

// Images
import Logo from '../assets/logo.png'


function SettingsPage() {

    const [theme, setTheme] = useState('dark');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [user, setUser] = useState(null)
    const [tab, setTab] = useState('global');


    useEffect( () => {
            const token = Cookies.get('authToken');
            if (token) {
                const decoded_token = jwtDecode(token);
                if (decoded_token && decoded_token.username) {
                    setUser(decoded_token.username);
                }
                
            }
        },
    [])

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
        // Save theme preference (e.g., to local storage)
    };

    const handleNotificationsChange = (event) => {
            setNotificationsEnabled(event.target.checked);
        // Save notification preference
    };

    const handleUserDeletion = async () => {
        try {
            await deleteUser(user);
            handleLogout();
        } catch (error) {
            console.error("Couldn't delete account: ", error);
        }


    }

    const handleLogout = () => {
        Cookies.remove('authToken');
        location.replace('/');
    }

    return (
        <>
            <a href='/'>
                    <img src={Logo} className={styles.logo} alt="WF" />
                    <p className={styles.logoTitle}> settings </p>
            </a>
            <div className={styles.tabsContainer}>
                <a onClick={() => {setTab('global')}}>
                    <p className={styles.tab}>Global</p>
                </a>
                {user ? (
                    <>
                        <a onClick={() => {setTab('user')}}>
                            <p className={styles.tab}>User</p>
                        </a>
                        <a onClick={() => {handleLogout()}}>
                            <p className={`${styles.tab} ${styles.logout}`}>Logout</p>
                        </a>
                    </>
                ) : 
                ''
                }
                
            </div>
            <div className='container'>
                { tab === 'global' ? (
                        <>
                            <p>
                                <label htmlFor="theme">Theme:</label>
                                <select id="theme" value={theme} onChange={handleThemeChange}>
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </p>
                                <Checkbox
                                    id='notifications'
                                    label='Enable Notifications'
                                    checked={notificationsEnabled}
                                    onChange={handleNotificationsChange}
                                />
                        </>
                    ) :
                    tab === 'user' ? (
                        <>
                            <div className={styles.category}>
                                <p className={styles.title}>Danger zone</p>
                                <Button 
                                    variant='delete'
                                    style='font-size: 1.2rem'
                                    onClick={handleUserDeletion}
                                    > 
                                        Delete account
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                        </>
                    )
                }

            </div> 
        </>
    );
}

export default SettingsPage;