import Api from './Api';
import axios from 'axios';
import {
	AuthenticationResponse,
	DishData, DishName, DishUpdateData,
	LoginData,
	SignInResponse,
	UserData,
	UsersResponse
} from '../common/types';

describe('Api', () => {
	const axiosMock = axios as jest.Mocked<typeof axios>;
	const TEST_TOKEN = 'Test token';
	const TEST_DISH_NAME: DishName = {dishName: 'Test dish name'};
	const TEST_DISH_RESPONSE: DishData = {
		_id: '1',
		creation_date: new Date('01-01-01'),
		name: 'Test name',
	};
	const TEST_DISH_UPDATE_DATA: DishUpdateData = {
		oldDishName: 'Old test name',
		newDishName: 'New test name',
	};
	const TEST_USER_DATA: UserData = {
		id: '1',
		name: 'Test name',
		username: 'Test user name',
		website: 'Test website',
	};
	const TEST_USERS_RESPONSE: UsersResponse = {users: ['name1', 'name2']};
	const TEST_LOGIN_FORM_DATA: LoginData = {
		login: 'Test login',
		password: 'Test password',
	};
	const TEST_SIGN_IN_RESPONSE: SignInResponse = {token: TEST_TOKEN};
	const TEST_AUTHENTICATION_RESPONSE: AuthenticationResponse = {
		login: 'Test login',
		newToken: 'Test new token',
	};

	describe('getMenu', () => {
		it('should retrieve menu data', async () => {
			axiosMock.get.mockResolvedValueOnce({data: TEST_DISH_RESPONSE});

			const response = await Api.getMenu();

			expect(axiosMock.get).toHaveBeenCalledWith('/api/menu/get');
			expect(response.data).toEqual(TEST_DISH_RESPONSE);
		});
	});

	describe('clearMenu', () => {
		it('should trigger clear menu request', () => {
			Api.clearMenu();

			expect(axiosMock.post).toHaveBeenCalledWith('/api/menu/clear');
		});
	});

	describe('saveDish', () => {
		it('should trigger dish save request', () => {
			Api.saveDish(TEST_DISH_NAME);

			expect(axiosMock.post)
				.toHaveBeenCalledWith('/api/dish/save', TEST_DISH_NAME);
		});
	});

	describe('updateDish', () => {
		it('should trigger dish update request', () => {
			Api.updateDish(TEST_DISH_UPDATE_DATA);

			expect(axiosMock.post)
				.toHaveBeenCalledWith('/api/dish/update', TEST_DISH_UPDATE_DATA);
		});
	});

	describe('deleteDish', () => {
		it('should trigger dish delete request', () => {
			Api.deleteDish(TEST_DISH_NAME);

			expect(axiosMock.post)
				.toHaveBeenCalledWith('/api/dish/delete', TEST_DISH_NAME);
		});
	});

	describe('getData', () => {
		it('should retrieve main data', async () => {
			axiosMock.get.mockResolvedValueOnce({data: TEST_USER_DATA});

			const response = await Api.getData();

			expect(axiosMock.get).toHaveBeenCalledWith('/api/data/get');
			expect(response.data).toEqual(TEST_USER_DATA);
		});
	});

	describe('getUsers', () => {
		it('should retrieve list of users', async () => {
			axiosMock.get.mockResolvedValueOnce({data: TEST_USERS_RESPONSE});

			const response = await Api.getUsers();

			expect(axiosMock.get).toHaveBeenCalledWith('/api/users/get');
			expect(response.data).toEqual(TEST_USERS_RESPONSE);
		});
	});

	describe('signInUser', () => {
		it('should trigger user sign in request', async () => {
			axiosMock.post.mockResolvedValueOnce({data: TEST_SIGN_IN_RESPONSE});

			const response = await Api.signInUser(TEST_LOGIN_FORM_DATA);

			expect(axiosMock.post)
				.toHaveBeenCalledWith('/api/login/signIn', TEST_LOGIN_FORM_DATA);
			expect(response.data).toEqual(TEST_SIGN_IN_RESPONSE);
		});
	});

	describe('authenticateUser', () => {
		it('should user authenticate request', async () => {
			axiosMock.get.mockResolvedValueOnce({data: TEST_AUTHENTICATION_RESPONSE});

			const response = await Api.authenticateUser(TEST_TOKEN);

			expect(axiosMock.get).toHaveBeenCalledWith(
				'/api/login/authenticate',
				{'headers': {'auth-token': TEST_TOKEN}},
				);
			expect(response.data).toEqual(TEST_AUTHENTICATION_RESPONSE);
		});
	});

	describe('signUpUser', () => {
		it('should trigger user sign up request', async () => {
			axiosMock.post.mockResolvedValueOnce({data: TEST_USERS_RESPONSE});

			const response = await Api.signUpUser(TEST_LOGIN_FORM_DATA);

			expect(axiosMock.post).toHaveBeenCalledWith(
				'/api/login/signUp',
				TEST_LOGIN_FORM_DATA,
			);
			expect(response.data).toEqual(TEST_USERS_RESPONSE);
		});
	});

	describe('setAuthHeader', () => {
		it('should set authentication token value in headers', () => {
			axiosMock.defaults = {
				headers: {
					common: {
						'auth-token': '',
					},
				},
			};

			Api.setAuthHeader(TEST_TOKEN);

			expect(axiosMock.defaults.headers.common['auth-token']).toBe(TEST_TOKEN);
		});
	});
});
