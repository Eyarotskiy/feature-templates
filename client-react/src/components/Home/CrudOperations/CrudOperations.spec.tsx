import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../../../redux/reducers/reducers';
import CrudOperations from './CrudOperations';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import {DishData, UserData} from '../../../common/types';
import WebSocket from '../../../Api/WebSocket';

function renderWithRedux(
	component: JSX.Element,
	{initialState, store = createStore(rootReducer, initialState)} = {} as any,
) {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store,
	}
}

describe('CrudOperations component', () => {
	const TEST_USER_ID = '1';
	const TEST_USER_NAME = 'Test name';
	const TEST_USER_USERNAME = 'Test username';
	const TEST_USER_WEBSITE = 'Test website';
	const TEST_USER_RESPONSE: UserData[] = [{
		id: TEST_USER_ID,
		name: TEST_USER_NAME,
		username: TEST_USER_USERNAME,
		website: TEST_USER_WEBSITE,
	}];
	const TEST_DISH_ID = '1';
	const TEST_DISH_DATE = '01-01-01';
	const TEST_DISH_NAME = 'Test name';
	const TEST_DISH_RESPONSE: DishData[] = [{
		_id: TEST_DISH_ID,
		creation_date: new Date(TEST_DISH_DATE),
		name: TEST_DISH_NAME,
	}];

	const {getByText} = screen;
	const axiosMock = axios as jest.Mocked<typeof axios>;

	async function runTest(selector: string, expectedResult: string[]) {
		const result = await waitFor(() => {
			return screen.getAllByTestId(selector).map((item) => item.textContent);
		});

		expect(result).toEqual(expectedResult);
	}

	beforeEach(async () => {
		WebSocket.getMenu = jest.fn() as any;
		WebSocket.clearMenu = jest.fn() as any;
		WebSocket.socket.emit = jest.fn() as any;
		await waitFor(() => renderWithRedux(<CrudOperations />));
	});

	describe('useEffect', () => {
		it('should trigger getMenu request upon render', () => {
			expect(WebSocket.getMenu).toHaveBeenCalled();
		});
	});

	describe('text content', () => {
		it('should render title message', () => {
			const title = getByText('CRUD operations');

			expect(title).toBeInTheDocument();
		});
	});

	describe('getData', () => {
		it('should render user data content upon click', async () => {
			axiosMock.get.mockResolvedValueOnce({data: TEST_USER_RESPONSE});
			const usersButton = getByText(/^Get users/i);

			userEvent.click(usersButton);

			await runTest('user-id', [TEST_USER_ID]);
			await runTest('user-name', [TEST_USER_NAME]);
			await runTest('user-username', [TEST_USER_USERNAME]);
			await runTest('user-website', [TEST_USER_WEBSITE]);
		});
	});

	describe('getData', () => {
		it('should render menu data content upon click', async () => {
			axiosMock.get.mockResolvedValueOnce({data: TEST_DISH_RESPONSE});
			const menuButton = getByText(/^Get menu/i);

			userEvent.click(menuButton);

			await runTest('dish-id', [TEST_DISH_ID]);
			await runTest('dish-date', ['01-01-2001 00:00']);
			await runTest('dish-name', [TEST_DISH_NAME]);
		});
	});

	describe('clearMenu', () => {
		it('should trigger clear menu request', () => {
			const clearButton = getByText(/^Clear menu/i);

			userEvent.click(clearButton);

			expect(WebSocket.clearMenu).toHaveBeenCalled();
		});
	});
});
