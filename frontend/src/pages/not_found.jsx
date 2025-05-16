// Functions
import { h } from 'preact';

// Images
import logo from '../assets/logo.png'

// Styles
import '../styles/home.css'

// Components
import Button from '../components/Buttons/button';


function NotFoundPage() {

  return (
    <>
        <a href='/' target="_blank">
              <img src={logo} class="logo img" alt="WF" />
              <p class="logo text"> radio </p>
        </a>
        <div class='bigTitle'>404</div>
        <div class='subtitle'>Page not found</div>
        <div class='background'></div>
        <div class='halo'></div>
    </>
  );
}

export default NotFoundPage;