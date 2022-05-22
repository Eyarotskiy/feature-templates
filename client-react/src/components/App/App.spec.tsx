import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom'
import { store } from 'redux/store';
import Home from 'components/Home/Home';
import { UsersResponse } from 'common/types';
import userEvent from '@testing-library/user-event';

describe('App component', () => {
	const TEST_USER_NAME = 'test@test.com';
	const TEST_USER_RESPONSE: UsersResponse = {users: [TEST_USER_NAME]};

	const {getByText, getByTestId} = screen;
	const axiosMock = axios as jest.Mocked<typeof axios>;

	beforeEach(async () => {
		axiosMock.get.mockResolvedValueOnce({data: TEST_USER_RESPONSE});
		await waitFor(() => {
			render(
				<Provider store={store}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Provider>);
		});
	});

	it('should render initial text content', async () => {
		const title = getByText('React Routing');
		const homeLink = getByTestId('nav-home');
		const aboutLink = getByTestId('nav-about');

		expect(title).toBeInTheDocument();
		expect(homeLink).toHaveTextContent('Home');
		expect(homeLink).toHaveAttribute('href', '/');
		expect(aboutLink).toHaveTextContent('About');
		expect(aboutLink).toHaveAttribute('href', '/about');
	});

	it('should render About and AboutInner components', async () => {
		const aboutLink = getByTestId('nav-about');
		await userEvent.click(aboutLink);
		const aboutTitle = getByText('About Component');

		expect(aboutTitle).toBeInTheDocument();

		const aboutInnerLink = getByTestId('about-inner-link');
		await userEvent.click(aboutInnerLink);
		const aboutInnerTitle = getByText('AboutInner Component');
		const aboutInnerText = getByText('ID: 15');

		expect(aboutInnerTitle).toBeInTheDocument();
		expect(aboutInnerText).toBeInTheDocument();
	});
});
