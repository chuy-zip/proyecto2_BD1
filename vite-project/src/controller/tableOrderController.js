function getOrderProducts(){
    const kit_orders = [
        {
            "order_id": 123,
            "table": 5,
            "product": "chicken",
            "quantity": 5
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "nuggets",
            "quantity": 5
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "wings",
            "quantity": 2
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "chicken",
            "quantity": 5
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "nuggets",
            "quantity": 5
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "wings",
            "quantity": 2
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "chicken",
            "quantity": 5
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "nuggets",
            "quantity": 5
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "wings",
            "quantity": 2
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "chicken",
            "quantity": 5
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "nuggets",
            "quantity": 5
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "wings",
            "quantity": 2
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "wings",
            "quantity": 1
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "wings",
            "quantity": 1
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "wings",
            "quantity": 1
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "wings",
            "quantity": 1
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "wings",
            "quantity": 1
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

export {getOrderProducts}