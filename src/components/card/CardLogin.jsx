import React from "react";
import { Link } from "react-router-dom";

const CardLogin = (props) => {
  return (
    <div className={`card shadow-sm ${props.className}`}>
      <div className="card-body text-center">
        <h5 className="card-title">Inicia sesión para una mejor experiencia!</h5>
        <Link to="account/signin" className="btn btn-warning">
          Entrar
        </Link>
      </div>
    </div>
  );
};

export default CardLogin;
