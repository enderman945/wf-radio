import { h } from 'preact' // Necessary ?
import styles from './panel.module.css'

function FiltersPanel({ children, className, ...rest}) {

    return (
        <div
            className={styles.navbar}
            {...rest} // Allow passing other props like 'disabled', 'type', etc.
            >
                {children}
        </div>
    )
}

export default FiltersPanel;