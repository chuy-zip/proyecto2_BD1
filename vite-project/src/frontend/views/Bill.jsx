import { useState, useEffect } from "react";
import SinglePayment from "./SinglePayment";
import { getInvoiceByOrder } from "../../controller/tableOrderController";


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
    const [tableOrderNumber, settableOrderNumber] = useState("");
    const [paymentStyle, setPaymentStyle] = useState("")
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [orderTotal, setOrderTotal] = useState(0)
    const [billNumber, setBillNumber] = useState(0)

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const initialOrders = params.order;
                const initialOrdNum = Object.keys(initialOrders)[0];
                
                settableOrderNumber(initialOrdNum);

                const sum = initialOrders[initialOrdNum].reduce(
                    (total, dish) => total + dish.quantity * dish.price,
                    0
                );
                setOrderTotal(sum.toFixed(2));

                const parsedOrdNum = initialOrdNum.split("-")
                const invoice = await getInvoiceByOrder(parsedOrdNum[0]);
                
                setBillNumber(invoice[0].id); // Assuming the bill ID is stored in the 'id' property
                setBill(initialOrders);
                setLoading(false);
                console.log(billNumber)
                
            } catch (error) {
                console.error("Error retrieving invoice:", error);
                setError(error);
            }
        };

        fetchInvoice();
    }, [params.order]);

    const handleRegularPayment = () => {
        setPaymentStyle("regular");
    };

    const goToDividedPayment = () => {
        const params = { 
            'billID': billNumber,
            'orderTotal': orderTotal
        };
        navigator("dividedBill", params);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (loading || !bill[tableOrderNumber]) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='kitbar'>
                <h1 className='viewTittle'>Factura</h1>

                <Order 
                    orderKey={tableOrderNumber} 
                    products={bill[tableOrderNumber]} 
                    nombre={params.name}
                    nit={params.nit}
                    address={params.address}
                    orderTotal={orderTotal}
                    />
                
                
                <div className="buttonContainer">
                    <button  
                        className='orderCompleteButton' 
                        style={{margin: 'auto', marginTop: '20px'}}
                        onClick={() => handleRegularPayment()}>Pago regular</button>

                    <button  
                        className='orderCompleteButton' 
                        style={{margin: 'auto', marginTop: '20px'}} 
                        onClick={() => goToDividedPayment()}>Pago separado</button>
                </div>

                {paymentStyle === "regular" && (
                    // Here i use a hardcoded ID
                    <SinglePayment billID={billNumber} orderTotal={orderTotal} name={params.name}/>
                )}


            </div>
        </>
    )

}

export default Bill