import { useState, useEffect, useTransition } from "react";
import PaymentDropDown from "../components/PaymentDropDown";

function SeparatedPayment({payment}){

    return(
        <>
          <div className="order">
            <h3><span>Nombre: {payment.name}</span></h3>
            <h3><span>Metodo: {payment.method}</span></h3>
            <h3><span>Cantidad: {payment.amount}</span></h3>
          </div>
        </>

    )
    

}

function DividedPayment({params}){
    const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option
    const [clientName, setClientName] = useState("");
    const [paymentAmount, setPaymentAmount] = useState(0)
    const [paymentID, setPaymentID] = useState(0)
    const [payments, setPayments] = useState({});


    const clientChange = (event) => {
        setClientName(event.target.value);
    };

    const paymentAmountChange = (event) => {
        setPaymentAmount(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);     
};

    const addPayment = () => {
        setPayments(prevPayments => ({
            ...prevPayments,
            [paymentID]: {
                name: clientName,
                method: selectedOption,
                amount: paymentAmount
            }
        }));

        setPaymentID(paymentID + 1);

    };

    useEffect(() => {
        console.log(payments);
    }, [payments]);
    

    

    return (
        <>
            <div className='kitbar' style={{color:'black',}}>

                <h1 className="viewTittle">Pago separado</h1>

                <input 
                    className="tableOrderInput" 
                    type="text" placeholder='Cliente' 
                    value={clientName} 
                    onChange={clientChange} 
                    style={{ width: '30%'}}/>
                <input 
                    className="tableOrderInput" 
                    type="number" 
                    placeholder='Cantidad' 
                    step="0.01" 
                    min="0" 
                    value={paymentAmount} 
                    onChange={paymentAmountChange}
                    style={{ width: '30%'}}/>

                <PaymentDropDown selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>

                <div className="ordersContainer">
                    {Object.keys(payments).map((key, index) => (
                        <SeparatedPayment key={key} payment={payments[key]} />
                    ))}
                </div>

                <div className="buttonContainer">
                    <button 
                        className='orderCompleteButton' 
                        style={{ margin: 'auto', marginTop: '20px' }} 
                        onClick={() => 
                            addPayment()
                        }
                        > Agregar pago
                    </button>

                    <button 
                        className='orderCompleteButton' 
                        style={{ margin: 'auto', marginTop: '20px' }} 
                        onClick={() => console.log(params.billID, params.orderTotal)}
                    > {/* Aqui hay que hacer que en el boton de terminar pago se asocien todos los pagos a una factura */}
                        Terminar pago
                    </button>
                </div>
                
            </div>
        </>
    )
}

export default DividedPayment