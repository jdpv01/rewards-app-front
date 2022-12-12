import { Button, Card, Divider, Row } from "antd";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const ChoseStoreForRedeem = () => {

  const { data, setData } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const storesInfo = [
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
      img: "https://domiciliomercamio.com/static/media/logo.cfffb0b9.svg",
    },
  ]

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
                  src={storeInfo.img}
                />
              </Row>
            }
            actions={[
              <Button
                onClick={() => {
                  setData({...data, storeToRedeem: storeInfo.id});
                  navigate('/redeem/code');
                }}
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