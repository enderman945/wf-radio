// Functions
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

// Styles
import styles from './navbar.module.css'

// Images
import Settings from '../../assets/settings.svg'
import Login from '../../assets/login.svg'
import Dashboard from '../../assets/dashboard.svg'

function NavBar({ children, className, ...rest}) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            const decoded_token = jwtDecode(token);
            if (decoded_token) {
                setUser({ username: decoded_token.username});
            }
            else {
                console.warn('Cannot decode authToken');
            }
        }
    }, []);


    return (
        <nav
            className={styles.navbar}
            {...rest} // Allow passing other props like 'disabled', 'type', etc.
            >
            <a className={styles.leftItem} href='/'> Home </a>
            <a className={styles.leftItem} href='/mods'> Mods </a>
            <a className={styles.leftItem} href='/modpacks'> Modpacks </a>
            <a className={styles.leftItem} href='/about'> About </a>
            
            <div className={styles.rightItems}>
            
            {/* Display login button, or dashboard if connected */}
            {user ? (
                <a className={styles.rightItem} href={'/dashboard'}>
                    <img src={Dashboard} className={styles.dashboard}></img>
                </a>
            ) : (
                <a className={styles.rightItem} href='/login'>
                    <img src={Login} className={styles.login}></img>
                </a>
            )
            }
            <a className={styles.rightItem} href='/settings'> 
                    <img src={Settings} className={styles.settings}></img>
                </a>
            </div>

                {children}
        </nav>
    )
}

export default NavBar;