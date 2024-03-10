export interface IRegisterUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface IUser {
  email: string;
  id: number;
  name: string;
  phoneNumber: string;
  token: string;
}
