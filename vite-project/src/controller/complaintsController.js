async function getComplaintsByUser(startDate, endDate){
    try {
        
        let complaints = await fetch(`http://localhost:8080/reports/employee-complaints?startDate=${startDate}&endDate=${endDate}`)
        if (!complaints.ok){
            throw new Error("Failed tofetch complaints")
        }
        let json_list = await complaints.json()

        const groupedComplaints = {}
        
        json_list.forEach((value, index) => {
            const key = `${value.id_empleado}-${value.username}-${value.rol}`

            if (!groupedComplaints[key]){
                groupedComplaints[key] = []
            }

            groupedComplaints[key].push({
                reason: value.motivo,
                severity: value.severidad,
                date: value.fecha
            })
        })

        console.log(JSON.stringify(groupedComplaints))
        return JSON.stringify(groupedComplaints)

    } catch (error) {
        console.log(error)
    }
}

async function getComplaintsByProduct(){
    
}

export {getComplaintsByProduct, getComplaintsByUser}