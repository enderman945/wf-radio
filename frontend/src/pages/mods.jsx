// Functions
import { h } from 'preact';

// Components
import FiltersPanel from '../components/Filters/panel'

// Images
import logo from '../assets/logo.png'

// Styles
import '../styles/mods.css'


function ModsPage() {

  return (
    <>
        <a href="https://wf.oblic-parallels.fr" target="_blank">
            <img src={logo} class="logo img" alt="WF" />
            <a class="logo text"> radio </a>
        </a>
        <FiltersPanel></FiltersPanel>
        <div class='content-container'></div>
    </>
  );
}

export default ModsPage;