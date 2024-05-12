import React from 'react';
import RegistrationWizardContent from "./RegistrationWizardContent";
import {Field} from "formik";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";
const RegistrationWizardFormCredentials = ({errors}) => {
  return (
    <RegistrationWizardContent title='Add Credentials'>
      <div className="form-group">
        <label>Имэйл хаяг*</label>
        {formErrorMessage(errors.email)}
        <Field className="form-control" name="email" placeholder="someone@somthing.com"/>
      </div>
      <div className="form-group">
        <label>Нууц үг*</label>
        {formErrorMessage(errors.password)}
        <Field className="form-control" type='password' name="password" placeholder="********"/>
        <span className="form-text text-muted">
          8-аас багагүй нэг том үсэг нэг тоо заавал байх ёстой
        </span>
      </div>
      <div className="form-group">
        <label>Баталгаажуулах Нууц үг*</label>
        {formErrorMessage(errors.confirmPassword)}
        <Field className="form-control" type='password' name="confirmPassword" placeholder="********"/>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormCredentials;