import { useState } from 'react'
import Dashboard from '../views/Dashboard'
import Report from '../views/Report'  
import Login from '../views/Login'
import Signup from '../views/Signup'

function Router(){
    const [page, setPage] = useState("login")

    const navegar = (enlace) => {
        setPage(enlace)
    }

    let contenido;
    switch (page) {
        case "dashboard":
            contenido = <Dashboard />
            break;
        
        case "reporte":
            contenido = <Report />
            break;

        case "login":
            contenido = <Login navigator={navegar}/>
            break;

        case "signup":
            contenido = <Signup navigator={navegar}/>
            break;
    
        default:
            break;
    }

    return(
        <>
            {page != "login" && page != "signup" && (
                <nav>
                <a href="javascript:void(0);" onClick={() => navegar("dashboard")}>Dashboard </a> |
                <a href="javascript:void(0);" onClick={() => navegar("reporte")}> Reporte </a> |
                <a href="javascript:void(0);" onClick={() => navegar("login")}> Cerrar sesión</a>
                </nav>)
            }
            
            {contenido}
        </>


    )
}

export default Router