import { useState, useEffect } from "react";
import PaymentDropDown from "../components/PaymentDropDown";

function SinglePayment({billID, orderTotal, name}){
    const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value); // Update the selected option when it changes
    };

    
    return (
        <>
            <div className='kitbar' style={{color:'black',}}>

                <h1 className="viewTittle">Pago regular</h1>

                <PaymentDropDown selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>

                <button 
                    className='orderCompleteButton' 
                    style={{ margin: 'auto', marginTop: '20px' }} 
                    onClick={() => console.log(selectedOption, billID, orderTotal, name)}
                >
                    Hacer pago
                </button>
            </div>
        </>
    )
    

}

export default SinglePayment