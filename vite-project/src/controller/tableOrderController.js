function getOrderProducts(){
    const kit_orders = [
        {
            "order_id": 123,
            "table": 5,
            "product": "chicken",
            "quantity": 5,
            "price": 7.80
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "nuggets",
            "quantity": 3,
            "price": 5.50
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "fries",
            "quantity": 2,
            "price": 3.00
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "burger",
            "quantity": 1,
            "price": 6.50
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "soda",
            "quantity": 2,
            "price": 2.00
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "burger",
            "quantity": 1,
            "price": 6.50
        },
        {
            "order_id": 123,
            "table": 5,
            "product": "soda",
            "quantity": 2,
            "price": 2.00
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
            quantity: value.quantity,
            price: value.price
        });
    });

    console.log(JSON.stringify(groupedOrders));

    return JSON.stringify(groupedOrders)
}

export {getOrderProducts}