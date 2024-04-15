import { useState, useEffect } from "react"
import { getComplaintsByUser } from "../../../controller/complaintsController"

function EmployeeComplaints(){
    const [complaints, setComplaints] = useState({})
    const [initialDate, serInitialDate] = useState("")
    const [endDate, serEndDate] = useState("")

    useEffect ( () => {
        const fetchComplaints = async () => {
            try {
                let initialComplaints = await getComplaintsByUser('2020-01-01','2025-12-31')
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        }

        fetchComplaints()
    }, []);

    return (
    
        <div> 
            rep4
        </div>
    )
}

export default EmployeeComplaints