import React, { useContext, useState } from "react";
import { Button, Col, List, Row } from "antd";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const ChoseProduct = () => {

  const { data } = useContext(AuthContext);
  const [products] = useState(data.products);
  const navigate = useNavigate();

  const totalPoints = () => {
    const pointsPerProduct = products.map((product) => product.savableCost * product.quantity);
    const total = pointsPerProduct.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return total;
  }

  return (
    <Row justify="center" >
      <Col>
        <h1>Busca tu producto</h1>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={products}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={
                <img
                  width={200}
                  alt="product"
                  src={item.img}
                />
              }
            >
              <List.Item.Meta
                title={<h3>{item.name}</h3>}
                description={item.description}
              />
              <>
                <h5><strong>Cantidad: </strong>{item.quantity}</h5>
                <h5><strong>Puntos por unidad: </strong>{item.savableCost}</h5>
                <h5><strong>Puntos totales: </strong>{item.savableCost * item.quantity}</h5>
              </>
            </List.Item>
          )}
        />
        <h3>Total de puntos redimibles: {totalPoints()}</h3>
        <br />
        <br />
        <Row justify="center" >
          <Button onClick={() => { navigate('/wallet') }} type="primary" size="large" >Finalizar</Button>
        </Row>
        <br />
        <br />
      </Col>
    </Row>
  )
}

export default ChoseProduct;