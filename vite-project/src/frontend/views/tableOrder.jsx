import { useState, useEffect } from "react";
import '../styles/KitchenBar.css';
import {getOrderProducts} from '../../controller/tableOrderController.js'
import '../styles/tableOrder.css';

function Order({ orderKey, products }) {
    const parsedString = orderKey.split("-");

    return (
        <div className="order" style={{width: '700px', margin:'auto'}}>
            <h1><span style={{fontSize: '100px'}}>Orden: {parsedString[0]}</span></h1>
            <h3><span style={{fontSize: '40px'}}>Mesa: {parsedString[1]}</span></h3>

            <table style={{ margin: 'auto', paddingTop: '10px', borderCollapse: 'collapse'}}>
                <thead>
                    <tr >
                        <th className="tableOrderTh"> <span>Platillo:</span></th>
                        <th className="tableOrderTh"> <span>Cantidad:</span></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((value, index) => (
                        <tr key={index}>
                            <td style={{ color: 'black', textAlign: 'left', paddingRight: '300px', fontSize: '20px'}}><span>{value.product}</span></td>
                            <td style={{ color: 'black', fontSize: '20px'}}><span>{value.quantity}</span></td>
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
    const [clientName, setClientName] = useState("");
    const [nit, setNit] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const goToBill = () => {
        const params = { 
            'order': order,
            'name': clientName,
            'nit': nit,
            'address': address
        };
        navigator("bill", params);
    };
    
    useEffect(() => {
        try {
            const initialOrders = JSON.parse(getOrderProducts());
            console.log("Initial Orders:", initialOrders);
            
            // Check if initialOrders is an object
            if (typeof initialOrders === 'object' && initialOrders !== null) {
                setOrder(initialOrders);
                setTableOrder(Object.keys(initialOrders)[0]);
                setLoading(false); // Update loading status
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error("Error retrieving order products:", error);
            setError(error); // Update error state
        }
    }, []);

    const clientChange = (event) => {
        setClientName(event.target.value);
    };

    const nitChange = (event) => {
        setNit(event.target.value);
    };

    const addressChange = (event) => {
        setAddress(event.target.value);
    };
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (loading || !order[tableOrder]) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className='kitbar'>
            <h1 className="viewTittle">Revision de la orden</h1>
            
            <Order orderKey={tableOrder} products={order[tableOrder]} />

            <input className="tableOrderInput" type="text" placeholder='Cliente' value={clientName} onChange={clientChange} />
            <input className="tableOrderInput" type="text" placeholder='Nit' value={nit} onChange={nitChange} />
            <input className="tableOrderInput" type="text" placeholder='Direccion' value={address} onChange={addressChange} />
            
            <div className="buttonContainer">
                <button className='orderCompleteButton' style={{ margin: 'auto', marginTop: '20px' }} onClick={goToBill}>Cerrar orden y generar factura</button>
            </div>
        </div>
    );
}

export default TableOrder;
