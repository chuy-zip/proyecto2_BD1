function menuCard(key, name, description, price) {
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
                    <input type="number" min={"1"} step={"1"} defaultValue={"1"} id="dishNumber"/>
                </div>
                <button>Añadir</button>
            </div>
        </div>
    )
}

export default menuCard