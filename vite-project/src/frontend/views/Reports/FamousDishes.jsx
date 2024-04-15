import { useEffect, useState } from "react"

function FamouseDishes(){
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [famousDishes, setfamousDishes] = useState([])
    const [content, setContent] = useState("")

    const apiUrl = `http://localhost:8080/reports/most-ordered-products?startDate=${fromDate}&endDate=${toDate}`

    async function apiFamoushDishesReport() {
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

        setfamousDishes(report)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (fromDate !== "" && toDate !== "") {
            console.log("Éxito")
            await apiFamoushDishesReport()

        } else {
            alert("Asegúrate de llenar todos los campos.")
        }
    }

    useEffect(() => {
        console.log(famousDishes)
        if (famousDishes.length > 0) {
            const reportContent = famousDishes.map((result, index) => {
                return(
                    <div className="background" key={index}> 
                        <h1>Reporte de platillos famosos entre {fromDate} y {toDate}</h1>
                        <p>Platillo: {result.nombre}</p>
                        <p>Cantidad: {result.cantP}</p>
                    </div>
                )
            })
            setContent(reportContent)
        }
    }, [famousDishes])

    return (
        <div className="background"> 
            <h1>Reporte de platillos famosos</h1>
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

export default FamouseDishes