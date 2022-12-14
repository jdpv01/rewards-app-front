import React from "react";
import { Button, Card, Divider, message, Row } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../api/axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const { Meta } = Card;

const Wallet = () => {

  const { auth } = useContext(AuthContext);
  const { accessToken, id } = auth;
  const [wallet, setWallet] = useState({});
  const URL = '/users/get-user';

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const response = await axios.get(
        `${URL}?id=${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      const { currentPoints, pendingPoints, redeemedPoints } = response.data;
      setWallet(
        { 
          available: currentPoints, 
          pending: pendingPoints, 
          redeemed: redeemedPoints 
        }
      );
    } catch (err) {
      message.error('failed');
    }
  }

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