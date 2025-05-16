// Functions
import { h } from 'preact';

// Images
import logo from '../assets/logo.png'
import dl_icon from '../assets/download.svg'

// Styles
import '../styles/home.css'

// Components
import Button from '../components/Buttons/button';


function HomePage() {

  return (
    <>
        <a href='/' target="_blank">
              <img src={logo} class="logo img" alt="WF" />
              <p class="logo text"> radio </p>
        </a>
        <div class='title'>An open place for mods</div>
        <Button className='start-button' href='/mods'>Start exploring</Button>
        <div class='background'></div>
        <div class='halo'></div>
    </>
  );
}

export default HomePage;