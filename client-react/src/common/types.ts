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

export interface UsersState {
	value: UserData[],
}

export interface LoginState {
	value: boolean,
}
