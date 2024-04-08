import ImageCard from '../components/ImageCard'
import logo from '../../imgs/dans_logo.png'

function Login() {
    return (
        <div className='background'>
            <ImageCard source={logo} alternative={"Logo del restaurante"}/>
            <h1>Iniciar Sesión</h1>
            <input type="text" placeholder='Correo electrónico'/>
            <input type="password" placeholder='Contraseña'/>
            <button>Confirmar</button>
        </div>
    )
}

export default Login