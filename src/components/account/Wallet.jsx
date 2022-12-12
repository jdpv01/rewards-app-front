import React from "react";
import { Button, Card, Divider, Row } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { wallet } from "./testWallet";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const Wallet = () => {

  const navigate = useNavigate();

  const cardsInfo = [
    {
      status: "Pendiente por aprobar",
      value: wallet.pending,
    },
    {
      status: "Efipuntos actuales",
      value: wallet.available,
    },
    {
      status: "Total retirado",
      value: wallet.redeemed,
    }
  ]

  const cover = (status) => {
    return (
      <>
        <h2 style={{ marginTop: "20px", textAlign: "center", height: "80px" }} >
          {status}
        </h2>
        <Divider />
      </>
    )
  }

  const customCards = () => {
    return cardsInfo.map(card => (
      <>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={cover(card.status)}
        >
          <Meta avatar={<DollarCircleOutlined />} title={<h3>{card.value}</h3>} />
        </Card>
        <Divider type="vertical" />
      </>
    ));
  }

  return (
    <>
      <Row justify="center" >
        <Divider />
        {customCards()}
        <Divider />
      </Row>
      <Row justify="center" >
        <h4>Recuerda que debes acumular 2000 Efipuntos para poder redimirlos.</h4>
      </Row>
      <Divider />
      <Row justify="center" >
        <Button size="large" type="primary" onClick={() => navigate('/redeem/choseStore')} >
          Redimir Efipuntos
        </Button>
      </Row>
      <Divider />
    </>
  )
}

export default Wallet;