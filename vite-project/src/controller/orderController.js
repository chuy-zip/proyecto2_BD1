async function createNewOrder(tableId) {
    const apiUrl = 'http://localhost:8080/orders'

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                mesaId: tableId
            })
        })

        if (!response.ok) {
            alert("Ocurrió un problema al crear la orden.")
            return
        }

        const orderId = await response.json()

        console.log("Éxito")

        return orderId
}

export default createNewOrder