import React from "react";
import { Field } from "formik";
import RegistrationWizardContent from "./RegistrationWizardContent";
import { formErrorMessage } from "../../../pages/errors/FormErrorMessage";

const RegistrationWizardFormPInfo = ({ errors }) => {
  return (
    <RegistrationWizardContent title="Хувийн мэдээллээ оруулна уу">
      <div className="form-group">
        <label>Өөрийн нэр*</label>
        {formErrorMessage(errors.firstName)}
        <Field
          className="form-control"
          name="firstName"
          placeholder="Өөрийн нэр"
          required
        />
        <span className="form-text text-muted">
          Өөрийн нэр
        </span>
      </div>
      <div className="form-group">
        <label>Овог*</label>
        {formErrorMessage(errors.lastName)}
        <Field
          className="form-control"
          name="lastName"
          placeholder="Овог"
          required
        />
        <span className="form-text text-muted">
          Овогоо оруулна уу
        </span>
      </div>
      <div className="form-group">
        <label>Утасны дугаар*</label>
        {formErrorMessage(errors.mobileNo)}
        <Field
          className="form-control"
          name="mobileNo"
          placeholder="XXXXXXXXX"
          required
        />
        <span className="form-text text-muted">
          Утасны дугаараа оруулна уу
        </span>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormPInfo;
