import React from "react";
import { ReactComponent as IconCart4 } from "bootstrap-icons/icons/cart4.svg";
import OptionsList from "../others/OptionsList";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const ChoseStore = () => {

  const { data, setData } = useContext(AuthContext);

  const navigate = useNavigate();

  const CHOSEN_STORE = "chosen_store";

  const options = [
    {
      id: "1",
      name: "Exito",
      value: "exito",
      imgPath: "../../images/stores/exito.png",
    },
    {
      id: "2",
      name: "Jumbo",
      value: "jumbo",
      imgPath: "../../images/stores/jumbo.png",
    },
    {
      id: "3",
      name: "Mercamio",
      value: "mercamio",
      imgPath: "../../images/stores/mercamio.svg",
    },
  ]

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const chosen_store = formData.get(CHOSEN_STORE);
    setData({...data, chosenStore: chosen_store});
    navigate('/uploadInvoice');
  }

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <h1><strong>Subir factura</strong></h1>
      <br />
      <IconCart4 style={{ height: "100px", width: "100px" }} />
      <br />
      <br />
      <h3>¿Dónde hiciste tu compra?</h3>
      <br />
      <OptionsList listItems={options} optionName={CHOSEN_STORE} onSubmit={onSubmit} />
      <br />
    </div>
  )
}

export default ChoseStore;