import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound component', () => {
	const { getByText } = screen;

	it('should render title message', () => {
		render(<NotFound />);

		const title = getByText('404. Not Found');

		expect(title).toBeInTheDocument();
	});
});
