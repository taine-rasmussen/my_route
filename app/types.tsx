export type InputErrorKeys =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'location'
  | 'homeGym'
  | 'currentPassword'
  | 'newPassword'
  | 'confirmNewPassword';

export type InputType =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'location'
  | 'homeGym';

export type VGrade =
  | 'VB'
  | 'V0'
  | 'V1'
  | 'V2'
  | 'V3'
  | 'V4'
  | 'V5'
  | 'V6'
  | 'V7'
  | 'V8'
  | 'V9'
  | 'V10'
  | 'V11'
  | 'V12'
  | 'V13'
  | 'V14'
  | 'V15'
  | 'V16'
  | 'V17';

export type FontGrades =
  | '1'
  | '2'
  | '3'
  | '4a'
  | '4b'
  | '4c'
  | '5a'
  | '5b'
  | '5c'
  | '6a'
  | '6a+'
  | '6b'
  | '6b+'
  | '6c'
  | '6c+'
  | '7a'
  | '7a+'
  | '7b'
  | '7b+'
  | '7c'
  | '7c+'
  | '8a'
  | '8a+'
  | '8b'
  | '8b+'
  | '8c'
  | '8c+'
  | '9a'
  | '9a+'
  | '9b'
  | '9b+'
  | '9c';

export type ThemePreference = 'system' | 'dark' | 'light';

export type GradeStyle = 'V Scale' | 'Font Scale';

export interface IUser {
  location: string;
  first_name: string;
  last_name: string;
  email: string;
  id: number;
  created_at: Date;
  home_gym: string;
  grade_style: GradeStyle;
}

export interface IClimbData {
  attempts: number;
  created_at: string;
  grade: VGrade;
  id: number;
}

export type SortOrder = 'newest' | 'oldest';
