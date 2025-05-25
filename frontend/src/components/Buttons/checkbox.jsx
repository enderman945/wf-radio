import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './checkbox.module.css';

// Assets
import Checkmark from '../../assets/checkmark.svg'

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
      <label htmlFor={id} className={styles.customCheckbox}>
          {isChecked && <img src={Checkmark} className={styles.checkmark} ></img>}
        {label && <span className={styles.label}>{label}</span>}
      </label>
    </div>
  );
}

export default Checkbox;