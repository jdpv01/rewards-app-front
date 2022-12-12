import React, { useContext, useState } from "react";
import { Button, Col, List, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { PlusCircleOutlined } from "@ant-design/icons";

// products --> promotions
const ChoseProduct = () => {

  const { data, auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const URL = '/promotions/get-all-promotions';
  const URL_CREATE_INVOICE = '/invoices/create-invoice';

  const [selectedProducts, setSelectedProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const imagesLinks = {
    banano: "https://cdn.shopify.com/s/files/1/0492/2458/1274/products/76b6170a-f1e1-4a92-8622-cee94a659b91_512x512.png",
    cebolla: "https://cdn.shopify.com/s/files/1/0492/2458/1274/products/db50b41a-5198-4aa5-bdb3-189ac7dbe535_700x700.png",
    "Jamón Zenú": "https://exitocol.vtexassets.com/arquivos/ids/1975511-1200-auto?v=637259072024200000&width=1200&height=auto&aspect=true",
    "SALCHICHAS": "https://exitocol.vtexassets.com/arquivos/ids/5373680-1200-auto?v=637439180279600000&width=1200&height=auto&aspect=true",
    "CREMA COLGATE": "https://exitocol.vtexassets.com/arquivos/ids/13089212-1200-auto?v=637896231371430000&width=1200&height=auto&aspect=true",
    "Crema Axión": "https://exitocol.vtexassets.com/arquivos/ids/13171910-1200-auto?v=637899339258230000&width=1200&height=auto&aspect=true",
    "Jamón de cerdo": "https://exitocol.vtexassets.com/arquivos/ids/10656570-1200-auto?v=637711464288600000&width=1200&height=auto&aspect=true",
  }

  const fetchData = async () => {
    const { data } = await axios.get(URL, { headers: { Authorization: `Bearer ${accessToken}` } });
    const fetchedProducts = data.map(promotion => ({
      id: promotion.id,
      name: promotion.name,
      description: promotion.content,
      quantity: promotion.availableQuantity,
      savableCost: promotion.offeredPoints,
      img: imagesLinks[promotion.name],
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

  const handleFinish = async () => {
    let { invoice } = data;
    let formData = new FormData();
    formData.append('invoiceImage', invoice.invoiceImage ?? {});
    formData.append('userId', invoice.userId);
    formData.append('storeId', "a053803a-1181-4f91-855c-74841d7a2c0c");
    formData.append('promotionIdList', "5e21a137-adfa-4c00-a411-e3c13f18ed7c");
    /*Object.keys(invoice).map(key => {
      formData.append(key, invoice[key]);
    })*/
    console.log(formData);
    /*selectedProducts.forEach(selProduct => {
      formData.append('promotionIdList', selProduct);
    });*/
    //formData.append('promotionIdList', '5e21a137-adfa-4c00-a411-e3c13f18ed7c');
    console.log(formData);
    await axios.post(
      URL_CREATE_INVOICE,
      formData,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
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
                    const removed = selectedProducts.filter(sp => sp !== item.id);
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
            >
              <div style={{ textAlign: "center" }} >
                <img
                  width={200}
                  alt="product"
                  src={item.img}
                />
              </div>
              <List.Item.Meta
                title={<h3>{item.name}</h3>}
                description={item.description}
              />
              <>
                <p><label><strong>Cantidad disponible: </strong>{item.quantity}</label></p>
                <p><label><strong>Puntos ofrecidos: </strong>{item.savableCost}</label></p>
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