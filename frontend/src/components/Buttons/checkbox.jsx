//TODO made by AI
import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './checkbox.module.css';

function Checkbox({ id, name, value, checked: initialChecked, onChange, label }) {
  const [isChecked, setIsChecked] = useState(initialChecked || false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event); // Propagate the change event
    }
  };

  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        className={styles.nativeCheckbox} // Hide this element
      />
      <label htmlFor={id} className={styles.checkbox}>
        {/* This div will be our custom visual checkbox */}
        <div className={styles.checkmark}>
          {isChecked && <span>&#10003;</span>} {/* Checkmark icon */}
        </div>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    </div>
  );
}

export default Checkbox;