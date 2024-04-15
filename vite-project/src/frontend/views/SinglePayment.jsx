import { useState, useEffect } from "react";
import PaymentDropDown from "../components/PaymentDropDown";
import { addPaymentToBill } from "../../controller/tableOrderController";

function SinglePayment({billID, orderTotal, name}){
    const [selectedOption, setSelectedOption] = useState(""); 
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value); 
    };

    const addPayment = async () => {

        if(!selectedOption){
            alert("Por favor selecciona un método de pago")
            return;
        }
        
        try {

            await addPaymentToBill(billID, selectedOption, orderTotal);
            console.log("Payment added successfully");
            
        } catch (error) {
            console.error("Error adding payment:", error);
        }
    };

    
    return (
        <>
            <div className='kitbar' style={{color:'black',}}>

                <h1 className="viewTittle">Pago regular</h1>

                <PaymentDropDown selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>

                <button 
                    className='orderCompleteButton' 
                    style={{ margin: 'auto', marginTop: '20px' }} 
                    onClick={addPayment}
                >
                    Hacer pago
                </button>
            </div>
        </>
    )
    

}

export default SinglePayment