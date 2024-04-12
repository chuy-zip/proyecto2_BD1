function SideMenu({ name, price, quantity }) {
    const actualOrder = []

    actualOrder.push({ name })
    
    return (
            <div>
                <p>{name}</p>
                <div style={{display:"flex"}}>
                    <p className="priceP">Q {price}</p>
                    <p className="priceP">{quantity}</p>
                </div>
            </div>
    )
}

export default SideMenu