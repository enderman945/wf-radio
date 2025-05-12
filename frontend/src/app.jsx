// --- Imports ---

// Functions
import { useState } from 'preact/hooks'

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
      <div>
        <a href="https://wf.oblic-parallels.fr" target="_blank">
          <img src={logo} class="logo img" alt="WF" />
          <a class="logo text"> radio </a>
        </a>
      </div>

      <Button onClick={() => setCount((count) => count + 1)} style={{position: 'absolute', bottom: '10px'}}>
        Autodesctruction in {count}
      </Button>

      <NavBar></NavBar>
    </>
  )
}
