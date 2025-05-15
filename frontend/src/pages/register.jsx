// Functions
import { h } from 'preact';

// Images
import logo from '../assets/logo.png'

// Styles
import styles from '../styles/login.module.css'

// Components
import Button from '../components/Buttons/button';
import InputField from '../components/Fields/input_field';


function RegisterPage() {

    const username_input= "";
    const display_name_input= "";
    const email_input= "";
    const password_input= "";

  return (
    <>
        <a href='https://radio.oblic-parallels.fr' target="_blank">
              <img src={logo} class="logo img" alt="WF" />
              <a class="logo text"> radio </a>
        </a>
        <div className={styles.container}>
            <img src={logo} className={styles.loginImage}></img>
            <form>
                <div className={styles.fieldsContainer}>
                    {/* username */}
                    <InputField
                        id="username"
                        name="username"
                        value={username_input}
                        // onChange={handleNameChange}
                        // error={nameError}
                        placeholder="username"
                        required
                        >
                        </InputField>

                    {/* display_name */}
                    <InputField
                        id="display_name"
                        name="display_name"
                        value={display_name_input}
                        // onChange={handleNameChange}
                        // error={nameError}
                        placeholder="display_name"
                        required
                        >
                        </InputField>

                    {/* email */}
                    <InputField
                        id="email"
                        name="email"
                        value={email_input}
                        // onChange={handleNameChange}
                        // error={nameError}
                        placeholder="email"
                        required
                        >
                        </InputField>

                    {/* password */}
                    <InputField
                        id="password"
                        name="password"
                        value={password_input}
                        type="password"
                        // onChange={handleNameChange}
                        // error={nameError}
                        placeholder="password"
                        required
                        >
                    </InputField>
                </div>
                <div className={styles.buttonsContainer}>
                    <Button className={styles.loginButton}>
                        Register
                    </Button>
                </div>
            </form>
        </div>

    </>
  );
}

export default RegisterPage;