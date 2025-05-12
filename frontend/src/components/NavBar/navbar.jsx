import { h } from 'preact' // Necessary ?
import styles from './navbar.module.css'

function NavBar({ children, className, ...rest}) {

    return (
        <nav
            className={styles.navbar}
            {...rest} // Allow passing other props like 'disabled', 'type', etc.
            >
                {children}
            <a href='index'> Home </a>
            <a href='settings'> Mods </a>
            <a href='settings'> Modpacks </a>
        </nav>
    )
}

export default NavBar;