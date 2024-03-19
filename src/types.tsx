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

export interface ICar {
  bodyType: string;
  carId: number;
  carMake: string;
  model: string;
  city: string;
  createdAt: string;
  desc: string;
  fuelType: string;
  imageUrls: string[] | null;
  mileage: number;
  price: number;
  updatedAt: string;
  year: string;
  user?: {
    email: string;
    name: string;
    phoneNumber: string;
  };
}

/* export interface ISingleCar {
  carId: number;
  bodyType: string;
  carMake: string;
  year: string;
  price: number;
  city: string;
  createdAt: string;
  desc: string;
  fuelType: string;
  imageUrls: string[] | null;
  mileage: number;
  updatedAt: string;
  user: {
    email: string;
    name: string;
    phoneNumber: string;
  };
} */
