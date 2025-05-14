// TODO made by AI

import { h } from 'preact';
import styles from './input_field.module.css'; // Optional: CSS Modules

function InputField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  required,
  className,
  ...rest // To accept other standard input props
}) {
  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <input
        type="text" // Or any other input type
        id={id}
        name={name}
        className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
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
export default InputField