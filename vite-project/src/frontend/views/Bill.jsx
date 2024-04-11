import { useState, useEffect } from "react";
import { getBillData } from "../../controller/billController";

function Order({ orderKey, products }) {
    const parsedString = orderKey.split("-");
    console.log(products)
    const sum = products.reduce((total, dish) => total + dish.price, 0); // Initialize total with 0
    console.log(sum);

    return (
        <div className="order" style={{width: '700px', margin:'auto'}}>
            <h1><span style={{fontSize: '100px'}}>Orden: {parsedString[0]}</span></h1>
            <h3><span style={{fontSize: '25px'}}>Mesa: {parsedString[1]} Nombre: {parsedString[2]}</span></h3>
            <h3><span style={{fontSize: '25px'}}>Nit: {parsedString[3]}</span></h3>
            <h3><span style={{fontSize: '25px'}}>Direccion: {parsedString[4]}</span></h3>

            <table style={{ margin: 'auto', paddingTop: '10px', borderCollapse: 'collapse'}}>
                <thead>
                    <tr >
                        <th className="tableOrderTh" > <span style={{paddingRight: '110px'}}>Platillo:</span></th>
                        <th className="tableOrderTh"> <span >Cantidad:</span></th>
                        <th className="tableOrderTh"> <span style={{paddingLeft: '110px'}}>Precio:</span></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((value, index) => (
                        <tr key={index}>
                            <td style={{ color: 'black', textAlign: 'left', fontSize: '20px'}}><span>{value.product}</span></td>
                            <td style={{ color: 'black', textAlign: 'center', fontSize: '20px'}}><span>{value.quantity}</span></td>
                            <td style={{ color: 'black', textAlign: 'right', fontSize: '20px'}}><span>{value.price}</span></td>
                        </tr>
                    ))}

                    <tr>
                        <td className="tableOrderTh" style={{ fontWeight: 'bold'}}>Total</td>
                        <td></td>
                        <td style={{ color: 'black', textAlign: 'right', fontSize: '20px'}}>{sum}</td>

                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function Bill({ navigator }){

    const [bill, setBill] = useState({})
    const [billNumber, setBillNumber] = useState("");
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors

    useEffect(() => {
        try {
            const initialOrders = JSON.parse(getBillData());
            console.log("Initial Orders:", initialOrders);
            
            // Check if initialOrders is an object
            if (typeof initialOrders === 'object' && initialOrders !== null) {
                setBill(initialOrders);
                setBillNumber(Object.keys(initialOrders)[0]);
                setLoading(false); // Update loading status
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error("Error retrieving order products:", error);
            setError(error); // Update error state
        }
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (loading || !bill[billNumber]) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='kitbar'>
                <h1 className='viewTittle'>Factura</h1>

                <Order orderKey={billNumber} products={bill[billNumber]} />
                
                <div className="buttonContainer">
                    <button  className='orderCompleteButton' style={{margin: 'auto', marginTop: '20px'}}>Pago regular</button>
                    <button  className='orderCompleteButton' style={{margin: 'auto', marginTop: '20px'}}>Pago separado</button>
                </div>
            </div>
            

        </>
    )

}

export default Bill