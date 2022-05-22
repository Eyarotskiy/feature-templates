import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Menu from './Menu';
import { DishData } from 'common/types';

describe('Menu component', () => {
	const TEST_ID_1 = '5';
	const TEST_ID_2 = '10';
	const TEST_NAME_1 = 'testName1';
	const TEST_NAME_2 = 'testName2';

	const menuProps: DishData[] = [
		{
			_id: TEST_ID_1,
			creation_date: new Date('10-12-2020'),
			name: TEST_NAME_1,
		},
		{
			_id: TEST_ID_2,
			creation_date: new Date('03-05-2021'),
			name: TEST_NAME_2,
		},
	];

	const { getAllByTestId } = screen;

	it('should render text content passed in props', () => {
		function getElements(selector: string): (string|null)[] {
			return getAllByTestId(selector).map((item) => item.textContent)
		}

		render(<Menu menu={menuProps} />);

		expect(getElements('dish-id'))
			.toEqual([TEST_ID_1, TEST_ID_2]);
		expect(getElements('dish-name'))
			.toEqual([TEST_NAME_1, TEST_NAME_2]);
		expect(getElements('dish-date'))
			.toEqual(['12-10-2020 00:00', '05-03-2021 00:00']);
	});
});
