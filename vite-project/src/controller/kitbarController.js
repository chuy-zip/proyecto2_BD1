async function getUnservedDishes() {
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

    } catch (error) {
        console.error('Error fetching open orders:', error);
        throw error; // Rethrow the error to handle it in the caller function
    }
}

async function getUnservedDrinks() {
    try {
        let response = await fetch('http://localhost:3000/bar/unserved-drinks');
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

    } catch (error) {
        console.error('Error fetching open orders:', error);
        throw error; // Rethrow the error to handle it in the caller function
    }
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


export {getUnservedDishes, getUnservedDrinks, markProductAsCompleted}