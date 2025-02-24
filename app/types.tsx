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

export type FontGrade =
  | '3'
  | '4'
  | '4+'
  | '5'
  | '5+'
  | '6A'
  | '6A+'
  | '6B'
  | '6B+'
  | '6C'
  | '6C+'
  | '7A'
  | '7A+'
  | '7B'
  | '7B+'
  | '7C'
  | '7C+'
  | '8A'
  | '8A+'
  | '8B'
  | '8B+'
  | '8C'
  | '8C+'
  | '9A';

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
  grade: string;
  id: number;
}
