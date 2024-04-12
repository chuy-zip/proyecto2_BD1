import { useState, useEffect } from "react";
import MenuCard from '../components/MenuCard'
import getDishes from '../../controller/menuController'

function Menu({navigator}) {
    const [dishes, setDishes] = useState([]);

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
                <div style={{display: "flex"}}>
                    <h1>Orden</h1>
                    <p>0</p>
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
