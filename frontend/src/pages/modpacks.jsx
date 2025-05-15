// Functions
import { h } from 'preact';

// Images
import logo from '../assets/logo.png'
import dl_icon from '../assets/download.svg'

// Styles
import '../styles/home.css'

// Components
import Button from '../components/Buttons/button';


function ModpacksPage() {

  return (
    <>
        <a href='https://radio.oblic-parallels.fr' target="_blank">
              <img src={logo} class="logoSmall img" alt="WF" />
              <p class="logoSmall text"> modpacks </p>
        </a>
        <div class='title'>Coming soon™</div>
        <div class='background'></div>
        <div class='halo'></div>
    </>
  );
}

export default ModpacksPage;