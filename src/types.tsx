export interface IRegisterUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface ILoginUserData {
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  id: number;
  phoneNumber: string;
  token: string;
  createdAt: string;
}
