import { useState, useEffect, useTransition } from "react";
function Complaints(){
    const [complaintType, setComplaintType] = useState("")
    const [clientName, setClientName] = useState("");
    const [reason, setReason] = useState("");
    const [severity, setSeverity] = useState(0);
    const [personalID, setPersonalID] = useState("")
    const [productID, setProductID] = useState("")

    const clientChange = (event) => {
        setClientName(event.target.value);
    };

    const handlePersonalComplaint = () => {
        setComplaintType("personal")
    }

    const handleProductComplaint = () => {
        setComplaintType("product")
    }

    const reasonChange = (event) => {
        setReason(event.target.value);
    };
    
    const personalIDChange = (event) => {
        setPersonalID(event.target.value);
    }

    const productIDChange = (event) => {
        setProductID(event.target.value);
    };

    return (
    
        <div style={{width:'100%', height: '100%'}}> 
            <h1 className='viewTittle' style={{textAlign:'center', paddingLeft:'30px'}}>Seleccione un tipo de queja</h1>
            <div 
                className="buttonContainer"
                style={{justifyContent: 'center'}}>

                <button 
                    className='orderCompleteButton' 
                    style={{marginRight:'20px'}}
                    onClick={handlePersonalComplaint}
                    > Personal
                </button>

                <button 
                    className='orderCompleteButton' 
                    style={{marginLeft:'20px'}}
                    onClick={handleProductComplaint}
                    > Platillo o bebida
                </button>

            </div>

            <input className="tableOrderInput" type="text" placeholder='Cliente' value={clientName} onChange={clientChange} />
            <input className="tableOrderInput" type="text" placeholder='Motivo de la queja' value={reason} onChange={reasonChange} />

            <h2 style={{color:'white', marginTop:'30px'}}>Gravedad (Siendo 5 muy grave)</h2>

            <label>                    
                
                {[1, 2, 3, 4, 5].map((rating) => (
                    <label key={rating} style={{ display: 'inline-block', paddingRight:'20px' }}>
                        <input 
                            type="radio" 
                            name="accuracy" 
                            value={rating}
                            onChange={(e) => setSeverity(e.target.value)}/>
                                <div style={{paddingLeft:'15px',color:'white'}}>{rating}</div>
                    </label>
                ))}
            </label>
            <br/>

            {complaintType === "personal" && (
                <input className="tableOrderInput" type="text" placeholder='Ingrese el ID del trabajador' value={personalID} onChange={personalIDChange} />
            
            )}

            {complaintType === "product" && (
                <input className="tableOrderInput" type="text" placeholder='Ingrese el ID del producto' value={productID} onChange={productIDChange} />
            
            )}
            
            <button 
                className="orderCompleteButton"
                style={{width:'40%', marginLeft:'23px'}}
                type="submit" 
                onClick={()=>console.log(complaintType, clientName, reason, severity, )}>Enviar</button>
        
        </div>
    )
}

export default Complaints