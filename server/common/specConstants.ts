import {Response} from 'express';
import {DishData, DishUpdateData, UserData} from './types';

export const TEST_LOGIN = 'test login';

export const TEST_HASH = 'test hash';

export const TEST_TOKEN = 'test token';

export const TEST_PROTOCOL = 'https';

export const TEST_FILE_NAME = 'testFileName';

export const TEST_HOST = 'testHost';

export const TEST_DISH_NAME = 'test dish name';

export const TEST_NEW_DISH_NAME = 'test new dish name';

export const TEST_DISH: DishData = {
	_id: '1',
	name: TEST_DISH_NAME,
	creation_date: new Date(),
};

export const TEST_MENU = {menu: [TEST_DISH]};

export const TEST_REQUEST = {
	body: {login: 'test login', password: 'test password'},
	protocol: TEST_PROTOCOL,
	headers: {'auth-login': 'test auth login'},
	files: {file: {mv: jest.fn(), name: TEST_FILE_NAME}},
	get: jest.fn().mockReturnValue(TEST_HOST),
	dishName: TEST_DISH,
	oldDishName: TEST_DISH,
	newDishName: TEST_DISH,
} as any;

export const TEST_RESPONSE = {} as Response;

export const TEST_UNCONFIRMED_USER: UserData = {
	_id: '1',
	confirmed: false,
	creation_date: new Date(),
	login: TEST_LOGIN,
	password: 'test password',
};

export const TEST_CONFIRMED_USER: UserData = {
	_id: '2',
	confirmed: true,
	creation_date: new Date(),
	login: TEST_LOGIN,
	password: 'test password2',
};

export const TEST_DISH_UPDATE_PAYLOAD: DishUpdateData = {
	oldDishName: TEST_DISH_NAME,
	newDishName: TEST_NEW_DISH_NAME,
};

export const TEST_DATA_RESPONSE = [{id: '1', name: 'test name'}];

export const TEST_ERROR_STACKTRACE = 'test error stacktrace';

export const TEST_PATH = 'test path';

export const TEST_FILE_DATA = 'test file data';

export const TEST_ERROR = new Error(TEST_ERROR_STACKTRACE);

export const MOCK_FUNCTION = jest.fn();
