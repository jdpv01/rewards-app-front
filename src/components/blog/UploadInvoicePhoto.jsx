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

const UploadInvoicePhoto = () => {

  const { data, setData } = useContext(AuthContext);
  
  const [displayWebcam, setDisplayWebcam] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setData({...data, currentInvoice});
  }, [currentInvoice, data, setData]);

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

  const handleFinish = () => {
    if (!currentInvoice) {
      message.error('No se ha cargado ninguna factura');
      return;
    }
    setData({...data, products: testProducts});
    navigate('/choseProduct');
  }

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <br />
      <h1><strong>Subir Factura</strong></h1>
      <br />
      <UploadFile onUpload={(url) => setCurrentInvoice(url)} />
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