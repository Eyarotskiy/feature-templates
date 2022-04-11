import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound component', () => {
	const { getByText } = screen;

	beforeEach(async () => {
		await waitFor(() => render(<NotFound />));
	});

	it('should render title message', () => {
		const title = getByText('404. Not Found');

		expect(title).toBeInTheDocument();
	});
});
