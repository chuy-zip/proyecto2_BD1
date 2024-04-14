async function getDishes() {

    const apiUrl = "http://localhost:8080/products"

    async function getProducts() {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        if (!response.ok) {
            alert("Ocurrió un error obteniendo los productos.")
            return
        }

        const products = await response.json()

        console.log("Éxito")

        return products
    }

    try {
        const products = await getProducts()
        return products

    } catch (error) {
        console.error("Error al obtener productos:", error)
        throw error
    
    }
}

export default getDishes