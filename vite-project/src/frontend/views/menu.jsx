import { useState, useEffect } from "react";
import MenuCard from '../components/MenuCard'
import getDishes from '../../controller/menuController'
import '../styles/SideMenu.css'
import createNewOrder from "../../controller/orderController";
import addProduct from "../../controller/addOrderController";

function Menu({ navigator }) {
    const [dishes, setDishes] = useState([]);
    const [tableId, setTableId] = useState("");
    const [orderDishes, setOrderDishes] = useState(0);
    const [sideMenuState, setMenuState] = useState(false);
    const [dishesList, setDishesList] = useState([]);
    const [total, setTotal] = useState(0);

    const addDishes = (newDishes, dishObject) => {
        setOrderDishes(orderDishes + newDishes);
        setDishesList([...dishesList, dishObject]);
    }

    const handleIdChange = (event) => {
        setTableId(event.target.value);
    }

    const createOrder = async () => {
        if (tableId.trim() !== "") {
            try {
                const orderId = await createNewOrder(tableId);
                console.log(orderId)

                dishesList.map((dish,index) => {
                    addProduct(dish.quantity, dish.id, orderId.orderId);
                })
                alert("Orden creada con éxito.");
            } catch (error) {
                console.error("Error al crear la orden:", error);
                alert("Ocurrió un error al crear la orden.");
            }
        } else {
            alert("Ingresa el ID de la mesa.");
        }
    }

    const removeOneDish = () => {
        if (orderDishes > 0) {
            setOrderDishes(orderDishes - 1);
        }
    }

    const openSideMenu = () => {
        setMenuState(true);
    }

    const closeSideMenu = () => {
        setMenuState(false);
    }

    useEffect(() => {
        async function fetchDishes() {
            const fetchedDishes = await getDishes();
            setDishes(fetchedDishes);
        }
        fetchDishes();
    }, []);

    useEffect(() => {
        const newTotal = dishesList.reduce((acc, dish) => acc + (dish.price * dish.quantity), 0);
        setTotal(newTotal);
    }, [dishesList]);

    console.log(dishesList)
    return (
        <>
            <header>
                <input type="text" placeholder="ID de la mesa" id="menuInput" value={tableId} onChange={handleIdChange}/>
                <div id="orderHeaderDiv" onClick={openSideMenu}>
                    <h1 style={{padding:"0 30% 0 0"}}>Crear una Orden</h1>
                    <h1>Productos: {orderDishes}</h1>
                </div>
            </header>
            <div className="background" id="menuBack">
                <div>
                    <h1>Nuestros Platillos</h1>
                </div>
                <div id="mySidenav" className={`sidenav ${sideMenuState ? 'open' : ''}`}>
                    <button className="menuButtons" onClick={closeSideMenu}>Cerrar</button>
                    <button className="menuButtons" onClick={createOrder}>Crear Orden</button>
                    <div style={{ borderBottom: "0.1vw solid white", paddingBottom: "5%" }}>
                        {dishesList.map((dish, index) => (
                            <div key={index}>
                                <p>{dish.name}</p>
                                <div style={{ display: "flex" }}>
                                    <p className="priceP">Q {dish.price}</p>
                                    <p className="priceP">{dish.quantity}</p>
                                    <div style={{ marginLeft: "10%", display: "flex" }}>
                                        {/* <button className="menuButtons" onClick={removeOneDish}>Quitar</button> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <footer>
                            <p>Total {total}</p>
                        </footer>
                    </div>
                </div>
                {dishes.map((dish, index) => (
                    <MenuCard key={index} id ={dish.id} name={dish.nombre} description={dish.descripcion} price={dish.precio} addDishes={addDishes}/>
                ))}
            </div>
        </>
    )
}

export default Menu;
