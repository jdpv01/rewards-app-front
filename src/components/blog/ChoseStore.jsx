import React from "react";
import { ReactComponent as IconCart4 } from "bootstrap-icons/icons/cart4.svg";
import OptionsList from "../others/OptionsList";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../api/axios";

const ChoseStore = () => {

  const { data, setData, auth } = useContext(AuthContext);
  const [ stores, setStores ] = useState([]);
  const { accessToken } = auth;
  const URL = '/stores/get-all-stores';

  useEffect(() => {
    axios.get(URL, { headers: { Authorization: `Bearer ${accessToken}` } }).then(res => {
      const fetchedStores = res.data.map((store) => (
        {
          id: store.id,
          name: store.name,
          imgPath: imagePaths[store.name],
        }
      ));
      setStores(fetchedStores);
    });
  }, []);

  const navigate = useNavigate();

  const CHOSEN_STORE = "chosen_store";

  /*const options = [
    {
      id: "a053803a-1181-4f91-855c-74841d7a2c0c",
      name: "Éxito",
      value: "exito",
      imgPath: "../../images/stores/exito.png",
    },
    {
      id: "1e7232f0-6ad9-4e87-84db-f10f4501bac2",
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
  ]*/

  const imagePaths = {
    "Éxito": "../../images/stores/exito.png",
    "Jumbo": "../../images/stores/jumbo.png",
    "Mercamio": "../../images/stores/mercamio.svg",
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const chosen_store = formData.get(CHOSEN_STORE);
    setData({ ...data, chosenStore: chosen_store });
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
      <OptionsList listItems={stores} optionName={CHOSEN_STORE} onSubmit={onSubmit} />
      <br />
    </div>
  )
}

export default ChoseStore;