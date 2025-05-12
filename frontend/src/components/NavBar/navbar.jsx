import { h } from 'preact' // Necessary ?
import styles from './navbar.module.css'

function NavBar({ children, className, ...rest}) {

    return (
        <div
            className={styles.navbar}
            {...rest} // Allow passing other props like 'disabled', 'type', etc.
            >
                {children}
        </div>
    )
}

export default NavBar;