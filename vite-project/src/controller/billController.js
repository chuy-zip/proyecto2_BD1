function getBillData(){
    const kit_orders = [
        {
            "order_id": 123,
            "table": 5,
            "client_name": "Pablo Carrera",
            "nit": 5739102648927,
            "address": "Colonia Fontana zona 4",
            "product": "chicken",
            "quantity": 5,
            "price": 7.80
        },
        {
            "order_id": 123,
            "table": 5,
            "client_name": "Pablo Carrera",
            "nit": 5739102648927,
            "address": "Colonia Fontana zona 4",
            "product": "nuggets",
            "quantity": 3,
            "price": 5.50
        },
        {
            "order_id": 123,
            "table": 5,
            "client_name": "Pablo Carrera",
            "nit": 5739102648927,
            "address": "Colonia Fontana zona 4",
            "product": "fries",
            "quantity": 2,
            "price": 3.00
        },
        {
            "order_id": 123,
            "table": 5,
            "client_name": "Pablo Carrera",
            "nit": 5739102648927,
            "address": "Colonia Fontana zona 4",
            "product": "burger",
            "quantity": 1,
            "price": 6.50
        },
        {
            "order_id": 123,
            "table": 5,
            "client_name": "Pablo Carrera",
            "nit": 5739102648927,
            "address": "Colonia Fontana zona 4",
            "product": "soda",
            "quantity": 2,
            "price": 2.00
        }
    ];
    


    const groupedOrders = {};

    kit_orders.forEach((value, index) => {
        const key = `${value.order_id}-${value.table}-${value.client_name}-${value.nit}-${value.address}`;

        if (!groupedOrders[key]) {
            groupedOrders[key] = [];
        }

        groupedOrders[key].push({
            product: value.product,
            quantity: value.quantity,
            price: value.price
        });
    });

    console.log(JSON.stringify(groupedOrders));

    return JSON.stringify(groupedOrders)
}

export {getBillData}