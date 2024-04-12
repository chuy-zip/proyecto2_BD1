import '../styles/Dashboard.css'
function DashBoard({navigate}){
    return (
        <>
            <div className="kitbar">
                <div>
                    <nav>
                        <a href="javascript:void(0);" onClick={ () => navigate("kitchen")}>Cocina</a>
                        <a href="javascript:void(0);" onClick={ () => navigate("bar")}> Bar</a>
                        <a href="javascript:void(0);" onClick={ () => navigate("searchOrder")}> Buscar Orden</a>
                        <a href="javascript:void(0);" onClick={ () => navigate("menu")}> Menu</a>                                     
                    </nav>
                    
                    <h1 className="viewTittle">Bienvenido</h1>
                    

                </div>

                <div className="dropDown">
                    <select
                        className="dropdown-select"
                    >
                        <option value="">Elegir un tipo de reporte</option>
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
        </>
        
    )
}

export default DashBoard