import React, {useEffect, useRef, useState} from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import {Link, Navigate} from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";
import { required, maxLength30, minLength8, nameValidation, emailValidation } from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";

const REGISTER_URL = '/auth/sign-up'
const NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUpForm = () => {
  const nameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const matchPasswordRef = useRef();
  const emailRef = useRef();
  const errorRef = useRef();

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, [])

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name])

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(lastName));
  }, [lastName])

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword])

  useEffect(() => {
    setErrorMessage('');
  }, [name, lastName, email, password, matchPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(REGISTER_URL,
          JSON.stringify({ name, lastName, email, password }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setName('');
      setLastName('');
      setPassword('');
      setMatchPassword('');
    } catch (err) {
      if (!err?.response) {
        setErrorMessage('No hay respuesta del servidor');
      } else if (err.response?.status === 409) {
        setErrorMessage('El email ya está en uso');
      } else {
        setErrorMessage('Registro falló')
      }
      // errRef.current.focus();
    }
  }

  return (
      <>
        {success ? (
            <Navigate to={"/account/signin"} />
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"}
               aria-live="assertive">{errorMessage}</p>
            <div className="row mb-3">
              <div className="col-md-6">
                <Field
                  name="firstName"
                  type="text"
                  label="Nombre"
                  ref={nameRef}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  component={renderFormField}
                  placeholder="Nombre"
                  validate={[required, nameValidation]}
                  required={true}
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                />
              </div>
              <div className="col-md-6">
                <Field
                  name="lastName"
                  type="text"
                  label="Apellido"
                  ref={lastNameRef}
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  component={renderFormField}
                  placeholder="Apellido"
                  validate={[required, nameValidation]}
                  required={true}
                  onFocus={() => setLastNameFocus(true)}
                  onBlur={() => setLastNameFocus(false)}
                />
              </div>
            </div>
            <Field
              name="email"
              type="email"
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
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <Field
              name="password"
              type="password"
              label="Contraseña"
              ref={passwordRef}
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
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <Field
                name="matchPassword"
                type="password"
                label="Repita la contraseña"
                ref={matchPasswordRef}
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                component={renderFormGroupField}
                placeholder="******"
                icon={IconShieldLock}
                validate={[required, maxLength30, minLength8]}
                required={true}
                maxLength="30"
                minLength="8"
                className="mb-3"
                onFocus={() => setMatchPasswordFocus(true)}
                onBlur={() => setMatchPasswordFocus(false)}
            />
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary mb-3"
                // disabled={submitting}
              >
                Crear una cuenta
              </button>
            </div>
            <Link className="float-start" to="/account/signin" title="Sign In">
              Iniciar sesión
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
    form: "signup",
  })
)(SignUpForm);
