export const validateEmail = (email) => {
  const EMAILREGEX = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );
  if (email.length === 0) return null;
  if (EMAILREGEX.test(email)) return true;
  return false;
};

export const validatePassword = (pass) => {
  return pass.length > 7 ? true : pass.length === 0 ? null : false;
};

export const validatePasswordRegister = (pass) => {
  const PASSREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/; // second way to create a regular expresion
  if (pass.length === 0) return null;
  if (PASSREGEX.test(pass)) return true;
  return false;
};

export const validateUserName = (name) => {
  const NAMEREGEX = new RegExp('^[a-zA-Z ]*$', 'g');
  if (name.length === 0) return null;
  if (NAMEREGEX.test(name)) return true;
  return false;
};

export const checkPassword = (pass, passToCheck) => {
  if (passToCheck.length === 0) return null;
  if (passToCheck === pass) return true;
  return false;
};
