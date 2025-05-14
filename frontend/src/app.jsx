// --- Imports ---

// Functions
import { useState } from 'preact/hooks'
import { Router } from 'preact-router';

// Pages
import HomePage from './pages/home';
import ModsPage from './pages/mods';
import ModpacksPage from './pages/modpacks';
import AboutPage from './pages/about';
import SettingsPage from './pages/settings';
import ModPage from './pages/mod_page'
import ModCreationPage from './pages/mod_creation'

// Components
import NavBar from './components/NavBar/navbar'
import Button from './components/Buttons/button'

// Styles
import './styles/app.css'

// Images
import logo from './assets/logo.png'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar></NavBar>

      <Router>
        <HomePage path="/" />
        <ModsPage path="/mods" />
        <ModpacksPage path="/modpacks" />
        <AboutPage path="/about" />
        <SettingsPage path="/settings" />

        <ModPage path="/mods/:name"></ModPage>
        <ModCreationPage path="/create/mod" ></ModCreationPage>
      </Router>


      {/* Here for nothing */}
      {/* <Button onClick={() => setCount((count) => count + 1)} style={{position: 'absolute', bottom: '10px'}}>
        Autodesctruction in {count}
      </Button> */}

    </>
  )
}
