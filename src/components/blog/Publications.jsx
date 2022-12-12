import React from "react";
import { Avatar, List, Input, Row, Col } from "antd";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { testData } from "./testPublications";
const { Search } = Input;

const Publications = () => {

  const { auth } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const USERS_URL = 'https://randomuser.me/api/?results=5&inc=name,email,picture&noinfo';

  useEffect(() => {
    axios.get(USERS_URL).then(res => {
      const users = res.data.results;
      setData(testData(users));
    });
  }, []);

  const getComments = (index) => (
    <>
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={data[index].comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              avatar={comment.avatar}
              title={comment.name}
              description={comment.content}
            />
          </List.Item>
        )}
      />
      <Search
        placeholder="..."
        allowClear
        enterButton="Enviar"
        size="middle"
        onSearch={(value) => {
          if (!value) return;
          let comments = [...data[index].comments];
          comments.push({
            avatar: <Avatar>{auth.email[0].toUpperCase()}</Avatar>,
            name: "Yo",
            content: value,
          });
          let newData = [...data];
          newData[index].comments = comments;
          setData(newData);
        }}
      />
    </>
  )

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          key={item.id}
        >
          <div>
            <List.Item.Meta
              title={<a href={item.link} ><h3>{item.title}</h3></a>}
              description={item.description}
            />
            <img
              width={272}
              alt="product"
              src={item.image}
            />
          </div>
          <p><label>Oferta disponible hasta el comentario N°: {item.availableQuantity}</label></p>
          <p><label>Puntos ofrecidos: {item.offeredPoints}</label></p>
          <p><label>Valido hasta: {item.validityDate}</label></p>
          {getComments(index)}
        </List.Item>
      )}
    />
  )
}

export default Publications;