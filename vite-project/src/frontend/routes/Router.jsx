import { useState } from 'react'
import Dashboard from '../views/Dashboard'
import Report from '../views/Report'  
import Login from '../views/Login'
import Signup from '../views/Signup'
import Kitchen from '../views/Kitchen'

function Router(){
    const [page, setPage] = useState("kitchen")

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

        case "kitchen":
            contenido = <Kitchen navigator={navegar}/>
            break;
    
        default:
            break;
    }

    return(
        <> 
            {contenido}
        </>
    )
}

export default Router