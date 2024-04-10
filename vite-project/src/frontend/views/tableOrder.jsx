import { useState, useEffect } from "react";
import '../styles/KitchenBar.css';
import {getOrderProducts} from '../../controller/tableOrderController.js'

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

function TableOrder({ navigator }) {
    const [order, setOrder] = useState({}); 
    const [tableOrder, setTableOrder] = useState("");
    const goToBar = () =>{
        navigator("kitchen")
    }
    
    useEffect(() => {
        
        const initialOrders = JSON.parse(getOrderProducts());
        console.log(initialOrders)
        
        setOrder(initialOrders);
        setTableOrder(Object.keys(initialOrders)[0])

    }, []);

    return (
        <div className='kitbar'>
            <h1 style={{ fontSize: '30px', color: 'white'}}>Orden de la mesa</h1>
            
            <Order orderKey={tableOrder} products={order[tableOrder]} />
            
            <div className="buttonContainer">
            
                <button className='orderCompleteButton' onClick={goToBar}>Ir a cocina</button>
            </div>
        
        </div>
    );
}

export default TableOrder;
