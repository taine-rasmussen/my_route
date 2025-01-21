import * as SecureStore from 'expo-secure-store';

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInputErrorMessage = (inputType: string): string => {
  switch (inputType) {
    case 'firstName':
      return 'Required';
    case 'lastName':
      return 'Required';
    case 'email':
      return 'Invalid email address';
    case 'password':
      return 'Invalid password';
    default:
      return 'Invalid input';
  }
};

export const saveToSecureStore = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`${key} saved successfully.`);
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

export const getFromSecureStore = async (key: string) => {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      console.log(`${key} retrieved successfully.`);
    } else {
      console.log(`${key} not found.`);
    }
    return result;
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
  }
};

export const deleteFromSecureStore = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`${key} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting ${key}:`, error);
  }
};
