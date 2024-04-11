import { useState, useEffect } from "react";
import SinglePayment from "./SinglePayment";
import DividedPayment from "./DividedPayment";

function Order({ orderKey, nombre, nit, address, products, orderTotal }) {
    const parsedString = orderKey.split("-");

    return (
        <div className="order" style={{width: '700px', margin:'auto'}}>
            <h1><span style={{fontSize: '100px'}}>Orden: {parsedString[0]}</span></h1>
            <h3><span style={{fontSize: '25px'}}>Mesa: {parsedString[1]} Nombre: {nombre}</span></h3>
            <h3><span style={{fontSize: '25px'}}>Nit: {nit}</span></h3>
            <h3><span style={{fontSize: '25px'}}>Direccion: {address}</span></h3>

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
                            <td style={{ color: 'black', textAlign: 'right', fontSize: '20px'}}><span>Q.{value.price}</span></td>
                        </tr>
                    ))}

                    <tr>
                        <td className="tableOrderTh" style={{ fontWeight: 'bold'}}>Total</td>
                        <td></td>
                        <td style={{ color: 'black', textAlign: 'right', fontSize: '20px'}}>Q.{orderTotal}</td>

                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function Bill({ navigator, params }){

    const [bill, setBill] = useState({})
    const [billNumber, setBillNumber] = useState("");
    const [paymentStyle, setPaymentStyle] = useState("")
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors
    const [orderTotal, setOrderTotal] = useState(0)

    useEffect(() => {
        try {
            const initialOrders = params.order;
            const initialOrdNum = Object.keys(initialOrders)[0]
            console.log("aaaaaaaaaaaaa", initialOrders)

            const sum = initialOrders[initialOrdNum].reduce(
                (total, dish) => total + dish.quantity * dish.price  , 0
            ); // Initialize total with 0
            
            if (typeof initialOrders === 'object' && initialOrders !== null) {
                setBill(initialOrders);
                setBillNumber(initialOrdNum);
                setOrderTotal(sum)
                setLoading(false); // Update loading status
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error("Error retrieving order products:", error);
            setError(error); // Update error state
        }
    }, []);

    const handleRegularPayment = () => {
        setPaymentStyle("regular");
    };

    const handleSeparatedPayment = () => {
        setPaymentStyle("separated");
    };

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

                <Order 
                    orderKey={billNumber} 
                    products={bill[billNumber]} 
                    nombre={params.name}
                    nit={params.nit}
                    address={params.address}
                    orderTotal={orderTotal}
                    />
                
                // When a button is pressed it should create the bill So then ID can be passed //
                // to the payment functions
                <div className="buttonContainer">
                    <button  
                        className='orderCompleteButton' 
                        style={{margin: 'auto', marginTop: '20px'}}
                        onClick={() => handleRegularPayment()}>Pago regular</button>

                    <button  
                        className='orderCompleteButton' 
                        style={{margin: 'auto', marginTop: '20px'}} 
                        onClick={() => handleSeparatedPayment()}>Pago separado</button>
                </div>

                {paymentStyle === "regular" && (
                    // Here i use a hardcoded ID
                    <SinglePayment billID={"102"} orderTotal={orderTotal}/>
                )}

                {paymentStyle === "separated" && (
                    // Render components for separated payment method
                    <DividedPayment />
                )}


            </div>
        </>
    )

}

export default Bill