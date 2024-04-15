import { useState } from "react"

function BusierSchedule() {
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [peakReport, setPeakReport] = useState([])

    const apiUrl = `http://localhost:8080/reports/peak-order-hours?startDate=${fromDate}&endDate=${toDate}`

    async function apiPeakReport() {
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

        setPeakReport(report)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (fromDate !== "" && toDate !== "") {
            await apiPeakReport()

        } else {
            alert("Asegúrate de llenar todos los campos.")
        }
    }

    return (
        <div className="background"> 
            <h1>Prueba</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="FirstDate">Primera Fecha</label>
                <input type="date" id="FirstDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                <label htmlFor="SecondDate">Segunda Fecha</label>
                <input type="date" id="SecondDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                <button type="submit">Obtener Reporte</button>
            </form>
        </div>
    )
}

export default BusierSchedule