import { useState, useEffect } from "react"
import { getComplaintsByUser } from "../../../controller/complaintsController"

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

        </div>
    )
}

export default EmployeeComplaints