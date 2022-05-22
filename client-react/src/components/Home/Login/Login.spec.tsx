import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import axios from 'axios';
import { UsersResponse } from 'common/types';
import { store } from 'redux/store';
import userEvent from '@testing-library/user-event';

describe('Login component', () => {
	const TEST_USER_NAME = 'test@test.com';
	const TEST_USER_RESPONSE: UsersResponse = {users: [TEST_USER_NAME]};

	const {getByTestId, getByText} = screen;
	const axiosMock = axios as jest.Mocked<typeof axios>;

	async function runSignInSteps() {
		const loginInput = getByTestId('login-input');
		const passwordInput = getByTestId('password-input');
		const signInButton = getByTestId('sign-in-button');

		await userEvent.type(loginInput, TEST_USER_NAME);
		await userEvent.type(passwordInput, '1');
		await userEvent.click(signInButton);
	}

	beforeEach(async () => {
		axiosMock.get.mockResolvedValueOnce({data: TEST_USER_RESPONSE});
		axiosMock.defaults = {headers: {common: {'auth-token': ''}}} as any;
		await waitFor(() => render(<Provider store={store}><Login /></Provider>));
	});

	it('should render initial text content', () => {
		const title = getByText('Login (Json Web Token)');

		expect(title).toBeInTheDocument();
	});

	it('should show default content for logged out user', () => {
		const loginStatus = getByTestId('login-status');
		const userTitle = getByText('Registered users:');
		const userList = getByTestId('user-list');

		expect(loginStatus).toHaveTextContent('logged out');
		expect(loginStatus).toHaveAttribute('class', 'status warning');
		expect(userTitle).toBeInTheDocument();
		expect(userList).toHaveTextContent(TEST_USER_NAME);
	});

	it('should show content for logged in user', async () => {
		axiosMock.post.mockResolvedValueOnce({data: {token: 'testToken'}});

		await runSignInSteps();

		const loginStatus = getByTestId('login-status');
		const welcomeMessage = getByTestId('welcome-message');

		expect(loginStatus).toHaveTextContent('logged in');
		expect(loginStatus).toHaveAttribute('class', 'status success');
		expect(welcomeMessage).toHaveTextContent(`Welcome, ${TEST_USER_NAME}`);
	});
});
