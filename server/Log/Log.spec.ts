import fs from 'fs';
import Log from './Log';
import {TEST_FILE_DATA, TEST_PATH} from '../common/specConstants';
const cron = require('node-cron');

describe('Log', () => {
	beforeEach(() => {
		fs.writeFileSync = jest.fn();
		fs.appendFileSync = jest.fn();
		cron.schedule = jest.fn(() => {
			fs.writeFileSync(TEST_PATH, TEST_FILE_DATA);
		});
	});

	describe('initClearErrorFileCronJob', () => {
		it('should initialize file clear cron and save file', () => {
			Log.initClearErrorFileCronJob();

			expect(cron.schedule).toHaveBeenCalled();
			expect(fs.writeFileSync).toHaveBeenCalledWith(TEST_PATH, TEST_FILE_DATA);
		});
	});

	describe('logErrorToFile', () => {
		it('should save error stacktrace to file', async () => {
			const TEST_ERROR = {
				code: 400,
				message: 'test',
			};

			await Log.logErrorToFile(TEST_ERROR);

			expect(fs.appendFileSync).toHaveBeenCalled();
		});
	});
});
