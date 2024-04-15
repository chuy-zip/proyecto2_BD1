import { useState, useEffect } from "react";

function SideMenu({ name, price, quantity }) {
    const [actualQuantity, setQuantity] = useState(quantity)
    

    

    useEffect(() => {
        setTotal(price * actualQuantity)
    }, [actualQuantity])
}