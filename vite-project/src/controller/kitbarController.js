async function getOpenOrders() {
    try {
        let response = await fetch('http://localhost:3000/kitchen/unserved-dishes');
        if (!response.ok) {
            throw new Error('Failed to fetch open orders');
        }
        const orders = await response.json();

        const groupedOrders = {};

        orders.forEach((value, index) => {
            const key = `${value.order_id}-${value.id_mesa}`;

            if (!groupedOrders[key]) {
                groupedOrders[key] = [];
            }

            groupedOrders[key].push({
                prodID: value.prod_id,
                product: value.producto, 
                quantity: value.cantidad_producto, 

            });
        });

        console.log(JSON.stringify(groupedOrders));

        return JSON.stringify(groupedOrders)


        console.log(orders); // Log the orders data
        return orders;
    } catch (error) {
        console.error('Error fetching open orders:', error);
        throw error; // Rethrow the error to handle it in the caller function
    }
}

function getDrinksOrders(){

    const kit_orders = [
        {
            "order_id": 123,
            "table": 5,
            "product": "Coca cola",
            "quantity": 5
        },
        {
            "order_id": 124,
            "table": 5,
            "product": "Jugo naranja",
            "quantity": 5
        },
        {
            "order_id": 125,
            "table": 6,
            "product": "Jugo Manzana",
            "quantity": 2
        },
        {
            "order_id": 125,
            "table": 5,
            "product": "Agua mineral",
            "quantity": 5
        },
        {
            "order_id": 127,
            "table": 5,
            "product": "Pepsi",
            "quantity": 5
        }
    ];
    
    

    const groupedOrders = {};

    kit_orders.forEach((value, index) => {
        const key = `${value.order_id}-${value.table}`;

        if (!groupedOrders[key]) {
            groupedOrders[key] = [];
        }

        groupedOrders[key].push({
            product: value.product,
            quantity: value.quantity
        });
    });

    console.log(JSON.stringify(groupedOrders));

    return JSON.stringify(groupedOrders)
}

async function markProductAsCompleted(orderId, productId) {
    try {
        const response = await fetch(`http://localhost:3000/orders/${orderId}/products/${productId}/completed`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to mark product as completed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to mark product as completed: ' + error.message);
    }
}


export {getOpenOrders, getDrinksOrders, markProductAsCompleted}