import { useState, useEffect, useTransition } from "react";
import PaymentDropDown from "../components/PaymentDropDown";

function SeparatedPayment({method, name, amount}){
    console.log(method, name, amount)

    return(
        <>
            
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

        console.log(payments)
        setPaymentID(paymentID + 1);
    };
    

    

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
                    Hola
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
                    >
                        Terminar pago
                    </button>
                </div>
                
            </div>
        </>
    )
}

export default DividedPayment