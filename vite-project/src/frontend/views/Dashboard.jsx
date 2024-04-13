
// function DashBoard({navigator, setLoggedIn}){
    
    //     return (
        //         <>
        //             <div>
        //                 <h1>DashBoard</h1>
        //                 <p>Prueba de navegacion</p>
        //                 <button onClick={() => navigator("menu")}>Menu</button>
        //                 <button onClick={handleLogOut}>Cerrar Sesión</button>
import '../styles/Dashboard.css'
import { logOut } from "./Login"
        
function DashBoard({navigate, setLoggedIn}){
        const handleLogOut = () => {
                logOut();
                setLoggedIn(false)
                console.log(localStorage.getItem("sessionState"))
            }

    return (
            <div className='dashboard-Container'>
                <nav>
                    <a href="javascript:void(0);" onClick={ () => navigate("kitchen")}>Cocina</a>
                    <a href="javascript:void(0);" onClick={ () => navigate("bar")}> Bar</a>
                    <a href="javascript:void(0);" onClick={ () => navigate("searchOrder")}> Buscar Orden</a>
                    <a href="javascript:void(0);" onClick={ () => navigate("menu")}> Menu</a>                                     
                    <a href="javascript:void(0);" onClick={handleLogOut} >Salir</a> {/* Aqui es donde esta el boton para salir*/}
                </nav>
                <div>
                    <div>
                    
                        <h1 className="viewTittle">Bienvenido</h1>
                        
                    </div>

                    <div className="dropDown">
                        <select
                            className="dropdown-select"
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

                        onClick={() => 
                            console.log("Test for search button")
                        }
                        > Obtener reporte
                    </button>

                </div>
            </div>
    )
}

export default DashBoard