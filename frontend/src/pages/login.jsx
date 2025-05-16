// Preact
import { h } from 'preact';
import { useState } from 'preact/hooks';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'

// Images
import logo from '../assets/logo.png'

// Styles
import styles from '../styles/login.module.css'

// Components
import Button from '../components/Buttons/button';
import InputField from '../components/Fields/input_field';

// Functions
import { login } from '../services/users';


function LoginPage() {

    // useState
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null); // To track success/error
    const [fieldErrors, setFieldErrors] = useState({
        username: null,
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFieldErrors({ username: null, password: null});

        setLoginStatus('logging in');

        try {
            const response = await login(username, password);

            console.debug('Logged in successfully:', response);
            setLoginStatus('success');

            if (response && response.token) {
                const decoded_token = jwtDecode(response.token);
                if (!decoded_token) {
                    throw new Error("Couldn't decode token");
                }
                Cookies.set('authToken', response.token, {
                    expires: decoded_token.exp, //TODO not sure if it's the right value
                    path: '/',
                    secure: true, // only send over https
                    sameSite: 'strict'
                })

            window.location.replace("/mods");

            } else {
                console.warn("Couldn't retrieve token from api response");
            }


            } catch (error) {

            console.error('Login failed:', error);
            setLoginStatus('error');

            //TODO handle different codes differently
            setFieldErrors({
                username: ' ',
                password: 'Wrong username or password.',
                });
            }
        finally {
            setLoginStatus(null);
        }
    };

  return (
    <>
        <a href='/'>
              <img src={logo} class="logo img" alt="WF" />
              <p class="logo text"> radio </p>
        </a>
        <div className={styles.container}>
            <img src={logo} className={styles.loginImage}></img>
            <form onSubmit={handleSubmit}>
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
                        disabled={loginStatus === 'logging in'}
                        >
                            {loginStatus === 'logging in' ? 'Logging in' : 
                            loginStatus === 'success' ? 'Success' : 'Login'}
                    </Button>
                    <Button 
                        className={styles.loginButton}
                        variant={'secondary'}
                        href='/register'
                        >
                            Create an account
                    </Button>
                </div>
            </form>
        </div>

    </>
  );
}

export default LoginPage;