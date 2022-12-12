import React from "react";
import { Col, Divider, Row, Typography } from "antd";
import { wallet } from './testWallet';
import { code, storesLinks } from "./testCode";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const { Title, Link } = Typography;

const RedeemCode = () => {

  let { data } = useContext(AuthContext);

  const linkStyle = { 
    textAlign: "center", 
    width: "180px", 
    WebkitBorderRadius: "10px", 
    backgroundColor: "#f2f2f2", 
    fontSize: 20 
  };

  return (
    <>
      <Divider />
      <Row justify="center">
        <Col>
          <Title level={2} code copyable strong >{code}</Title>
        </Col>
      </Row>
      <Row justify="center">
        <Title strong level={3} italic >Codigo válido por: {wallet.available}</Title>
      </Row>
      <Divider />
      <Row justify="center">
        <Link strong style={linkStyle} href={storesLinks[data.storeToRedeem]}>Ir a la tienda</Link>
      </Row>
      <Divider />
    </>
  )
}

export default RedeemCode;