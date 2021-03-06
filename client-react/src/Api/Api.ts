import axios, {AxiosResponse} from 'axios';
import {
	AuthenticationResponse,
	DishData,
	DishName,
	DishUpdateData,
	LoginData, SignInResponse,
	UserData, UsersResponse
} from 'common/types';

class Api {
	getMenu(): Promise<AxiosResponse<DishData[]>> {
		return axios.get('/api/menu/get')
	}

	clearMenu(): Promise<AxiosResponse<void>> {
		return axios.post('/api/menu/clear');
	}

	saveDish(payload: DishName): Promise<AxiosResponse<void>> {
		return axios.post('/api/dish/save', payload);
	}

	updateDish(payload: DishUpdateData): Promise<AxiosResponse<void>> {
		return axios.post('/api/dish/update', payload);
	}

	deleteDish(payload: DishName): Promise<AxiosResponse<void>> {
		return axios.post('/api/dish/delete', payload);
	}

	getData(): Promise<AxiosResponse<UserData[]>> {
		return axios.get('/api/data/get');
	}

	getUsers(): Promise<AxiosResponse<UsersResponse>> {
		return axios.get('/api/users/get');
	}

	signInUser(payload: LoginData): Promise<AxiosResponse<SignInResponse>> {
		return axios.post('/api/login/signIn', payload);
	}

	authenticateUser(token: string): Promise<AxiosResponse<AuthenticationResponse>> {
		return axios.get(
			'/api/login/authenticate',
			{headers: {'auth-token': token},
			});
	}

	signUpUser(payload: LoginData): Promise<AxiosResponse<UsersResponse>> {
		return axios.post('/api/login/signUp', payload);
	}

	setAuthHeader(token: string) {
		axios.defaults.headers.common['auth-token'] = token;
	}
}

export default new Api();
