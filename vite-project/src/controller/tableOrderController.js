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

async function closeOrder(orderId) {
    try {
        const response = await fetch(`http://localhost:3000/orders/${orderId}/close`, {
            method: 'PUT',
        });
        if (!response.ok) {
            throw new Error('Failed to close order');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error closing order: ' + error.message);
    }
}


async function submitBill(order, nit, name, address){
    try {
        const data = {
            "nombreCliente": name,
            "nit": nit,
            "orderId": order,
            "direccion": address 
        };

        const response = await fetch('http://localhost:3000/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('There was an error on the response');
        }

        const responseData = await response.json();
        console.log('Factura guardada:', responseData);
    } catch (error) {
        console.error('No se pudo crear la factura:', error);
    }
}

async function getInvoiceByOrder(orderId) {
    try {
        const response = await fetch(`http://localhost:3000/invoices/by-order/${orderId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch invoice');
        }
        const invoice = await response.json();
        return invoice;
    } catch (error) {
        throw new Error('Error fetching invoice: ' + error.message);
    }
}



export {getProductsWithOrder, submitBill, closeOrder, getInvoiceByOrder}