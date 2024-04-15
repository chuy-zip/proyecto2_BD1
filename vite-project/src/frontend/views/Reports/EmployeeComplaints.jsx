import { useState, useEffect } from "react"
import { getComplaintsByUser } from "../../../controller/complaintsController"

function Complaint({date, severity, reason }){
    let parsedDate = date.split("T")
    let splitDate = parsedDate[0].split("-")

    return (
        <div className="complaintBorders">
            <h4>Fecha: <span>{splitDate[2]}/{splitDate[1]}/{splitDate[0]}</span></h4>
            
            <h4>Severidad: <span> {severity}</span></h4>
            <h4>Motivo: </h4>
            <p>{reason}</p>

        </div>
        
    )

}

function Complaints({complaintKey, complaints}){
    const parsedString = complaintKey.split("-")

    return (
        <div className="order" style={{margin: 'auto'}}>
            <h1><span>ID: {parsedString[0]} | Nombre: {parsedString[1]} | Rol: {parsedString[2]}</span></h1>

            {complaints.map(( value, index) => (
                <Complaint key={index} date={value.date} severity={value.severity} reason={value.reason}/>
            ))}

        </div>
    )

}

function EmployeeComplaints(){
    const [complaints, setComplaints] = useState({})
    const [initialDate, setInitialDate] = useState("")
    const [endDate, setEndDate] = useState("")

    useEffect ( () => {
        const fetchComplaints = async () => {
            try {
                let initialComplaints = await getComplaintsByUser('2020-01-01','2025-12-31')
                initialComplaints = JSON.parse(initialComplaints)
                setComplaints(initialComplaints)
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        }

        fetchComplaints()
    }, []);

    const initialDateChange = (event) => {
        setInitialDate(event.target.value)
        
    }

    const endDateChange = (event) => {
        setEndDate(event.target.value)
        
    }

    return (
    
        <div 
            className="order"
            style={{width:'75%'}}> 
            <h1> Reporte de quejas agrupadas por empleados </h1>
            
            <h3> Fecha inicial</h3>

            <input 
                className="tableOrderInput" 
                type="date" 
                id="initialdate" 
                value={initialDate} 
                onChange={initialDateChange}
                style={{ marginTop: '5px' }}></input>

            <h3> Fecha Final</h3>

            <input 
                className="tableOrderInput" 
                type="date" 
                id="enddate" 
                value={endDate} 
                onChange={endDateChange}
                style={{ marginTop: '5px' }}></input>

            <div 
                className="buttonContainer"
                style={{ margin: 'auto', marginBottom: '20px' }} >
                <button 
                    className='orderCompleteButton' 
                    style={{ margin: 'auto', marginTop: '20px' }} 
                    onClick={() => console.log(initialDate, endDate)}>Generar Reporte</button>
            </div>

            {Object.keys(complaints).map( (key, index) => (
                <Complaints key={index} complaintKey={key} complaints={complaints[key]}/>
            ))}

        </div>
    )
}

export default EmployeeComplaints