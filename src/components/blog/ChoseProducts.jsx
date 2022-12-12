import React, { useContext, useState } from "react";
import { Button, Col, List, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { PlusCircleOutlined } from "@ant-design/icons";

// products --> promotions
const ChoseProduct = () => {

  const { data, setData, auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const URL = '/promotions/get-all-promotions';

  const [selectedProducts, setSelectedProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(URL, { headers: { Authorization: `Bearer ${accessToken}` } });
    const fetchedProducts = data.map(promotion => ({
      id: promotion.id,
      name: promotion.name,
      description: promotion.content,
      quantity: promotion.availableQuantity,
      savableCost: promotion.offeredPoints,
      img: promotion.image,
    }));
    setProducts(fetchedProducts);
    setShowProducts(fetchedProducts);
  }

  const getOptions = () => {
    let options = products.map(product => ({
      value: product.id,
      label: product.name,
    }))
    options.push({
      value: 'all',
      label: 'Todos',
    });
    return options;
  }

  const handleSelect = (chosenProduct) => {
    if (chosenProduct === 'all') {
      setShowProducts(products);
      return;
    }
    const toShow = products.filter(product => product.id === chosenProduct);
    setShowProducts(toShow);
  }

  const handleFinish = () => {
    setData({...data, selectedProducts});
    navigate('/wallet');
  }

  return (
    <Row justify="center" >
      <Col>
        <h1>Busca tu producto</h1>
        <Select
          onSelect={handleSelect}
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={getOptions()}
        />
        <List
          itemLayout="vertical"
          size="large"
          dataSource={showProducts}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Button
                  onClick={() => {
                    setSelectedProducts([...selectedProducts, item.id]);
                  }}
                  disabled={
                    selectedProducts.some(selectedProduct => selectedProduct === item.id)
                  }
                  type="dashed"
                  icon={<PlusCircleOutlined />}
                >
                  Agregar
                </Button>,
                <Button
                  onClick={() => {
                    const removed = selectedProducts.filter( sp => sp !== item.id);
                    setSelectedProducts(removed);
                  }}
                  disabled={
                    !selectedProducts.some(selectedProduct => selectedProduct === item.id)
                  }
                  type="dashed"
                  icon={<PlusCircleOutlined />}
                >
                  Quitar
                </Button>

              ]}
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
                <h5><strong>Cantidad disponible: </strong>{item.quantity}</h5>
                <h5><strong>Puntos ofrecidos: </strong>{item.savableCost}</h5>
              </>
            </List.Item>
          )}
        />
        <br />
        <br />
        <Row justify="center" >
          <Button onClick={handleFinish} type="primary" size="large" >Finalizar</Button>
        </Row>
        <br />
        <br />
      </Col>
    </Row>
  )
}

export default ChoseProduct;