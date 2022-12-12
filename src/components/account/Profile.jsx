import { Button, Form, Input, message, Row } from "antd";
import React from "react";
import { useState } from "react";

const Profile = () => {

  const [editing, setEditing] = useState(false);

  const defaultUser = {
    name: "Pedro",
    lastname: "Tabares",
    sex: "Masculino",
    birthdate: "15/10/1980",
    phoneNumber: "+57 3016558012",
  }

  const mapKeysToLabels = {
    name: "Nombre",
    lastname: "Apellido",
    sex: "Sexo",
    birthdate: "Fecha de nacimiento",
    phoneNumber: "Numero de telefono",
  }

  const userInfoFields = () => {
    return Object.keys(defaultUser).map(field => (
      <Form.Item label={mapKeysToLabels[field]} name={field} >
        <Input disabled={!editing} size="large" defaultValue={defaultUser[field]} />
      </Form.Item>
    ));
  }

  const onFinish = (values) => {
    console.log(values);
    message.info("success");
  }

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    message.error('error');
  }

  return (
    <>
      <Row justify="center">
        <Form
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          {userInfoFields()}
          {
            editing &&
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 20,
              }}
            >
              <Button type="primary" htmlType="submit">
                Guardar cambios
              </Button>
            </Form.Item>
          }
        </Form>
      </Row>
      <Row justify="center">
        <Button onClick={() => setEditing(!editing)} >{!editing ? "Editar": "Dejar de editar"}</Button>
      </Row>
    </>

  )
}
export default Profile;