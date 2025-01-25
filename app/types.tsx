export type InputErrorKeys =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'location'
  | 'homeGym';

export type InputType =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'location'
  | 'homeGym';

export type ThemePreference = 'system' | 'dark' | 'light';

export type GradeStyle = 'V Grade' | 'French';

export interface IUser {
  location: string;
  first_name: string;
  last_name: string;
  email: string;
  id: number;
  created_at: Date;
  home_gym: string;
}
