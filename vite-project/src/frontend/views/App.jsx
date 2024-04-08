import { useState } from 'react'
import '../styles/App.css'
import Router from '../routes/Router'
import Login from './Login'
import Signup from './Signup'

function App() {
  const [screen, setScreen] = useState("login")

  return (
    <>
      {screen === 'login' && <Login setScreen={setScreen} />}
      {screen === 'signup' && <Signup setScreen={setScreen} />}
    </>
  )
}

export default App
