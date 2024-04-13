import { useEffect, useState } from 'react'
import Dashboard from '../views/Dashboard'
import Report from '../views/Report'  
import Login from '../views/Login'
import Signup from '../views/Signup'
import Kitchen from '../views/Kitchen'
import Bar from '../views/Bar'
import Menu from '../views/Menu'
import TableOrder from '../views/tableOrder'
import Bill from '../views/Bill'
import DividedPayment from '../views/DividedPayment'
import SearchOrder from '../components/SearchOrder'

function Router(){
    const [page, setPage] = useState("dashboard")
    const [params, setParams] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

    const navegar = (enlace, parametros) => {
        setPage(enlace)
        setParams(parametros)
    }

    let contenido;

    useEffect(() => {
        if (localStorage.getItem("sessionState") === "true") {
            setLoggedIn(true)
        }
    }, [localStorage.getItem("sessionState")])
    
    if (!loggedIn && page != "signup") {
        return <Login navigator={navegar} />
    }
    
    switch (page) {
        case "dashboard":
            contenido = <Dashboard navigator={navegar} setLoggedIn={setLoggedIn}/>
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
    
        case "menu":
            contenido = <Menu navigator={navegar}/>
            break

        case "tableOrder":
            contenido = <TableOrder navigator={navegar} params={params}/>
            break;
        
        case "bill":
            contenido = <Bill navigator={navegar} params={params}/>
            break;
        
        case "dividedBill":
            contenido = <DividedPayment params={params}/>
            break;

        case "searchOrder":
            contenido = <SearchOrder navigator={navegar}/>
            break;

        default:
            contenido = <EmptyState navigator={navegar} />
            break;
    }

    return(
        <> 
            {contenido}
        </>
    )
}

export default Router