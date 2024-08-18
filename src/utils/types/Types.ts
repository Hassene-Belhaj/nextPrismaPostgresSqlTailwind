export interface IRegister {
  email: string;
  username: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IupdateUser {
  newEmail?: string;
  newUsername?: string;
  newPassword?: string;
}

export interface Ijwtpayload {
  id: number;
  email: string;
  isAdmin: boolean;
}
