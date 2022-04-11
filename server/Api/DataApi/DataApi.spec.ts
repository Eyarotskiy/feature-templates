import axios from 'axios';
import DataApi from './DataApi';
import Api from '../Api';
import Database from '../../database/Database';
import {
	TEST_CONFIRMED_USER,
	TEST_DATA_RESPONSE, TEST_ERROR, TEST_LOGIN, TEST_REQUEST, TEST_RESPONSE
} from '../../common/specConstants';

describe('DataApi', () => {
	beforeEach(() => {
		Api.sendSuccess= jest.fn();
		Api.sendError = jest.fn();
		Database.getUsers = jest.fn().mockReturnValue([TEST_CONFIRMED_USER]);
		axios.get = jest.fn().mockReturnValue({data: TEST_DATA_RESPONSE});
	});

	describe('handleDataGetRequest', () => {
		it('should send successful response', async () => {
			await DataApi.handleDataGetRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess).toHaveBeenCalledWith(TEST_RESPONSE, TEST_DATA_RESPONSE);
		});

		it('should send error in case of request failure', async () => {
			axios.get = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await DataApi.handleDataGetRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 400, TEST_ERROR);
		});
	});

	describe('handleUsersGetRequest', () => {
		it('should send successful response', async () => {
			await DataApi.handleUsersGetRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess)
				.toHaveBeenCalledWith(TEST_RESPONSE, {users: [TEST_LOGIN]});
		});

		it('should send error in case of request failure', async () => {
			Database.getUsers = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await DataApi.handleUsersGetRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 400, TEST_ERROR);
		});
	});
});
