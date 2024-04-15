import { useEffect, useState } from "react"

function BusierSchedule() {
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [peakReport, setPeakReport] = useState([])
    const [content, setContent] = useState("")

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
            console.log("Éxito")
            await apiPeakReport()

        } else {
            alert("Asegúrate de llenar todos los campos.")
        }
    }

    useEffect(() => {
        console.log(peakReport)
        if (peakReport.length > 0) {
            const reportContent = peakReport.map((result, index) => {
                return(
                    <div className="background" key={index}> 
                        <h1>Reporte de Horarios con la mayor cantidad de pedidos entre {fromDate} y {toDate}</h1>
                        <p>Horario: {result.horario}</p>
                        <p>Cantidad: {result.cantidad}</p>
                    </div>
                )
            })
            setContent(reportContent)
        }
    }, [peakReport])

    return (
        <div className="background"> 
            <h1>Reporte de horarios con la mayor cantidad de pedidos</h1>
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

export default BusierSchedule