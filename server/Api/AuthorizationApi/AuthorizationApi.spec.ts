import AuthorizationApi from './AuthorizationApi';
import Api from '../Api';
import {Request} from 'express';
import Database from '../../database/Database';
import Email from '../../Email/Email';
import {
	TEST_CONFIRMED_USER, TEST_ERROR,
	TEST_HASH, TEST_LOGIN, TEST_REQUEST, TEST_RESPONSE,
	TEST_TOKEN, TEST_UNCONFIRMED_USER
} from '../../common/specConstants';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('AuthorizationApi', () => {
	beforeEach(() => {
		Api.generateToken = jest.fn().mockReturnValue(TEST_TOKEN);
		Api.sendSuccess= jest.fn();
		Api.sendError = jest.fn();
		Database.confirmUser = jest.fn();
		Database.findUser = jest.fn().mockReturnValue(TEST_CONFIRMED_USER);
		Database.saveUser = jest.fn();
		Database.getUsers = jest.fn().mockReturnValue([TEST_CONFIRMED_USER]);
		Email.sendConfirmationEmail = jest.fn();
		bcrypt.compare = jest.fn().mockReturnValue(true);
		bcrypt.hash = jest.fn().mockReturnValue(TEST_HASH);
		jwt.verify = jest.fn().mockReturnValue(true);
	});

	describe('handleSignInRequest', () => {
		it('should send success for test account', async () => {
			const TEST_USER_REQUEST = {body: {login: 'test@test.com'}} as Request;
			await AuthorizationApi.handleSignInRequest(
				TEST_USER_REQUEST, TEST_RESPONSE);

			expect(Api.generateToken).toHaveBeenCalled();
			expect(Api.sendSuccess).toHaveBeenCalledWith(
				TEST_RESPONSE, {token: TEST_TOKEN});
		});

		it('should send error for non-existent user', async () => {
			Database.findUser = jest.fn().mockReturnValue(undefined);

			await AuthorizationApi.handleSignInRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess).not.toHaveBeenCalled();
			expect(Api.sendError).toHaveBeenCalledWith(
				TEST_RESPONSE, 404, {message: 'Such user does not exist'});
		});

		it('should send error for incorrect password', async () => {
			bcrypt.compare = jest.fn().mockReturnValue(false);

			await AuthorizationApi.handleSignInRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess).not.toHaveBeenCalled();
			expect(Api.sendError).toHaveBeenCalledWith(
				TEST_RESPONSE, 401, {message: 'Password is not correct'});
		});

		it('should send error for unconfirmed email', async () => {
			Database.findUser = jest.fn().mockReturnValue(TEST_UNCONFIRMED_USER);

			await AuthorizationApi.handleSignInRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess).not.toHaveBeenCalled();
			expect(Api.sendError).toHaveBeenCalledWith(
				TEST_RESPONSE, 403, {message: 'Email is not confirmed'});
		});

		it('should send error in case of request failure', async () => {
			Database.findUser = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await AuthorizationApi.handleSignInRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 500, TEST_ERROR);
		});

		it('should send successful response', async () => {
			const TEST_USER_REQUEST = {body: {login: 'test_login'}} as Request;
			await AuthorizationApi.handleSignInRequest(
				TEST_USER_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess).toHaveBeenCalledWith(
				TEST_RESPONSE, {token: TEST_TOKEN});
		});
	});

	describe('handleAuthenticateRequest', () => {
		it('should send successful response', async () => {
			await AuthorizationApi
				.handleAuthenticateRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess).toHaveBeenCalledWith(TEST_RESPONSE, {
				login: TEST_LOGIN,
				newToken: TEST_TOKEN,
			});
		});

		it('should send error in case of request failure', async () => {
			Database.confirmUser = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await AuthorizationApi
				.handleAuthenticateRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 500, TEST_ERROR);
		});
	});

	describe('handleSignUpRequest', () => {
		it('should send error for existing user', async () => {
			await AuthorizationApi.handleSignUpRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 403, {message: 'User already exists'});
		});

		it('should send confirmation email, save user to DB and send successful response',
			async () => {
				Database.findUser = jest.fn().mockReturnValue(undefined);

				await AuthorizationApi.handleSignUpRequest(TEST_REQUEST, TEST_RESPONSE);

				expect(Email.sendConfirmationEmail).toHaveBeenCalledWith(TEST_LOGIN);
				expect(Database.saveUser).toHaveBeenCalledWith(TEST_LOGIN, TEST_HASH);
				expect(Api.sendSuccess)
					.toHaveBeenCalledWith(TEST_RESPONSE, {users: [TEST_LOGIN]});
			});

		it('should send error in case of request failure', async () => {
			Database.findUser = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await AuthorizationApi.handleSignUpRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 500, TEST_ERROR);
		});
	});
});

