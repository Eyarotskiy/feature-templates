import {UserData} from './types';
import * as utils from './utils';

describe('utils', () => {
	describe('extractUserNames', () => {
		it('should return empty array', () => {
			const TEST_USERS: UserData[] = [
				{
					_id: '1',
					confirmed: false,
					creation_date: new Date(),
					login: 'test login',
					password: 'test password',
				},
				{
					_id: '2',
					confirmed: false,
					creation_date: new Date(),
					login: 'test login 2',
					password: 'test password 2',
				},
			];

			expect(utils.extractUserNames(TEST_USERS)).toEqual([]);
		});

		it('should return an array of confirmed users', () => {
			const TEST_USERS: UserData[] = [
				{
					_id: '1',
					confirmed: true,
					creation_date: new Date(),
					login: 'test login',
					password: 'test password',
				},
				{
					_id: '2',
					confirmed: false,
					creation_date: new Date(),
					login: 'test login 2',
					password: 'test password 2',
				},
			];

			expect(utils.extractUserNames(TEST_USERS)).toEqual(['test login']);
		});
	});

	describe('formatDate', () => {
		it('should return formatted date', () => {
			const TEST_DATE_1 = new Date('2022-01-30T12:56:35.659Z');
			jest.useFakeTimers().setSystemTime(TEST_DATE_1.getTime());

			expect(utils.formatDate()).toBe('30-01-2022 13:56');

			const TEST_DATE_2 = new Date('2022-01-30');
			jest.useFakeTimers().setSystemTime(TEST_DATE_2.getTime());

			expect(utils.formatDate()).toBe('30-01-2022 01:00');
		});
	});
});
