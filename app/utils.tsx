import * as SecureStore from 'expo-secure-store';
import { GradeStyle } from './types';

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
    case 'location':
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

const fontClimbingGrades = [
  '4a',
  '4b',
  '4c',
  '5a',
  '5b',
  '5c',
  '6a',
  '6a+',
  '6b',
  '6b+',
  '6c',
  '6c+',
  '7a',
  '7a+',
  '7b',
  '7b+',
  '7c',
  '7c+',
  '8a',
  '8a+',
  '8b',
  '8b+',
  '8c',
  '8c+',
  '9a',
  '9a+',
  '9b',
  '9b+',
  '9c',
];

const vScaleGrades = [
  'V0',
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
  'V7',
  'V8',
  'V9',
  'V10',
  'V11',
  'V12',
  'V13',
  'V14',
  'V15',
  'V16',
  'V17',
];

export const getClimbingGrades = (gradeStyle: GradeStyle) => {
  switch (gradeStyle) {
    case 'V Scale':
      return vScaleGrades;
    case 'Font Scale':
      return fontClimbingGrades;
  }
};
