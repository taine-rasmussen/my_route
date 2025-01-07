export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInputErrorMessage = (inputType: string): string => {
  switch (inputType) {
    case "firstName":
      return "Required";
    case "lastName":
      return "Required";
    case "email":
      return "Invalid email address";
    case "password":
      return "Invalid password";
    default:
      return "Invalid input";
  }
};
