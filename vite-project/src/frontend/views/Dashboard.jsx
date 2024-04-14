import { useState } from 'react';
import '../styles/Dashboard.css'
import { logOut } from "./Login"
import Complaints from './Complaints';
        
function DashBoard({navigator, setLoggedIn}){

    const[selectedOption, setSelectedOption] = useState("")

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const handleLogOut = () => {
        logOut(navigator);
        setLoggedIn(false)
        console.log(localStorage.getItem("sessionState"))
    }

    const goToKitchen = () => {
        navigator("kitchen")
    }

    const goToBar = () => {
        navigator("bar")
    }
        
    const goToOrder = () => {
        navigator("searchOrder")
    }

    const goToMenu = () => {
        navigator("menu")
    }

    const goToSurvey = () => {
        navigator("survey")
    }

    const goToComplaints = () => {
        navigator("complaints")
    }

    const goToReport = () => {

        switch (selectedOption) {
            case "reporte1":
                navigator("FamousDishes")
                break;

            case "reporte2":
                navigator("busierSchedule")
                break;

            case "reporte3":
                navigator("avgEatTime")
                break;

            case "reporte4":
                navigator("EmployeeComplaints")
                break;
        
            case "reporte5":
                navigator("dishesComplaints")
                break;

            case "reporte6":
                navigator("butlerEfficiency")
                break;

            default:
                break;
        }

    }

    return (
            <div className='dashboard-Container'>
                <nav>
                    <a href="javascript:void(0);" onClick={goToKitchen}>Cocina</a>
                    <a href="javascript:void(0);" onClick={goToBar}>Bar</a>
                    <a href="javascript:void(0);" onClick={goToOrder}>Buscar Orden</a>
                    <a href="javascript:void(0);" onClick={goToMenu}>Menú</a>
                    <a href="javascript:void(0);" onClick={goToSurvey}>Encuesta satisfacción</a>                                       
                    <a href="javascript:void(0);" onClick={goToComplaints}>Quejas</a>
                    <a href="javascript:void(0);" onClick={handleLogOut}>Salir</a>
                </nav>
                <div>
                    <div>
                    
                        <h1 className="viewTittle">Bienvenido</h1>
                        
                    </div>

                    <div className="dropDown">
                        <select
                            className="dropdown-select"
                            value={selectedOption}
                            onChange={handleOptionChange}
                            style={{width: '20%'}}
                        >
                            <option value="">Elegir un reporte</option>
                            <option value="reporte1">Platos mas pedidos</option>
                            <option value="reporte2">Horario con mas pedidos</option>
                            <option value="reporte3">Promedio de tiempo de comer</option>
                            <option value="reporte4">Quejas de Personas</option>
                            <option value="reporte5">Quejas de Platos</option>
                            <option value="reporte6">Eficiencia de mesesores</option>

                        </select>

                    </div>
                    
                    <button 
                        className='orderCompleteButton' 
                        style={{ margin: 'auto', marginTop: '20px' }} 

                        onClick={goToReport}
                        > Obtener reporte
                    </button>

                </div>
                
            </div>
    )
}

export default DashBoard