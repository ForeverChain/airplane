import React from 'react';
import RegistrationWizardContent from "./RegistrationWizardContent";
import {Field} from "formik";
import {CustomInput} from "reactstrap";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";

const RegistrationWizardFormConfirm = ({errors}) => {
  return (
    <RegistrationWizardContent title='Баталгаажуулах'>
      <div className="form-group">
        {formErrorMessage(errors.agree)}
        <Field name="agree">
          {({field, ...props}) => (
            <CustomInput {...field} type="radio" value={'agree'} id="agree" label="Бүгдийн хүлээн зөвшөөрч байна" {...props}/>
          )}
        </Field>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormConfirm;