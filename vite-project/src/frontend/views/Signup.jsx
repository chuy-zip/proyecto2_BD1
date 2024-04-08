import { useState } from 'react'
import ImageCard from '../components/ImageCard'
import logo from '../../imgs/dans_logo.png'

function Signup({setScreen}) {
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [verifyPassword, setVerify] = useState("")
    const [role, setRole] = useState("")

    const goToLogin = () => {
        setScreen("login")
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

    const loginButton = (event) => {
        if (email != "" && password != "" && role != "" && verifyPassword === password && verifyPassword != "") {
            console.log("Éxito")
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
        <div className='background' id='signupBack'>
            <ImageCard source={logo} alternative={"Logo del restaurante"}/>
            <h1>Registrarse</h1>
            <input type="text" placeholder='Nombre' value={name} onChange={getName} onKeyDown={enterPress}/>
            <input type="text" placeholder='Rol' value={role} onChange={getRole} onKeyDown={enterPress}/>
            <input type="password" placeholder='Contraseña' value={password} onChange={getPassword}onKeyDown={enterPress}/>
            <input type="password" placeholder='Verificar contraseña' value={verifyPassword} onChange={getVerify}onKeyDown={enterPress}/>
            <button onClick={loginButton}>Confirmar</button>
            <div className='forgetBack'>
                <button className='forgetButtons' onClick={goToLogin}>Iniciar sesión</button>
            </div>
        </div>
    )
}

export default Signup