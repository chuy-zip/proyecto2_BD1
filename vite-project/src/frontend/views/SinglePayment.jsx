import { useState, useEffect } from "react";

function DropdownMenu({selectedOption, handleOptionChange}) {
    

    return (
        <div className="dropdown">
            <select 
                value={selectedOption} 
                onChange={handleOptionChange} 
                className="dropdown-select" // Apply the dropdown-select class
            >
                <option value="">Seleccionar método de pago</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="efectivo">Efectivo</option>
            </select>
        </div>
    );
}

function SinglePayment({billID, orderTotal}){
    const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value); // Update the selected option when it changes
    };

    
    return (
        <>
            <div className='kitbar' style={{color:'black',}}>

                <h1 className="viewTittle">Pago regular</h1>

                <DropdownMenu selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>

                <button 
                    className='orderCompleteButton' 
                    style={{ margin: 'auto', marginTop: '20px' }} 
                    onClick={() => console.log(selectedOption, billID, orderTotal)}
                >
                    Hacer pago
                </button>

                

            </div>
        </>
    )
    

}

export default SinglePayment