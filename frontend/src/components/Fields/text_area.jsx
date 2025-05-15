// TODO made by AI

import { h } from 'preact';
import styles from './input_field.module.css'; // Optional: CSS Modules

function TextArea({
  id,
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  required,
  className,
  containerClass,
  ...rest // To accept other standard input props
}) {
  return (
    <div className={`${styles.formGroup} ${containerClass}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <textarea
        type="text" // Or any other input type
        id={id}
        name={name}
        className={`${styles.input} ${styles.textArea} ${error ? styles.inputError : ''} ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...rest} // Pass down other props
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
export default TextArea