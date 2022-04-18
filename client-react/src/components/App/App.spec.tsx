import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {createMemoryHistory} from 'history';
import App from './App';
import {createStore} from 'redux';
import rootReducer from '../../redux/reducers/reducers';
import {Provider} from 'react-redux';
import {UsersResponse} from '../../common/types';
import axios from 'axios';
import {Router} from 'react-router-dom'
import userEvent from '@testing-library/user-event/dist';

describe('App component', () => {
	const TEST_USER_NAME = 'test@test.com';
	const TEST_USER_RESPONSE: UsersResponse = {users: [TEST_USER_NAME]};

	const {getByText, getByTestId} = screen;
	const axiosMock = axios as jest.Mocked<typeof axios>;

	function renderWithRedux(
		component: JSX.Element,
		{initialState, store = createStore(rootReducer, initialState)} = {} as any,
	) {
		const history = createMemoryHistory();

		return {
			...render(
				<Provider store={store}>
					<Router history={history}>{component}</Router>
				</Provider>
			),
			store,
		}
	}

	beforeEach(async () => {
		axiosMock.get.mockResolvedValueOnce({data: TEST_USER_RESPONSE});
		await waitFor(() => renderWithRedux(<App />));
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

	it('should render About and AboutInner components', () => {
		const aboutLink = getByTestId('nav-about');
		userEvent.click(aboutLink);
		const aboutTitle = getByText('About Component');

		expect(aboutTitle).toBeInTheDocument();

		const aboutInnerLink = getByTestId('about-inner-link');
		userEvent.click(aboutInnerLink);
		const aboutInnerTitle = getByText('AboutInner Component');
		const aboutInnerText = getByText('ID: 15');

		expect(aboutInnerTitle).toBeInTheDocument();
		expect(aboutInnerText).toBeInTheDocument();
	});
});
