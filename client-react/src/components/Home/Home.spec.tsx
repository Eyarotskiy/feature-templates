import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Home from './Home';
import {createStore} from 'redux';
import rootReducer from '../../redux/reducers/reducers';
import {Provider} from 'react-redux';
import {UsersResponse} from 'common/types';
import axios from 'axios';

describe('Home component', () => {
	const TEST_USER_NAME = 'test@test.com';
	const TEST_USER_RESPONSE: UsersResponse = {users: [TEST_USER_NAME]};

	const { getByText } = screen;
	const axiosMock = axios as jest.Mocked<typeof axios>;

	function renderWithRedux(
		component: JSX.Element,
		{initialState, store = createStore(rootReducer, initialState)} = {} as any,
	) {
		return {
			...render(<Provider store={store}>{component}</Provider>),
			store,
		}
	}

	beforeEach(async () => {
		axiosMock.get.mockResolvedValueOnce({data: TEST_USER_RESPONSE});
		await waitFor(() => renderWithRedux(<Home />));
	});

	it('should render Login component by default', () => {
		const title = getByText('Login (Json Web Token)');

		expect(title).toBeInTheDocument();
	});
});
