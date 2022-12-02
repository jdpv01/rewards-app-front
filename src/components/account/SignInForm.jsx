import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import {Link, Navigate} from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import {required, maxLength30, minLength8, emailValidation} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter, faFacebookF, faGoogle,} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";

const LOGIN_URL = '/auth/sign-in'

const SignInForm = () => {
  const { setAuth } = useContext(AuthContext)
  const emailRef = useRef();
  const errorRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrorMessage('');
  }, [email, password])

  const handleSubmit = async (e) => {
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
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accessToken });
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
  }

  return (
      <>
        {success ? (
            <Navigate to={"/"} />
        ) : (
        <form
          onSubmit={handleSubmit}
        >
          <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"}
             aria-live="assertive">{errorMessage}</p>
          <Field
            name="email"
            type="email "
            label="Email"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            component={renderFormGroupField}
            placeholder="Email"
            icon={IconEnvelope}
            validate={[required, emailValidation]}
            required={true}
            className="mb-3"
          />
          <Field
            name="contraseña"
            type="password"
            label="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLock}
            validate={[required, maxLength30, minLength8]}
            required={true}
            maxLength="30"
            minLength="8"
            className="mb-3"
          />
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary mb-3"
            >
              Entrar
            </button>
          </div>
          <Link className="float-start" to="/account/signup" title="Sign Up">
            Crear una cuenta nueva
          </Link>
          <Link
            className="float-end"
            to="/account/forgotpassword"
            title="Forgot Password"
          >
            Olvidé mi contraseña
          </Link>
          <div className="clearfix"></div>
          <hr></hr>
          <div className="row">
            <div className="col- text-center">
              <p className="text-muted small">Entrar con</p>
            </div>
            <div className="col- text-center">
              <Link to="/" className="btn btn-light text-white bg-twitter me-3">
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link to="/" className="btn btn-light text-white me-3 bg-facebook">
                <FontAwesomeIcon icon={faFacebookF} className="mx-1" />
              </Link>
              <Link to="/" className="btn btn-light text-white me-3 bg-google">
                <FontAwesomeIcon icon={faGoogle} className="mx-1" />
              </Link>
            </div>
          </div>
        </form>
        )}
      </>
  );
};

export default compose(
  reduxForm({
    form: "signin",
  })
)(SignInForm);
