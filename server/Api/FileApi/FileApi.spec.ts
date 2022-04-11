import Api from '../Api';
import fs from 'fs';
import path from 'path';
import {
	TEST_ERROR, TEST_FILE_NAME, TEST_HOST, TEST_PROTOCOL,
	TEST_REQUEST, TEST_RESPONSE
} from '../../common/specConstants';
import FileApi from './FileApi';

describe('FileApi', () => {
	beforeEach(() => {
		Api.sendSuccess = jest.fn();
		Api.sendError = jest.fn();
		fs.existsSync = jest.fn().mockReturnValue(true);
		fs.mkdirSync = jest.fn();
	});

	describe('handleFileUploadRequest', () => {
		it(`should create folder if it doesn't exist`, async () => {
			fs.existsSync = jest.fn().mockReturnValue(false);

			await FileApi.handleFileUploadRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(fs.mkdirSync).toHaveBeenCalled();
		});

		it('should send successful response', async () => {
			const expectedUrl = `${TEST_PROTOCOL}://${TEST_HOST}/${TEST_FILE_NAME}`;

			await FileApi.handleFileUploadRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendSuccess)
				.toHaveBeenCalledWith(TEST_RESPONSE, {url: expectedUrl});
		});

		it('should send error in case of request failure', async () => {
			path.join = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await FileApi.handleFileUploadRequest(TEST_REQUEST, TEST_RESPONSE);

			expect(Api.sendError)
				.toHaveBeenCalledWith(TEST_RESPONSE, 500, TEST_ERROR);
		});
	});
});
