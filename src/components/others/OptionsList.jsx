import React from "react";

const submitStyle = {
  fontSize: "20px",
  padding: "5px 15px",
  background: "#ccc",
  border: "0 none",
  cursor: "pointer",
  webkitBorderRadius: "5px",
  borderRadius: "5px",
}

const OptionsList = ({ listItems, optionName, onSubmit }) => {

  return (
    <form onSubmit={onSubmit} style={{ textAlign: "left", margin: "0 auto 0 auto", width: "250px" }}>
      {
        listItems?.map(item => (
          <div>
            <input style={{transform: "scale(1.5)" }} type="radio" id={item.id} value={item.id} name={optionName} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label for={item.id}><img src={item.imgPath} alt={item.name} width={80} /></label>
            &nbsp;&nbsp;
            <label for={item.id} style={{ fontSize: "18pt" }}>{item.name[0].toUpperCase() + item.name.slice(1,)}</label>
          </div>
        ))
      }
      <br />
      <br />
      <button style={submitStyle} type="submit">Siguiente</button>
      <br />
    </form>
  )
}

export default OptionsList;

/***
 * 
 * <div style={{ textAlign: "left", margin: "0 auto 0 auto", width: "250px" }}>
        <div>
          <input type="radio" id="exito" value="exito" name="store" />
          &nbsp;&nbsp;
          <img src="../../images/stores/exito.png" alt="exito" width={80} />
          &nbsp;&nbsp;
          <label style={{ fontSize: "18pt" }}>Exito</label>
        </div>
        <div>
          <input type="radio" id="jumbo" value="jumbo" name="store" />
          &nbsp;&nbsp;
          <img src="../../images/stores/jumbo.png" alt="jumbo" width={80} />
          &nbsp;&nbsp;
          <label style={{ fontSize: "18pt" }}>Jumbo</label>
        </div>
        <div>
          <input type="radio" id="mercamio" value="mercamio" name="store" />
          &nbsp;&nbsp;
          <img src="../../images/stores/mercamio.svg" alt="mercamio" width={80} />
          &nbsp;&nbsp;
          <label style={{ fontSize: "18pt" }}>Mercamio</label>
        </div>
      </div>
 */