export const worldTourCreateValidations = values => {
  const errors = {};

  if (!values.origin) {
    errors.origin = "Required!";
  }

  if (!values.destination) {
    errors.destination = "Required!";
  }
  if (!values.length) {
    errors.length = "Required!";
  }
  if (!values.depart) {
    errors.depart = "Required!";
  }
  if (!values.price) {
    errors.price = "Required!";
  } else if (values.price > 999999) {
    errors.price =
      "Price should not exceed Rs 999,999! (with development key)";
  }
  if (!values.image) {
    errors.packageDescription = "Required!";
  }
 
  return errors;
};
export const umrahDealsCreateValidations = values => {
  const errors = {};

  if (!values.packageTitle) {
    errors.packageTitle = "Required!";
  }
  if (!values.numberOfPeople) {
    errors.numberOfPeople = "Required!";
  }
  if (!values.numberOfDays) {
    errors.numberOfDays = "Required!";
  }
  if (!values.packagePrice) {
    errors.packagePrice = "Required!";
  } else if (values.packagePrice > 999999) {
    errors.packagePrice =
      "Price should not exceed Rs 999,999! (with development key)";
  }
  if (!values.packageDescription) {
    errors.packageDescription = "Required!";
  }
  if (!values.packageImage) {
    errors.packageImage = "Required!";
  }

  return errors;
};
