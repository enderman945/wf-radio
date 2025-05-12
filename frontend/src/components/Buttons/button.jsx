import styles from './button.module.css'

function Button({ children, onClick, className, variant = 'primary', ...rest}) {
    // Construct dynamic class names using CSS Modules
    const buttonClasses = `${styles.button} ${styles[variant] || ''} ${className || ''}`

    return (
        <button
            className={buttonClasses}
            onClick= {onClick}
            {...rest} // Allow passing other props like 'disabled', 'type', etc.
            >
                {children}
        </button>
    )
}

export default Button;