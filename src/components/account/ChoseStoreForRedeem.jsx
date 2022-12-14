import { Button, Card, Divider, message, Row } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

const ChoseStoreForRedeem = () => {

  const { data, setData, auth } = useContext(AuthContext);
  const [storesInfo, setStoresInfo] = useState([]);
  const { accessToken } = auth;
  const navigate = useNavigate();
  const URL = '/stores/get-all-stores';
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        URL,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      setStoresInfo(res.data);
    } catch (err) {
      message.error('Error al solicitar las tiendas!')
    }
  }

  /*const storesInfo = [
    {
      id: "exito",
      name: "Exito",
      img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Logo_Exito_colombia.png",
    },
    {
      id: "jumbo",
      name: "Jumbo",
      img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Logo_Jumbo_Cencosud.png",
    },
    {
      id: "mercamio",
      name: "Mercamio",
      img: "https://mercamio.com/static/media/logo.8d115182.svg",
    },
  ]*/

  const onRedeem = async (name) => {
    setData({ ...data, storeToRedeem: name });
    navigate('/redeem/code');
  }

  const cardsList = () => {
    return storesInfo.map((storeInfo) => (
      <>
        <Row justify="center">
          <Card
            style={{ width: 300, textAlign: "center" }}
            cover={
              <Row style={{ margin: "20px auto 10px auto" }} justify="center">
                <h1>{storeInfo.name}</h1>
                <img
                  width="200px"
                  alt="store-logo"
                  src={storeInfo.image}
                />
              </Row>
            }
            actions={[
              <Button
                onClick={() => onRedeem(storeInfo.name)}
                key="redeem">Redimir</Button>,
            ]}
          />
        </Row>
        <Divider />
      </>
    ));
  }

  return (
    <>
      <Divider />
      <Row justify="center">
        <h1 style={{ textAlign: "center" }} >Marcas aliadas para redimir Efipuntos</h1>
      </Row>
      <Divider />
      {cardsList()}
    </>
  )
}

export default ChoseStoreForRedeem;