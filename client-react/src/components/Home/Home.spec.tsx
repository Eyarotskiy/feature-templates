import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import { Provider } from 'react-redux';
import { UsersResponse } from 'common/types';
import axios from 'axios';
import { store } from 'redux/store';

describe('Home component', () => {
	const TEST_USER_NAME = 'test@test.com';
	const TEST_USER_RESPONSE: UsersResponse = {users: [TEST_USER_NAME]};

	const {getByText} = screen;
	const axiosMock = axios as jest.Mocked<typeof axios>;

	beforeEach(async () => {
		axiosMock.get.mockResolvedValueOnce({data: TEST_USER_RESPONSE});
		await waitFor(() => render(<Provider store={store}><Home /></Provider>));
	});

	it('should render Login component by default', () => {
		const title = getByText('Login (Json Web Token)');

		expect(title).toBeInTheDocument();
	});
});
