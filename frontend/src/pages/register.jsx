// Preact
import { h } from 'preact';
import { useState } from 'preact/hooks';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'

// Images
import Logo from '../assets/logo.png'
import Account from '../assets/account.svg'

// Styles
import styles from '../styles/login.module.css'

// Components
import Button from '../components/Buttons/button';
import InputField from '../components/Fields/input_field';

// Functions
import { register } from '../services/users';


function RegisterPage() {

    // useState
    const [username, setUsername] = useState('');
    const [display_name, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState(null); // To track success/error
    const [fieldErrors, setFieldErrors] = useState({
        username: null,
        display_name: null,
        email: null,
        password: null
    });

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        // Reset error
        setFieldErrors(prevErrors => ({ ...prevErrors, username: null }));
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        // Reset error
        setFieldErrors(prevErrors => ({ ...prevErrors, password: null }));
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        // Reset error
        setFieldErrors(prevErrors => ({ ...prevErrors, email: null }));
    };

    const handleDisplayNameChange = (event) => {
        setDisplayName(event.target.value);
        // Reset error
        setFieldErrors(prevErrors => ({ ...prevErrors, display_name: null }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFieldErrors({ username: null, password: null, email: null, display_name: null});

        setRegisterStatus('registering');

        try {
            const response = await register({username: username, 
                                             display_name: display_name,
                                             email: email,
                                             password: password});

            console.debug('Registered successfully:', response);
            setRegisterStatus('success');

            window.location.replace("/login");
            //TODO success screen

            } catch (error) {

            console.error('Register failed:', error);
            setRegisterStatus('error');

            //TODO handle different codes differently
            setFieldErrors({
                username: ' ',
                email: ' ',
                display_name: ' ',
                password: 'Error'
                });
            }
        finally {
            setRegisterStatus(null);
        }
    };

  return (
    <>
        <a href='/'>
              <img src={Logo} class="logo img" alt="WF" />
              <p class="logo text"> radio </p>
        </a>
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <img src={Account} className={styles.loginImage} style={'cursor: pointer'}></img>
                {/* <input type="file" id="profile_picture" style="display: none;"></input> */}

                <div className={styles.fieldsContainer}>
                    {/* username */}
                    <InputField
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                        error={fieldErrors.username}
                        placeholder="username"
                        required
                        >
                        </InputField>
                    
                    {/* display_name */}
                    <InputField
                        id="display_name"
                        name="display_name"
                        value={display_name}
                        onChange={handleDisplayNameChange}
                        error={fieldErrors.display_name}
                        placeholder="display_name"
                        required
                        >
                        </InputField>
                    
                    {/* email */}
                    <InputField
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        error={fieldErrors.email}
                        placeholder="email"
                        required
                        >
                        </InputField>

                    {/* password */}
                    <InputField
                        id="password"
                        name="password"
                        value={password}
                        type="password"
                        onChange={handlePasswordChange}
                        error={fieldErrors.password}
                        placeholder="password"
                        required
                        >
                    </InputField>
                </div>
                <div className={styles.buttonsContainer}>
                    <Button 
                        className={styles.loginButton}
                        type='submit'
                        disabled={registerStatus === 'registering'}
                        >
                            {registerStatus === 'registering' ? 'Registering' : registerStatus === 'success' ? 'Success' : 'Register'}
                    </Button>
                </div>
            </form>
        </div>

    </>
  );
}

export default RegisterPage;