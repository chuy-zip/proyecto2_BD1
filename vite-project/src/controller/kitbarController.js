function getDishesOrders(){
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
            "order_id": 230,
            "table": 7,
            "product": "wings",
            "quantity": 1
        },
        {
            "order_id": 231,
            "table": 8,
            "product": "wings",
            "quantity": 1
        },
        {
            "order_id": 231,
            "table": 8,
            "product": "wings",
            "quantity": 1
        },
        {
            "order_id": 232,
            "table": 9,
            "product": "wings",
            "quantity": 1
        },
        {
            "order_id": 233,
            "table": 10,
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

export {getDishesOrders, getDrinksOrders}