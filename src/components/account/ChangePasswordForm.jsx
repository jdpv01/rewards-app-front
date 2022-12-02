import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { required, maxLength30, minLength8 } from "../../helpers/validation";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { ReactComponent as IconKey } from "bootstrap-icons/icons/key.svg";

const ChangePasswordForm = (props) => {
  const { handleSubmit, submitting, onSubmit, submitFailed } = props;
  return (
    <div className="card border-info">
      <h6 className="card-header bg-info text-white">
        <IconKey /> Cambiar Contraseña
      </h6>
      <div className="card-body">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
          noValidate
        >
          <Field
            name="currentPassword"
            type="password"
            label="Contraseña actual"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLock}
            validate={[required, maxLength30, minLength8]}
            required={true}
            maxLength="30"
            minLength="8"
            className="mb-3"
          />
          <Field
            name="password"
            type="password"
            label="Contraseña nueva"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLock}
            validate={[required, maxLength30, minLength8]}
            required={true}
            maxLength="30"
            minLength="8"
            className="mb-3"
          />
          <Field
            name="confirmPassword"
            type="password"
            label="Confirmar contraseña nueva"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLock}
            validate={[required, maxLength30, minLength8]}
            required={true}
            maxLength="30"
            minLength="8"
            className="mb-3"
          />
          <button
            type="submit"
            className="btn btn-info  d-flex"
            disabled={submitting}
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default compose(
  reduxForm({
    form: "changepassword",
  })
)(ChangePasswordForm);
