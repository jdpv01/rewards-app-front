import React, {lazy, Component, useContext} from "react";
import {Link, Navigate} from "react-router-dom";

const SignInForm = lazy(() => import("../../components/account/SignInForm"));

class SignInView extends Component {
  onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };

  render() {
    return (
        <div className="container my-3">
          <div className="row border">
            <div className="col-md-6 bg-light bg-gradient p-3 d-none d-md-block">
              <Link to="/">
                <img
                    src="../../images/banner/Super-Promo.webp"
                    alt="..."
                    className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-md-6 p-3">
              <h4 className="text-center">Iniciar sesión</h4>
              <SignInForm onSubmit={this.onSubmit} />
            </div>
          </div>
        </div>
    );
  }
}

export default SignInView;
