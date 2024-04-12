import { useState, useEffect } from "react";
import MenuCard from '../components/MenuCard'
import getDishes from '../../controller/menuController'

function Menu({navigator}) {
    const [dishes, setDishes] = useState([]);
    const [orderNumber, setOrderNumber] = useState(0)
    const [orderDishes, setOrderDishes] = useState(0)

    const addDishes = (newDishes) => {
        setOrderDishes(dishes + newDishes)
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
                <div id="orderHeaderDiv">
                    <h1 style={{padding:"0 50% 0 0"}}>Orden #xxx</h1>
                    <h1>0</h1>
                </div>
            </header>
            <div className="background" id="menuBack">
                <div>
                    <h1>Nuestros Platillos</h1>
                </div>
                {dishes.map((dish, index) => (
                    MenuCard(index, dish.nombre, dish.descripcion, dish.precio)
                ))}
            </div>
        </>
    )
}

export default Menu;
