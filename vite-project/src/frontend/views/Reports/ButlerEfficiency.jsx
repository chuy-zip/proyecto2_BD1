import { useEffect, useState } from "react"

function ButlerEfficiency(){
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [waiterEfficency, setwaiterEfficency] = useState([])
    const [content, setContent] = useState("")

    const apiUrl = `http://localhost:8080/reports/waiter-efficiency`

    async function apiWaitesEfficency() {
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

        setwaiterEfficency(report)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (fromDate !== "" && toDate !== "") {
            console.log("Éxito")
            await apiWaitesEfficency()

        } else {
            alert("Asegúrate de llenar todos los campos.")
        }
    }

    useEffect(() => {
        console.log(waiterEfficency)
        if (waiterEfficency.length > 0) {
            const reportContent = waiterEfficency.map((result, index) => {
                return(
                    <div className="background" key={index}> 
                        <h1>Reporte de la Eficiencia de los meseros</h1>
                        <p>Mesero: {result.nameWaiter}</p>
                        <p>Mes: {result.mes}</p>
                        <p>Amabilidad: {result.promedio_amabilidad}</p>
                        <p>Exactitud: {result.promedio_exactitud}</p>
                    </div>
                )
            })
            setContent(reportContent)
        }
    }, [waiterEfficency])

    return (
        <div className="background"> 
            <h1>Reporte de eficiencia de meseros</h1>
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

export default ButlerEfficiency