import { useState } from 'react'
import Dashboard from '../views/Dashboard'
import Report from '../views/Report'  
import Login from '../views/Login'
import Signup from '../views/Signup'
import Kitchen from '../views/Kitchen'
import Bar from '../views/Bar'
import TableOrder from '../views/TableOrder'
import Bill from '../views/Bill'

function Router(){
    const [page, setPage] = useState("bill")

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

        case "bar":
            contenido = <Bar navigator={navegar}/>
            break;

        case "tableOrder":
            contenido = <TableOrder navigator={navegar}/>
            break;
        
        case "bill":
            contenido = <Bill navigator={navegar}/>
    
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