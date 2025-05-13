// Functions
import { h } from 'preact';

// Images
import logo from '../assets/logo.png'

// Styles
import '../styles/home.css'

// Components
import Button from '../components/Buttons/button';


function HomePage() {

  return (
    <>
        <a href="https://wf.oblic-parallels.fr" target="_blank">
            <img src={logo} class="logo img" alt="WF" />
            <a class="logo text"> radio </a>
        </a>
        <div class='title'>An open place for mods</div>
        <Button className='start-button'>Get started !</Button>
        <div class='background'></div>
        <div class='halo'></div>
    </>
  );
}

export default HomePage;