import { useState } from 'react'
import ImageCard from '../components/ImageCard'
import logo from '../../imgs/dans_logo.png'

function Login({navigator}) {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const goToSignup = () => {
        navigator("signup")
    }

    const getName = (event) => {
        let email = event.target.value
            setName(email)
            console.log(email)
    }

    const getPassword = (event) => {
        let password = event.target.value
            setPassword(password)
            console.log(password)       
    }

    const loginButton = (event) => {
        if (name != "" && password != "") {
            console.log("Éxito")
            navigator("dashboard")
            return
        
        } else {
            console.log("F")
        }
    }

    const enterPress = (event) => {
        if (event.key === 'Enter') {
            loginButton();
        }
    }

    return (
        <div className='background'>
            <ImageCard source={logo} alternative={"Logo del restaurante"}/>
            <h1>Iniciar Sesión</h1>
            <input type="text" placeholder='Nombre' value={name} onChange={getName} onKeyDown={enterPress}/>
            <input type="password" placeholder='Contraseña' value={password} onChange={getPassword}onKeyDown={enterPress}/>
            <button onClick={loginButton}>Confirmar</button>
            <div className='forgetBack'>
                <button className='forgetButtons' onClick={goToSignup}>Registrarse</button>
                <button className='forgetButtons'>¿Olvidaste tu contraseña?</button>
            </div>
        </div>
    )
}

export default Login