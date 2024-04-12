import { useState } from "react"

function menuCard({key, name, description, price, addDishes}) {

    const [newDishes, setNewDishes] = useState(1)

    const addNewDishes = (event) => {
        console.log(newDishes)
        setNewDishes(event.target.value)
    }

    return (
        <div className="dishBack" key={key}>
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
                <p className="priceP">Q {price}</p>
            </div>
            <div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <p>Cantidad</p>
                    <input type="number" min={"1"} step={"1"} onChange={addNewDishes} value={newDishes} id="dishNumber"/>
                </div>
                <button onClick={() => addDishes(parseInt(newDishes))}>Añadir</button>
            </div>
        </div>
    )
}

export default menuCard