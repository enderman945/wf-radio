// Preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks'; // If you need state for settings
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

// Styles
import styles from '../styles/settings.module.css'

// Images
import Logo from '../assets/logo.png'


function SettingsPage() {

    const [theme, setTheme] = useState('dark');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [user, setUser] = useState(null)


    useEffect( () => {
            const token = Cookies.get('authToken');
            if (token) {
                setUser(token);
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

    const logout = () => {
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
                <a href='/settings'>
                    <p className={styles.tab}>Global</p>
                </a>
                {user ? (
                    <>
                        <a href='/notfound'>
                            <p className={styles.tab}>User</p>
                        </a>
                        <a onClick={() => {logout()}}>
                            <p className={`${styles.tab} ${styles.logout}`}>Logout</p>
                        </a>
                    </>
                ) : 
                ''
                }
                
            </div>
            <div className='container'>
                <div>
                    <label htmlFor="theme">Theme:</label>
                    <select id="theme" value={theme} onChange={handleThemeChange}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div>
                    <label>
                    Enable Notifications:
                    <input
                        type="checkbox"
                        checked={notificationsEnabled}
                        onChange={handleNotificationsChange}
                    />
                    </label>
                </div>
            </div> 
        </>
    );
}

export default SettingsPage;