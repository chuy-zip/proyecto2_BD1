import { useState } from 'react'
import ImageCard from '../components/ImageCard'
import logo from '../../imgs/dans_logo.png'
import CryptoJS from 'crypto-js'

function Login({ navigator }) {

    const apiUrl = "http://127.0.0.1:8080/users/login"

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const goToSignup = () => {
        navigator("signup")
    }

    const handleNameChange = (event) => {
        let email = event.target.value
        setName(email)
        console.log(email)
    }

    const handlePasswordChange = (event) => {
        let password = event.target.value
        setPassword(password)
        console.log(password)       
    }

    const loginButton = (event) => {
        async function apiLogin() {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: name,
                    password: CryptoJS.MD5(password)
                })
            })

            if (!response.ok) {
                alert("Usuario inválido, inténtalo nuevamente.")
                return
            }

            const user = await response.json()

            setName("")
            setPassword("")

            localStorage.setItem("userData", JSON.stringify(user))
            
            localStorage.setItem("sessionState", "true")

            console.log("Éxito")

            navigator("dashboard")
        }

        apiLogin()  
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
            <input type="text" placeholder='Nombre' value={name} onChange={handleNameChange} onKeyDown={enterPress}/>
            <input type="password" placeholder='Contraseña' value={password} onChange={handlePasswordChange} onKeyDown={enterPress}/>
            <button onClick={loginButton}>Confirmar</button>
            <div className='forgetBack'>
                <button className='forgetButtons' onClick={goToSignup}>Registrarse</button>
                <button className='forgetButtons'>¿Olvidaste tu contraseña?</button>
            </div>
        </div>
    )
}

export function logOut(navigator) {
    localStorage.removeItem("userData")
    localStorage.setItem("sessionState", "false")
    navigator("login")
}

export function getUserData() {
    const userObject = JSON.parse(localStorage.getItem("userData"))
    return userObject
}

export default Login