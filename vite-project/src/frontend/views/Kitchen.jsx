import { useState } from "react"
import '../styles/KitchenBar.css'

function Order({ orderKey, dishes }) {
    return (
        <div className="order">
            <h1 style={{color:"black"}}>{orderKey}</h1>
        </div>
    )
}

function Orders({ orders }) {
    return (
        <div className="ordersContainer">
            
            {Object.keys(orders).map((key, index) => (
                <Order orderKey={key} dishes={orders[key]} />
            ))}
        </div>
    )
}

function Kitchen({ navigator }) {
    const kit_orders = [
        {
            "order_id": 123,
            "table": 5,
            "dish": "chicken",
            "quantity": 5
        },
        {
            "order_id": 123,
            "table": 5,
            "dish": "nuggets",
            "quantity": 5
        },
        {
            "order_id": 123,
            "table": 5,
            "dish": "wings",
            "quantity": 2
        },
        {
            "order_id": 230,
            "table": 7,
            "dish": "wings",
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
            dish: value.dish,
            quantity: value.quantity
        });
    });

    console.log(groupedOrders);

    return (
        <div className='kitbar'>
            {/* Pass groupedOrders as the orders prop */}
            <Orders orders={groupedOrders} />
            <button className='orderCompleteButton'>Platillo completado</button>
        </div>
    )
}

export default Kitchen
