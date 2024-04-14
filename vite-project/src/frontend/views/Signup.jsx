import { useState } from 'react'
import ImageCard from '../components/ImageCard'
import logo from '../../imgs/dans_logo.png'
import CryptoJS from 'crypto-js'

function Signup({navigator}) {

    const apiUrl = "http://127.0.0.1:8080/users/register"

    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [verifyPassword, setVerify] = useState("")
    const [role, setRole] = useState("")

    const goToLogin = () => {
        navigator("login")
    }

    const getPassword = (event) => {
        let password = event.target.value
            setPassword(password)
            console.log(password)       
    }

    const getName = (event) => {
        let name = event.target.value
            setName(name)
            console.log(name)       
    }

    const getVerify = (event) => {
        let verify = event.target.value
            setVerify(verify)
            console.log(verify)       
    }

    const getRole = (event) => {
        let role = event.target.value
            setRole(role)
            console.log(role)       
    }

    const signupButton = (event) => {
        async function apiSignup() {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: name,
                    password: CryptoJS.MD5(password),
                    rol: role
                })
            })

            if (!response.ok) {
                alert("Error registrando al usuario. Intente de nuevo.")
                return
            }

            const user = await response.json()

            setName("")
            setPassword("")
            setRole("")
            setVerify("")

            console.log("Éxito")

            navigator("login")
        }

        if (password === verifyPassword) {
            apiSignup()

        } else {
            alert("Las contraseñas no coinciden.")
        }

        
    } 
    

    const enterPress = (event) => {
        if (event.key === 'Enter') {
            signupButton();
        }
    }

    return (
        <div className='background' id='signupBack'>
            <ImageCard source={logo} alternative={"Logo del restaurante"}/>
            <h1>Registrarse</h1>
            <input type="text" placeholder='Nombre' value={name} onChange={getName} onKeyDown={enterPress}/>
            <input type="text" placeholder='Rol' value={role} onChange={getRole} onKeyDown={enterPress}/>
            <input type="password" placeholder='Contraseña' value={password} onChange={getPassword}onKeyDown={enterPress}/>
            <input type="password" placeholder='Verificar contraseña' value={verifyPassword} onChange={getVerify}onKeyDown={enterPress}/>
            <button onClick={signupButton}>Confirmar</button>
            <div className='forgetBack'>
                <button className='forgetButtons' onClick={goToLogin}>Iniciar sesión</button>
            </div>
        </div>
    )
}

export default Signup