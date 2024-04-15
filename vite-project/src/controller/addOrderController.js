async function addProduct(quantity, productId, orderId) {
    const apiUrl = `http://localhost:8080/orders/${orderId}/products`

    async function addNewProduct() {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                cantidadProducto: quantity,
                productId: productId
            })
        })

        if (!response.ok) {
            alert("Ocurrió un error al agregar el producto.")
            return
        }

        console.log("Éxito")

        return
    }

    try {
        addNewProduct()
        return

    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}

export default addProduct