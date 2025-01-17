export type InputErrorKeys = "firstName" | "lastName" | "email" | "password";

export type InputType = "firstName" | "lastName" | "email" | "password";

export interface IUser {
  location: string;
  first_name: string;
  last_name: string;
  email: string;
  id: number;
  created_at: Date;
  home_gym: string;
}
