import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
/*import { Field, reduxForm } from "redux-form";
import { compose } from "redux";

import renderFormGroupField from "../../helpers/renderFormGroupField";
import { required, maxLength30, minLength8, emailValidation } from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebookF, faGoogle, } from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";*/
import { useRef, useState, useEffect } from 'react';
//import { auth, setAuth } from "../others/storageManager";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { Button, Checkbox, Form, Input, message } from "antd";

const LOGIN_URL = '/auth/sign-in'

const SignInForm = () => {

  const { setAuth } = useContext(AuthContext);
  //const emailRef = useRef();
  const errorRef = useRef();
  const [email] = useState('');
  const [password] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrorMessage('');
  }, [email, password])

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      const accessToken = response?.data?.token;
      const roles = response?.data?.roleList;
      setAuth({ email, roles, accessToken });
      setEmail('');
      setPassword('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrorMessage('No hay respuesta del servidor');
      } else if (err.response?.status === 400) {
        setErrorMessage('400: Email o contraseña incorrectos');
      } else if (err.response?.status === 401) {
        setErrorMessage('401: Cuenta no registrada');
      } else {
        setErrorMessage('Fallo de inicio de sesión');
      }
    }
  }*/

  const onFinish = async ({ email, password }) => {
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      //const accessToken = response?.data?.token;
      //const roles = response?.data?.roleList;
      const { token: accessToken, roles, id } = response?.data;
      setAuth({ id, email, roles, accessToken });
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrorMessage('No hay respuesta del servidor');
      } else if (err.response?.status === 400) {
        setErrorMessage('400: Email o contraseña incorrectos');
      } else if (err.response?.status === 401) {
        setErrorMessage('401: Cuenta no registrada');
      } else {
        setErrorMessage('Fallo de inicio de sesión');
      }
    }

  }

  const onFinishFailed = (errorInfo) => {
    message.error("error");
  }

  return (
    <>
      {success ? (
        <Navigate to="/"/>
      ) : (
        <>
          <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage} </p>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};

export default SignInForm;