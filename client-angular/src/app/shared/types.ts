export interface LoginFormErrorFlags {
  commonError: boolean,
  emailConfirmationError: boolean,
  incorrectPasswordError: boolean,
  loginUserExistsError: boolean,
  registrationUserExistsError: boolean,
}

export interface ErrorResponse {
  code: number,
  message: string,
  stack?: string,
  data?: object|null,
}

export interface UserData {
  id: string,
  name: string,
  username: string,
  website: string,
}

export interface LoginData {
  login: string,
  password: string,
}

export interface DishData {
  _id: string,
  creation_date: Date,
  name: string,
}

export interface DishUpdateData {
  oldDishName: string,
  newDishName: string,
}

// API responses

export interface UsersResponse {
  users: string[],
}

export interface SignInResponse {
  token: string,
}

export interface AuthenticationResponse {
  login: string,
  newToken: string,
}

export interface FileUploadResponse {
  url: string,
}
