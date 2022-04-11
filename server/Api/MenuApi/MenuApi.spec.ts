import Api from '../Api';
import Database from '../../database/Database';
import {TEST_DISH, TEST_ERROR, TEST_MENU, TEST_REQUEST, TEST_RESPONSE} from '../../common/specConstants';
import MenuApi from './MenuApi';

describe('MenuApi', () => {
	beforeEach(() => {
		Api.sendSuccess= jest.fn();
		Api.sendError = jest.fn();
		Database.saveDish = jest.fn().mockReturnValue(TEST_DISH);
		Database.updateDish = jest.fn().mockReturnValue(TEST_DISH);
		Database.deleteDish = jest.fn().mockReturnValue(TEST_DISH);
		Database.getMenu = jest.fn().mockReturnValue(TEST_MENU);
		Database.clearMenu = jest.fn().mockReturnValue(TEST_MENU);
	});

	describe('handleDishSaveRequest', () => {
		it('should send successful response', async () => {
			await MenuApi.handleDishSaveRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess).toHaveBeenCalledWith(TEST_RESPONSE, TEST_DISH);
		});

		it('should send error for failed request', async () => {
			Database.saveDish = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await MenuApi.handleDishSaveRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 400, TEST_ERROR);
		});
	});

	describe('handleDishUpdateRequest', () => {
		it('should send successful response', async () => {
			await MenuApi.handleDishUpdateRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess).toHaveBeenCalledWith(TEST_RESPONSE, TEST_DISH);
		});

		it('should send error for failed request', async () => {
			Database.updateDish = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await MenuApi.handleDishUpdateRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 400, TEST_ERROR);
		});
	});

	describe('handleDishDeleteRequest', () => {
		it('should send successful response', async () => {
			await MenuApi.handleDishDeleteRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess).toHaveBeenCalledWith(TEST_RESPONSE, TEST_DISH);
		});

		it('should send error for failed request', async () => {
			Database.deleteDish = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await MenuApi.handleDishDeleteRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 400, TEST_ERROR);
		});
	});

	describe('handleMenuClearRequest', () => {
		it('should send successful response', async () => {
			await MenuApi.handleMenuClearRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess).toHaveBeenCalledWith(TEST_RESPONSE, TEST_MENU);
		});

		it('should send error for failed request', async () => {
			Database.clearMenu = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await MenuApi.handleMenuClearRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 400, TEST_ERROR);
		});
	});

	describe('handleMenuGetRequest', () => {
		it('should send successful response', async () => {
			await MenuApi.handleMenuGetRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess).toHaveBeenCalledWith(TEST_RESPONSE, TEST_MENU);
		});

		it('should send error for failed request', async () => {
			Database.getMenu = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await MenuApi.handleMenuGetRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 400, TEST_ERROR);
		});
	});
});
