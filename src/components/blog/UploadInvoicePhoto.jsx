import React, { useContext } from "react";
import { ReactComponent as IconCameraFill } from "bootstrap-icons/icons/camera-fill.svg";
import { useState } from "react";
import Webcam from "react-webcam";
import { useEffect } from "react";
import UploadFile from "../others/UploadFile";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { testProducts } from "./testdata";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";

const UploadInvoicePhoto = () => {

  const { data, setData, auth } = useContext(AuthContext);
  const { accessToken, id: userId } = auth;

  const URL = '/invoices/create-invoice';

  const [displayWebcam, setDisplayWebcam] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState();
  const [currentFileInvoice, setCurrentFileInvoice] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setData({ ...data, currentInvoice });
  }, [currentInvoice]);

  const ScreenshotButton = ({ getScreenshot }) => (
    <>
      <br /><br />
      <Button onClick={() => {
        const imageSrc = getScreenshot();
        setCurrentInvoice(imageSrc);
      }}>
        Capturar
      </Button>
    </>
  )

  const videoConstraints = {
    height: 360,
    facingMode: "environment",
  }

  const WebcamCapture = () => {

    return (
      <>
        {!currentInvoice ?
          <>
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            >
              {ScreenshotButton}
            </Webcam>
          </>
          :
          <>
            <img height="360px" src={currentInvoice} alt="screenshot" />
            <br />
            <br />
            <Button type="dashed" onClick={() => setCurrentInvoice(null)}>Tomar de nuevo</Button>
          </>
        }
      </>
    )
  };

  const handleFinish = async () => {
    if (!currentInvoice) {
      message.error('No se ha cargado ninguna factura');
      return;
    }
    try {
      let data = new FormData();
      data.append('invoiceImage', currentFileInvoice ?? {});
      data.append('userId', userId);
      data.append('storeId', "a053803a-1181-4f91-855c-74841d7a2c0c");
      data.append('promotionIdList', "5e21a137-adfa-4c00-a411-e3c13f18ed7c");
      await axios.post(
        URL,
        data,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      //setData({ ...data, products: testProducts });
      navigate('/choseProduct');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <br />
      <h1><strong>Subir Factura</strong></h1>
      <br />
      <UploadFile onUpload={(url) => setCurrentInvoice(url)} setFileObj={setCurrentFileInvoice} />
      <br />
      <br />
      <h2>Ó</h2>
      <br />
      <IconCameraFill onClick={() => setDisplayWebcam(!displayWebcam)} style={{ width: "100px", height: "100px" }} />
      <div>
        {displayWebcam &&
          <WebcamCapture />
        }
      </div>
      <br />
      <br />
      <Button onClick={handleFinish} type="primary">Subir</Button>
      <br />
      <br />
    </div>
  )
}

export default UploadInvoicePhoto;