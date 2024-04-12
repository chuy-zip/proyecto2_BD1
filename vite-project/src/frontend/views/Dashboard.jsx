function DashBoard({navigate}){
    return (
        <>
            <div className="kitbar">
                <div>
                    <h1 className="viewTittle">Bienvenido</h1>
                    
                    <a href="javascript:void(0);" onClick={ () => navigate("kitchen")}>Cocina</a> | 
                    <a href="javascript:void(0);" onClick={ () => navigate("bar")}> Bar</a> | 
                    <a href="javascript:void(0);" onClick={ () => navigate("searchOrder")}> Buscar Orden</a> | 
                    <a href="javascript:void(0);" onClick={ () => navigate("menu")}> Menu</a> |                     
                    
                    <p>Prueba de navegacion</p>

                </div>

                
            </div>
        </>
        
    )
}

export default DashBoard