import { useState } from "react"

function MenuCard({ key, name, description, price, addDishes }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    }

    const handleAddDish = () => {
        addDishes(quantity, { name, price, quantity });
    }

    return (
        <div className="dishBack" key={key}>
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
                <p className="priceP">Q {price}</p>
            </div>
            <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <p>Cantidad</p>
                    <input
                        type="number"
                        min={1}
                        step={1}
                        value={quantity}
                        onChange={handleQuantityChange}
                        id="dishNumber"
                    />
                </div>
                <button onClick={handleAddDish}>Añadir</button>
            </div>
        </div>
    )
}

export default MenuCard;
