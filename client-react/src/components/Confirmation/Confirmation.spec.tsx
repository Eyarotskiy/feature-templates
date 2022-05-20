import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Confirmation from './Confirmation';

describe('Confirmation component', () => {
	const { getByText } = screen;

	beforeEach(async () => {
		await waitFor(() => render(<Confirmation />));
	});

	it('should render title message', () => {
		const title = getByText('Confirmation Component');

		expect(title).toBeInTheDocument();
	});
});
