async function getProductsWithOrder(order){
    try {
        await new Promise(resolve => setTimeout(resolve,2000))

        let orderProducts = await fetch(`http://localhost:3000/orders/${order}`); // Corrected the string interpolation
        if (!orderProducts.ok){
            throw new Error("Failed to fetch data")
        }
        let json_list = await orderProducts.json();

        const groupedOrders = {};

        json_list.forEach((value, index) => {
            const key = `${value.order_id}-${value.id_mesa}`;

            if (!groupedOrders[key]) {
                groupedOrders[key] = [];
            }

            groupedOrders[key].push({
                product: value.producto, 
                quantity: value.cantidad_producto, 
                price: value.precio 
            });
        });

        console.log(JSON.stringify(groupedOrders));

        return JSON.stringify(groupedOrders)

    } catch (error) {
        console.log(error)
    }
}

export {getProductsWithOrder}