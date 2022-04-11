import Log from '../Log/Log';
import Api from './Api';
import {MOCK_FUNCTION, TEST_LOGIN, TEST_REQUEST, TEST_RESPONSE, TEST_TOKEN} from '../common/specConstants';
import MenuApi from './MenuApi/MenuApi';
import DataApi from './DataApi/DataApi';
import FileApi from './FileApi/FileApi';
import AuthorizationApi from './AuthorizationApi/AuthorizationApi';
const jwt = require('jsonwebtoken');

describe('Api', () => {
	beforeEach(() => {
		jwt.verify = jest.fn();
		jwt.sign = jest.fn().mockReturnValue(TEST_TOKEN);
		Log.logErrorToFile = jest.fn();
	});

	describe('initApiRequests', () => {
		it('should init API requests', () => {
			const TEST_APP = {} as any;
			TEST_APP.get = jest.fn();
			TEST_APP.post = jest.fn();

			Api.initApiRequests(TEST_APP);

			expect(TEST_APP.get)
				.toHaveBeenCalledWith('/api/menu/get', MenuApi.handleMenuGetRequest);
			expect(TEST_APP.get)
				.toHaveBeenCalledWith('/api/data/get', DataApi.handleDataGetRequest);
			expect(TEST_APP.get)
				.toHaveBeenCalledWith('/api/users/get', DataApi.handleUsersGetRequest);
			expect(TEST_APP.get)
				.toHaveBeenCalledWith('/api/login/authenticate', AuthorizationApi.handleAuthenticateRequest);
			expect(TEST_APP.post)
				.toHaveBeenCalledWith('/api/dish/save', MenuApi.handleDishSaveRequest);
			expect(TEST_APP.post)
				.toHaveBeenCalledWith('/api/dish/update', MenuApi.handleDishUpdateRequest);
			expect(TEST_APP.post)
				.toHaveBeenCalledWith('/api/dish/delete', MenuApi.handleDishDeleteRequest);
			expect(TEST_APP.post)
				.toHaveBeenCalledWith('/api/menu/clear', MenuApi.handleMenuClearRequest);
			expect(TEST_APP.post)
				.toHaveBeenCalledWith('/api/file/upload', FileApi.handleFileUploadRequest);
			expect(TEST_APP.post)
				.toHaveBeenCalledWith('/api/login/signIn', AuthorizationApi.handleSignInRequest);
			expect(TEST_APP.post)
				.toHaveBeenCalledWith('/api/login/signUp', AuthorizationApi.handleSignUpRequest);
		});
	});

	describe('authenticateToken', () => {
		it('should verify token with success', () => {
			Api.authenticateToken(TEST_REQUEST, TEST_RESPONSE, MOCK_FUNCTION);

			expect(jwt.verify).toHaveBeenCalled();
		});
	});

	describe('generateToken', () => {
		it('should generate token', () => {
			expect(Api.generateToken(TEST_LOGIN)).toBe(TEST_TOKEN);
		});
	});
});
