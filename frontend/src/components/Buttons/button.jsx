import { h } from 'preact' // Necessary ?
import styles from './button.module.css'

function Button({ children, onClick, href, className, variant = 'primary', ...rest}) {

    const buttonClasses = `${styles.button} ${styles[variant] || ''} ${className || ''}`

    return (
        <a href={href}>
            <button
                className={buttonClasses}
                onClick= {onClick}
                {...rest} // Allow passing other props like 'disabled', 'type', etc.
                >
                    {children}
            </button>
        </a>
    )
}

export default Button;