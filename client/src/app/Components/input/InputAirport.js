import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { Field } from "formik";
import { countries } from "../../../utils/countries";

const InputAirports = ({ field }) => {
  console.log("countries", countries)
  return (
    <Field>
      {({ form: { setFieldValue, values } }) => {
        const handleChangeA = (event, value) => {
          setFieldValue(field, value?.code);
        };
        return (
          <Autocomplete
            onChange={handleChangeA}
            options={countries}
            autoHighlight
            getOptionLabel={option => option.name}
            renderOption={option => (
              <React.Fragment>
                {option.name} ({option.code})
              </React.Fragment>
            )}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                margin="dense"
                // value={values.country}
                inputProps={{
                  ...params.inputProps
                }}
              />
            )}
          />
        );
      }}
    </Field>
  );
};

export default InputAirports;
