import React from 'react';
import {Field} from 'formik'
import RegistrationWizardContent from "./RegistrationWizardContent";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";
import InputCountry from "../../input/InputCountry";
const RegistrationWirzardFormAddress = ({errors}) => {

  return (
    <RegistrationWizardContent title="Хаягаа оруулна уу">
      <div className="form-group">
        <label>Хаяг*</label>
        {formErrorMessage(errors.address)}
        <Field className="form-control" name="address" placeholder="Хаяг" required/>
        <span className="form-text text-muted">Хаягаа оруулна уу</span>
      </div>
      <div className="form-group">
        <label>Улс*</label>
        {formErrorMessage(errors.country)}
        <InputCountry/>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWirzardFormAddress;