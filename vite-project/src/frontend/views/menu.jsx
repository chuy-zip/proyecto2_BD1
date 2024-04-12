import { useState, useEffect } from "react";
import MenuCard from '../components/MenuCard'
import getDishes from '../../controller/menuController'
import SideMenu from "../components/SideMenuOrder";
import '../styles/SideMenu.css'

function Menu({navigator}) {
    const [dishes, setDishes] = useState([]);
    const [orderNumber, setOrderNumber] = useState(0)
    const [orderDishes, setOrderDishes] = useState(0)
    const [sideMenuState, setMenuState] = useState(false)
    const [dishesList, setDishesList] = useState([])
    const [total, setTotal] = useState(0)

const addDishes = (newDishes, dishObject) => {
    setOrderDishes(orderDishes + newDishes)
    setDishesList([...dishesList, dishObject])
}


useEffect(() => {
    console.log(dishesList);
    const newTotal = dishesList.reduce((actual, dish) => actual + parseFloat(dish.price * dish.quantity), 0);
    setTotal(newTotal);
}, [dishesList]);


    const openSideMenu = () => {
        setMenuState(true)
    }

    const closeSideMenu = () => {
        setMenuState(false)
    }

    useEffect(() => {
        async function fetchDishes() {
            const fetchedDishes = await getDishes();
            setDishes(fetchedDishes);
        }
        fetchDishes();
    }, []);

    return (
        <>
            <header>
                <div id="orderHeaderDiv" onClick={openSideMenu}>
                    <h1 style={{padding:"0 30% 0 0"}}>Orden #xxx</h1>
                    <h1>{orderDishes}</h1>
                </div>
            </header>
            <div className="background" id="menuBack">
                <div>
                    <h1>Nuestros Platillos</h1>
                </div>
                <div id="mySidenav" className={`sidenav ${sideMenuState ? 'open' : ''}`}>
                    <button onClick={closeSideMenu}>Cerrar</button>
                    {dishesList.map((dish, index) => (
                        <SideMenu key={index} name={dish.name} price={dish.price} quantity={dish.quantity} />
                    ))}
                    <footer>
                        <p>Total {total}</p>
                    </footer>
                </div>
                {dishes.map((dish, index) => (
                    <MenuCard key={index} name={dish.nombre} description={dish.descripcion} price={dish.precio} addDishes={addDishes}/>
                ))}
            </div>
        </>
    )
}

export default Menu;
