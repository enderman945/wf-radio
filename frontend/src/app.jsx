// --- Imports ---

// Functions
import { useState } from 'preact/hooks'
import { Router } from 'preact-router';

// Pages
import HomePage from './pages/home';
import AboutPage from './pages/about';
import NotFoundPage from './pages/not_found';
import ComingSoonPage from './pages/coming_soon';

import ModsPage from './pages/mods';
import ModPage from './pages/mod_page'
import ModVersionsPage from './pages/mod_versions'
import ModCreationPage from './pages/mod_creation'
import ModVersionCreationPage from './pages/create_mod_version'

import ModpacksPage from './pages/modpacks';

import DashboardPage from './pages/dashboard';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
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
      <NavBar></NavBar>

      <Router>
        <HomePage path="/" />
        <ModsPage path="/mods" />
        <ModpacksPage path="/modpacks" />
        <AboutPage path="/about" />
        <SettingsPage path="/settings" />

        <DashboardPage path="/dashboard"/>

        <ModPage path="/mods/:name"></ModPage>
        <ModCreationPage path="/create/mod" ></ModCreationPage>
        <ModVersionsPage path="/mods/:name/versions"></ModVersionsPage>
        <ModVersionCreationPage path="/mods/:name/versions/create"></ModVersionCreationPage>

        <LoginPage path='/login'></LoginPage>
        <RegisterPage path='/register'></RegisterPage>

        <ComingSoonPage path='/soon'></ComingSoonPage>
        <NotFoundPage path='/notfound' default ></NotFoundPage>
      </Router>


      {/* Here for nothing */}
      {/* <Button onClick={() => setCount((count) => count + 1)} style={{position: 'absolute', bottom: '10px'}}>
        Autodesctruction in {count}
      </Button> */}

    </>
  )
}
