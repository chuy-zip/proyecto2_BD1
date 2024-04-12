import { useState, useEffect, useTransition } from "react";
import PaymentDropDown from "../components/PaymentDropDown";

function SeparatedPayment({method, name, amount}){
    <>

    </>

}

function DividedPayment({billID, orderTotal}){
    const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option
    const [clientName, setClientName] = useState("");
    const [paymentAmount, setPaymentAmount] = useState(0)

    const clientChange = (event) => {
        setClientName(event.target.value);
    };

    const paymentAmountChange = (event) => {
        setPaymentAmount(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value); // Update the selected option when it changes
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

                <button 
                    className='orderCompleteButton' 
                    style={{ margin: 'auto', marginTop: '20px' }} 
                    onClick={() => console.log(billID, orderTotal)}
                >
                    Hacer pago
                </button>
            </div>
        </>
    )
    

}

export default DividedPayment