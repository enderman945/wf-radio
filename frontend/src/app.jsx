// --- Imports ---

// Functions
import { useState } from 'preact/hooks'
import { Router } from 'preact-router';

// Pages
import HomePage from './pages/home';
import ModsPage from './pages/mods';
// import AboutPage from './pages/about';
import SettingsPage from './pages/settings';

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


      <Router>
        <HomePage path="/home" />
        <ModsPage path="/mods" />
        {/* <AboutPage path="/about" /> */}
        <SettingsPage path="/settings" />
      </Router>
      <NavBar></NavBar>

      {/* Here for nothing */}
      {/* <Button onClick={() => setCount((count) => count + 1)} style={{position: 'absolute', bottom: '10px'}}>
        Autodesctruction in {count}
      </Button> */}

    </>
  )
}
