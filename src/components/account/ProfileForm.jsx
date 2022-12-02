import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormFileInput from "../../helpers/renderFormFileInput";
import { required, maxLengthMobileNo, minLengthMobileNo, digit, nameValidation, emailValidation} from "../../helpers/validation";
import { ReactComponent as IconPerson } from "bootstrap-icons/icons/person.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconEnvelop } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconCalendarEvent } from "bootstrap-icons/icons/calendar-event.svg";
import { ReactComponent as IconPersonSquareFill } from "bootstrap-icons/icons/person-lines-fill.svg";

const ProfileForm = (props) => {
  const {
    handleSubmit,
    submitting,
    onSubmit,
    submitFailed,
    onImageChange,
    imagePreview,
  } = props;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="card border-primary">
        <h6 className="card-header">
          <IconPersonSquareFill /> Perfil
        </h6>
        <img
          src={imagePreview ? imagePreview : "../../images/NO_IMG.png"}
          alt=""
          className="card-img-top rounded-0 img-fluid bg-secondary"
        />
        <div className="card-body">
          <Field
            name="formFile"
            component={renderFormFileInput}
            onImageChange={onImageChange}
            validate={[required]}
            tips="5MB o menos"
          />
          {/*<p className="card-text">*/}
          {/*  With supporting text below as a natural lead-in to additional*/}
          {/*  content.*/}
          {/*</p>*/}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Field
                name="email"
                type="email"
                component={renderFormGroupField}
                placeholder="Email"
                icon={IconEnvelop}
                validate={[required, emailValidation]}
                required={true}
                disabled={true}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="name"
              type="text"
              component={renderFormGroupField}
              placeholder="Nombre"
              icon={IconPerson}
              validate={[required, nameValidation]}
              required={true}
            />
          </li>
          <li className="list-group-item">
            <Field
                name="name"
                type="text"
                component={renderFormGroupField}
                placeholder="Apellido"
                icon={IconPerson}
                validate={[required, nameValidation]}
                required={true}
            />
          </li>
          <li className="list-group-item">
            <select className="form-select" required name="gender" >
              <option value>Género</option>
              <option>Masculino</option>
              <option>Femenino</option>
            </select>
          </li>
          <li className="list-group-item">
            <Field
              name="mobileNo"
              type="number"
              component={renderFormGroupField}
              placeholder="Teléfono"
              icon={IconPhone}
              validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
              required={true}
              max="999999999999999"
              min="9999"
            />
          </li>
          <li className="list-group-item">
            <Field
              name="birthdate"
              type="text"
              onChange={(e) => console.log(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              component={renderFormGroupField}
              placeholder="Fecha de nacimiento"
              icon={IconCalendarEvent}
              validate={[required]}
              required={true}
            />
          </li>
          {/*<li className="list-group-item">*/}
          {/*  <Field*/}
          {/*      name="location"*/}
          {/*      type="text"*/}
          {/*      component={renderFormGroupField}*/}
          {/*      placeholder="Your location"*/}
          {/*      icon={IconGeoAlt}*/}
          {/*      validate={[required]}*/}
          {/*      required={true}*/}
          {/*  />*/}
          {/*</li>*/}
        </ul>
        <div className="card-body">
          <button
            type="submit"
            className="btn btn-primary  d-flex"
            disabled={submitting}
          >
            Actualizar
          </button>
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "profile",
  })
)(ProfileForm);
