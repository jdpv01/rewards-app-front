import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
//import AuthContext from "../context/AuthProvider";
import { Button, Col, Dropdown, Row, Typography } from 'antd';
import { BellOutlined, InfoCircleOutlined, LogoutOutlined, StarOutlined, UploadOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";
//import { auth as authX, setAuth as setAuthX } from "./others/storageManager";
import '../index.css';
import AuthContext from "../context/AuthProvider";
//import { useEffect } from "react";

const { Title } = Typography;

const HeaderView = () => {

  const navigate = useNavigate();

  const { auth, setData, setAuth } = useContext(AuthContext);
  /*const [auth, setAuth] = useState(authX);
  useEffect(() => {
    setAuthX(auth);
  }, [auth]);*/

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem('Perfil', 'profile', <UserOutlined color="blue" />),
    getItem('Subir factura', 'choseStore', <UploadOutlined />),
    getItem('Notificaciones', 'notification', <BellOutlined />),
    getItem('Ayuda', 'support', <InfoCircleOutlined />),
    getItem('Salir', 'logout', <LogoutOutlined />),
  ]

  const mapKeysToUrl = {
    profile: Object.keys(auth).length !== 0 ? "/account/profile" : '/account/signin',
    choseStore: "/account/choseStore",
    notification: "/account/notification",
    support: "/support",
  }

  const menuOnClickHandler = ({ key }) => {
    if (key === 'logout') {
      setAuth({});
      setData({});
      navigate('/');
    } else {
      navigate(mapKeysToUrl[key]);
    }
  }

  const menuProps = {
    items,
    onClick: menuOnClickHandler
  }

  return (
    <>
      <Row style={{ marginTop: "10px", marginBottom: "10px" }} justify="center" align="middle" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col>
          <Button type="link" onClick={() => navigate('/')} >
            <Row>
              <img width={75} src="../../images/logo.png" alt="logo" />&nbsp;&nbsp;<Title style={{ fontFamily: "Josefin Sans, sans serif;" }}>EFI Puntos</Title>
            </Row>
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            size="large"
            shape="circle"
            icon={<WalletOutlined />}
            onClick={() => navigate('/wallet')}
          />
        </Col>
        <Col>
          <Dropdown menu={menuProps} >
            <Button size="large" shape="circle" icon={<UserOutlined />} />
          </Dropdown>
        </Col>
        {
          (Object.keys(auth).length === 0) &&
          <>
            <Col>
              <Button style={{ width: "70px" }} onClick={() => navigate("/account/signin")} type="default" >Entrar</Button>
            </Col>
            <Col>
              <Button style={{ width: "100px" }} onClick={() => navigate("/account/signup")} type="default" >Registrarse</Button>
            </Col>
          </>
        }
      </Row>
    </>
  )
};
export default HeaderView;
