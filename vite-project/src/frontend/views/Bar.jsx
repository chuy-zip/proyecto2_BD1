import { useState, useEffect } from "react";
import '../styles/KitchenBar.css';
import { getUnservedDrinks } from '../../controller/kitbarController.js';

function Order({ orderKey, products }) {
    const parsedString = orderKey.split("-");

    return (
        <div className="order">
            <h1><span>{parsedString[0]}</span></h1>
            <h3><span>Mesa: {parsedString[1]}</span></h3>

            <table style={{ margin: 'auto', textAlign: 'center', paddingTop: '10px' }}>
                <thead>
                    <tr >
                        <th style={{ fontSize: '12px', color: 'black' }}>Platillo</th>
                        <th style={{ fontSize: '12px', color: 'black' }}>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((value, index) => (
                        <tr key={index}>
                            <td style={{ color: 'black' }}>{value.product}</td>
                            <td style={{ color: 'black' }}>{value.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Orders({ orders }) {
    return (
        <div className="ordersContainer">
            {Object.keys(orders).map((key, index) => (
                <Order key={key} orderKey={key} products={orders[key]} />
            ))}
        </div>
    );
}

function Bar({ navigator }) {
    const [orders, setOrders] = useState({}); 

    const goToKitchen = () =>{
        navigator("kitchen")
    }

    useEffect(() => {

        const fetchOrders = async () => {
            try {
                let initialOrders = await getUnservedDrinks()
                initialOrders = JSON.parse(initialOrders);
                console.log(initialOrders);
                setOrders(initialOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
        
        fetchOrders()
    }, []);

    const handleCompleteDish = () => {
        
        const updatedOrders = { ...orders };
        delete updatedOrders[Object.keys(updatedOrders)[0]]; 
        setOrders(updatedOrders);
    };

    return (
        <div className='kitbar'>
            <h1 className="viewTittle">Bar</h1>
            
            <Orders orders={orders} />

            <div className="buttonContainer">
                <button className='orderCompleteButton' onClick={handleCompleteDish} style={{marginRight:'10px'}}>Platillo completado</button>
                <button className='orderCompleteButton' onClick={goToKitchen} style={{marginLeft:'10px'}}>Ir a cocina</button>
            </div>
            
        </div>
    );
}

export default Bar;
