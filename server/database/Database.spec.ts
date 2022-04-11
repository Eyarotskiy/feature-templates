import mongoose from 'mongoose';
import Database from './Database';
import {TEST_ERROR} from '../common/specConstants';

describe('Database', () => {
	beforeEach(() => {
		mongoose.connect = jest.fn();
		mongoose.model = jest.fn();
		console.log = jest.fn();
	});

	describe('connect', () => {
		it('should establish database connection', async () => {
			await Database.connect();

			expect(mongoose.connect).toHaveBeenCalled();
			expect(console.log)
				.toHaveBeenCalledWith('Connection to database established!');
		});

		it('should log database connection failure', async () => {
			mongoose.connect = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await Database.connect();

			expect(console.log)
				.toHaveBeenCalledWith('Connection to database failed! Error log:');
			expect(console.log).toHaveBeenCalledWith(TEST_ERROR);
		});
	});
});
