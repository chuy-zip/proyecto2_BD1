function PaymentDropDown({selectedOption, handleOptionChange}) {
    
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

export default PaymentDropDown