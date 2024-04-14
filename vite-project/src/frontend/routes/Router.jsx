import { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
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
import EmptyState from '../components/EmptyState'
import SatisfactionSurvey from '../views/SatisfactionSurvey'
import AvgEatingTime from '../views/Reports/AvgEatingTime'
import BusierSchedule from '../views/Reports/BusierSchedule'
import ButlerEfficiency from '../views/Reports/ButlerEfficiency'
import DishesComplaints from '../views/Reports/DishesComplaints'
import EmployeeComplaints from '../views/Reports/EmployeeComplaints'
import FamouseDishes from '../views/Reports/FamousDishes'
import Complaints from '../views/Complaints'

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

    useEffect(() => {
        localStorage.getItem("userData")
    })
    
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
            break;

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
        
        case "survey":
            contenido = <SatisfactionSurvey/>
            break;
        
        case "avgEatTime":
            contenido = <AvgEatingTime/>
            break;

        case "busierSchedule":
            contenido = <BusierSchedule/>
            break;
        
        case "butlerEfficiency":
            contenido = <ButlerEfficiency/>
            break;
        
        case "dishesComplaints":
            contenido = <DishesComplaints/>
            break;
        
        case "EmployeeComplaints":
            contenido = <EmployeeComplaints/>
            break;
        
        case "FamousDishes":
            contenido = <FamouseDishes/>
            break;
        
        case "complaints":
            contenido = <Complaints/>
            break;

        default:
            contenido = <EmptyState navigator={navegar} />
            break;
    }

    return(
        <> 
            {contenido}

            <div className='button-containerDash'>
                <button
                    className="orderCompleteButton"
                    style={{ margin: "auto", marginTop: "20px", width: '150px', zIndex:'2'}}
                    onClick={() => setPage("dashboard")} // Wrap setPage in an arrow function
                >DashBoard
                </button>
            </div>

        </>
    )
}

export default Router