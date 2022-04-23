import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {UserData} from 'common/types';
import Users from './Users';

describe('Users component', () => {
	const TEST_ID_1 = '5';
	const TEST_ID_2 = '10';
	const TEST_NAME_1 = 'testName1';
	const TEST_NAME_2 = 'testName2';
	const TEST_USERNAME_1 = 'testUserName1';
	const TEST_USERNAME_2 = 'testUserName2';
	const TEST_WEBSITE_1 = 'testWebsite1';
	const TEST_WEBSITE_2 = 'testWebsite2';

	const userProps: UserData[] = [
		{
			id: TEST_ID_1,
			name: TEST_NAME_1,
			username: TEST_USERNAME_1,
			website: TEST_WEBSITE_1,
		},
		{
			id: TEST_ID_2,
			name: TEST_NAME_2,
			username: TEST_USERNAME_2,
			website: TEST_WEBSITE_2,
		},
	];

	const { getAllByTestId } = screen;

	beforeEach(async () => {
		await waitFor(() => render(<Users users={userProps} />));
	});

	it('should render text content passed in props', () => {
		function getElements(selector: string): (string|null)[] {
			return getAllByTestId(selector).map((item) => item.textContent)
		}

		expect(getElements('user-id'))
			.toEqual([TEST_ID_1, TEST_ID_2]);
		expect(getElements('user-name'))
			.toEqual([TEST_NAME_1, TEST_NAME_2]);
		expect(getElements('user-username'))
			.toEqual([TEST_USERNAME_1, TEST_USERNAME_2]);
		expect(getElements('user-website'))
			.toEqual([TEST_WEBSITE_1, TEST_WEBSITE_2]);
	});
});
