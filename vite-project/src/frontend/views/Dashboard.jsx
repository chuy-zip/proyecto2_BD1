import { logOut } from "./Login"

function DashBoard({navigator, setLoggedIn}){
    const handleLogOut = () => {
        logOut();
        setLoggedIn(false)
        console.log(localStorage.getItem("sessionState"))
    }

    return (
        <>
            <div>
                <h1>DashBoard</h1>
                <p>Prueba de navegacion</p>
                <button onClick={() => navigator("menu")}>Menu</button>
                <button onClick={handleLogOut}>Cerrar Sesión</button>
            </div>
        </>
        
    )
}

export default DashBoard