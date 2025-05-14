// Functions
import { h } from 'preact';

// Images
import logo from '../assets/logo.png'
import dl_icon from '../assets/download.svg'

// Styles
import '../styles/home.css'

// Components
import Button from '../components/Buttons/button';


function AboutPage() {

  return (
    <>
        <a href='https://radio.oblic-parallels.fr' target="_blank">
              <img src={logo} class="logo img" alt="WF" />
              <a class="logo text"> radio </a>
        </a>
        <div class='title'>About us</div>
        <div class='background'></div>
        <div class='halo'></div>
        <div class='mainText'>
            WF radio is a platform for all your personnal mods and modpacks. 
            The difference with already existing big platforms is that radio is self-hosted and open-source.
            It's meant for your personnal works that you don't want to publish on the said platforms, but feel free to use it the way you want.
            Don't hesitate to learn more about the project with the link below (not here yet).
        </div>
    </>
  );
}

export default AboutPage;