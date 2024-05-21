const errorMessages = {
  login:
    'Login must start with a letter and contain only alphanumeric characters, hyphens, or underscores. Length: 3 to 20 characters.',
  password: 'Password must contain at least one letter, one number, and be at least 8 characters long.',
  confirmPassword: 'Passwords do not match.',
  email: 'Please enter a valid email address.',
  phone: 'Phone number must contain only numbers and be at least 11 digits long. It can start with a plus sign.',
  name: 'Invalid name.',
  message: 'Message is required.',
};

const validateLogin = (login: string): boolean => {
  const regex = /^[a-zA-Z][a-zA-Z0-9-_]{2,19}$/;
  return regex.test(login);
};

const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const regex = /^\+?[0-9]{11,}$/;
  return regex.test(phone);
};

const validateName = (name: string): boolean => {
  const regex = /^[a-zA-Z][a-zA-Z-]{0,19}$/;
  return regex.test(name);
};

const validateConfirmPassword = (password: string, confirmPassword: string): boolean =>
  !!confirmPassword && password === confirmPassword;

const validateMessage = (message: string): boolean => message.length > 0;

const validate = (value: Record<string, string>, type: string): string | null => {
  switch (type) {
    case 'login':
      return validateLogin(value.login) ? null : errorMessages.login;
    case 'password':
      return validatePassword(value.password) ? null : errorMessages.password;
    case 'confirmPassword':
      return validateConfirmPassword(value.oldPassword, value.newPassword) ? null : errorMessages.confirmPassword;
    case 'email':
      return validateEmail(value.email) ? null : errorMessages.email;
    case 'phone':
      return validatePhone(value.phone) ? null : errorMessages.phone;
    case 'firstName':
      return validateName(value.firstName) ? null : errorMessages.name;
    case 'secondName':
      return validateName(value.secondName) ? null : errorMessages.name;
    case 'chatName':
      return validateName(value.chatName) ? null : errorMessages.name;
    case 'message':
      return validateMessage(value.message) ? null : errorMessages.message;
    default:
      return null;
  }
};

export default validate;
