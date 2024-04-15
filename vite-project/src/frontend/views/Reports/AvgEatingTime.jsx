import { useEffect, useState } from "react"

function AvgEatingTime() {
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [avgEatingReport, setAvgEatingReport] = useState([])
    const [content, setContent] = useState("")

    const apiUrl = `http://localhost:8080/reports/average-eating-time?startDate=${fromDate}&endDate=${toDate}`

    async function apiAvgEatingReport() {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        
        if (!response.ok) {
            alert("Fechas no válidas. Inténtalo de nuevo.")
            return
        }

        const report = await response.json()

        setAvgEatingReport(report)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (fromDate !== "" && toDate !== "") {
            console.log("Éxito")
            await apiAvgEatingReport()

        } else {
            alert("Asegúrate de llenar todos los campos.")
        }
    }

    useEffect(() => {
        console.log(avgEatingReport)
        if (avgEatingReport.length > 0) {
            const reportContent = avgEatingReport.map((result, index) => {
                return(
                    <div className="background" key={index}> 
                        <h1>Reporte de tiempo promedio que tardan los clientes en comer entre {fromDate} y {toDate}</h1>
                        <p>Horas: {result.promedio_horas}</p>
                        <p>Minutos: {result.promedio_minutos}</p>
                    </div>
                )
            })
            setContent(reportContent)
        }
    }, [avgEatingReport])

    return (
        <div className="background"> 
            <h1>Reporte de tiempo que tardan los clientes en comer</h1>
            <form onSubmit={handleSubmit} style={{marginBottom: "3%"}}>
                <label htmlFor="FirstDate">Primera Fecha</label>
                <input type="date" id="FirstDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                <label htmlFor="SecondDate">Segunda Fecha</label>
                <input type="date" id="SecondDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                <button type="submit">Obtener Reporte</button>
            </form>
            {content}
        </div>
    )
}

export default AvgEatingTime