import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import About from './About';
import {BrowserRouter as Router} from 'react-router-dom';

describe('About component', () => {
	const TEST_PATH = '/path';
	const routeComponentPropsMock = {
		history: {} as any,
		location: {} as any,
		match: {path: TEST_PATH} as any,
	};
	const {getByText} = screen;

	beforeEach(async () => {
		await waitFor(() => {
			return render(<Router><About {...routeComponentPropsMock} /></Router>);
		});
	});

	it('should render initial text content', () => {
		const title = getByText('About Component');
		const link = getByText('Inner page');

		expect(title).toBeInTheDocument();
		expect(link).toBeInTheDocument();
	});

	it('should set correct href for link element', () => {
		const link = getByText('Inner page');

		expect(link).toHaveAttribute('href', `${TEST_PATH}/about-inner/15`);
	});
});
