import '@testing-library/jest-dom/extend-expect';
import ReactGA from 'react-ga';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Analytics from './Analytics';
import userEvent from '@testing-library/user-event';

describe('Analytics component', () => {
	const { getByText } = screen;

	beforeEach(async () => {
		ReactGA.initialize = jest.fn();
		ReactGA.pageview = jest.fn();
		ReactGA.event = jest.fn();
		await waitFor(() => render(<Analytics />));
	});

	it('should render title message', () => {
		const title = getByText('Google Analytics');

		expect(title).toBeInTheDocument();
	});

	it('should trigger Google analytics methods upon render', () => {
		expect(ReactGA.initialize).toHaveBeenCalled();
		expect(ReactGA.pageview).toHaveBeenCalledWith('yevTest');
	});

	it('should trigger Google event method upon button click', () => {
		const button = getByText('Track Event to GA');

		userEvent.click(button);

		expect(ReactGA.event).toHaveBeenCalled();
	});
});
