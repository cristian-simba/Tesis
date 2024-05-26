const emailValidator = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length > 0;
}

const codigoValidator = (value) => {
  return value.length >= 9;
}

const passwordValidator = (value) => {
  return value.length > 0;
}

export {emailValidator, codigoValidator, passwordValidator}