import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Confirmation from './Confirmation';

describe('Confirmation component', () => {
	const { getByText } = screen;

	it('should render title message', () => {
		render(<Confirmation />);

		const title = getByText('Confirmation Component');

		expect(title).toBeInTheDocument();
	});
});
