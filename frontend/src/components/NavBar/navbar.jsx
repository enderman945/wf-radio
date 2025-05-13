// Functions
import { h } from 'preact'
import { Link } from 'preact-router/match';

// Styles
import styles from './navbar.module.css'

// Images
import userImg from '../../assets/settings.svg'


function NavBar({ children, className, ...rest}) {

    return (
        <nav
            className={styles.navbar}
            {...rest} // Allow passing other props like 'disabled', 'type', etc.
            >
            <a className={styles.leftItem} href='/home'> Home </a>
            <a className={styles.leftItem} href='/mods'> Mods </a>
            <a className={styles.leftItem} href='/modpacks'> Modpacks </a>
            <a className={styles.leftItem} href='/about'> About </a>
            <a className={styles.rightItem} href='/settings'> 
                <img src={userImg} width={'170%'}></img>
            </a>
                {children}
        </nav>
    )
}

export default NavBar;