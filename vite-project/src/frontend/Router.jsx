import { useState } from 'react'
import Dashboard from './Dashboard'
import Report from './Report'  

function Router(){
    const [page, setPage] = useState("dashboard")

    const navegar = (enlace) => {
        setPage(enlace)
    }

    let contenido;
    switch (page) {
        case "dashboard":
            contenido = <Dashboard/>
            break;
        
        case "reporte":
            contenido = <Report/>
            break;
    
        default:
            break;
    }

    return(
        <div>
            <nav>
                <a href="javascript:void(0);" onClick={() => navegar("dashboard")}>Dashboard </a> |
                <a href="javascript:void(0);" onClick={() => navegar("reporte")}> Reporte</a>
            </nav>

            {contenido}

        </div>
    )
}

export default Router