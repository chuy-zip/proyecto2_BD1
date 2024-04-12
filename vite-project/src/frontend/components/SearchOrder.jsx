import { useState } from "react";

function SearchOrder({ navigator }) {
  const [order, setOrder] = useState("");

  const orderChange = (event) => {
    setOrder(event.target.value);
  };

  const goToTableOrder = () => {
    const params = {
      order: order,
    };

    navigator("tableOrder", params);
  };

  return (
    <div className="kitbar">
      <input
        className="tableOrderInput"
        type="text"
        placeholder="Ingrese un numero de orden"
        value={order}
        onChange={orderChange}
        style={{height: '10%'}}
      />
      
        <button
          className="orderCompleteButton"
          style={{ margin: "auto", marginTop: "20px" }}
          onClick={goToTableOrder}
        >
          Buscar
        </button>
      
    </div>
  );
}

export default SearchOrder;
