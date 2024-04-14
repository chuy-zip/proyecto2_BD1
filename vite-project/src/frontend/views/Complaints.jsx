import { useState } from "react";
import { addComplaint } from "../../controller/dashController";

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
        setProductID(null)
    }

    const handleProductComplaint = () => {
        setComplaintType("product")
        setPersonalID(null)
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

    const sendComplaint = async (event) => {
        console.log(complaintType, clientName, reason, severity,"prod:", productID,"personal:" ,personalID)
        await addComplaint(personalID, productID, reason, severity)
    }

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

            <input 
                className="tableOrderInput" 
                type="text" placeholder='Cliente' 
                value={clientName} 
                onChange={clientChange} 
                style={{width:'43%'}}/>
            <br/>
            <input 
                className="tableOrderInput" 
                type="text" 
                placeholder='Motivo de la queja' 
                value={reason} 
                onChange={reasonChange}
                style={{width:'43%'}}/>
            <br/>

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
                <input 
                    className="tableOrderInput" 
                    type="text" 
                    placeholder='Ingrese el ID del trabajador' 
                    value={personalID} 
                    onChange={personalIDChange}
                    style={{width:'43%'}} />
            
            )}

            {complaintType === "product" && (
                <input 
                    className="tableOrderInput" 
                    type="text" 
                    placeholder='Ingrese el ID del producto' 
                    value={productID} 
                    onChange={productIDChange}
                    style={{width:'43%'}} />
            
            )}
            <br/>
            
            <button 
                className="orderCompleteButton"
                style={{width:'25%', marginLeft:'23px'}}
                type="submit" 
                onClick={sendComplaint}>Enviar</button>
        
        </div>
    )
}

export default Complaints