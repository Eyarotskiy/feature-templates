export type LoginField = string;

export type PasswordField = string;

export type Token = string;

export interface UserData {
	id: string,
	name: string,
	username: string,
	website: string,
}

export interface LoginForm {
	login: 	LoginField,
	password: PasswordField,
}

export interface DishData {
	_id: string,
	creation_date: Date,
	name: string,
}

export interface DishName {
	dishName: string,
}

export interface DishUpdateData {
	oldDishName: string,
	newDishName: string,
}

// React component props

export interface MenuProps {
	menu: DishData[],
}

export interface UsersProps {
	users: UserData[],
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

// Redux instances

export interface ReduxState {
	loginReducer: LoginReducer,
	userReducer: UserReducer,
}

export interface UserReducer {
	users: UserData[],
}

export interface LoginReducer {
	isLoggedIn: boolean,
}
