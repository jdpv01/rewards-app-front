import { Button, Checkbox, Divider, Form, Input, message, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const SignUp = () => {

  const URL_SIGN_UP = '/auth/sign-up';
  const navigate = useNavigate();

  const onFinish = async (values) => { // values : { email, name, lastname, password }
    try {
      const res = await axios.post(URL_SIGN_UP, values);
      const { msg } = res.data;
      message.info(msg);
      navigate('/');
    } catch (err) {
      message.error('No se pudo crear el nuevo usuario!');
    }
  }

  const onFinishFailed = (_) => {
    message.error('error');
  }

  return (
    <Row justify="center">
      <Divider/>
      <Form
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            {
              required: true,
              message: 'Por favor introduzca su correo!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="name"
          rules={[
            {
              required: true,
              message: 'Por favor introduzca su nombre!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Apellido"
          name="lastname"
          rules={[
            {
              required: true,
              message: 'Por favor introduzca su apellido!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor introduzca su contraseña!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </Row>
  )
}

export default SignUp;