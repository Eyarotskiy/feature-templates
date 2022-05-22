import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutInner from './AboutInner';

describe('AboutInner component', () => {
	const { getByText } = screen;

	test('should render initial text content', () => {
		render(<AboutInner />);

		const title = getByText('AboutInner Component');

		expect(title).toBeInTheDocument();
	});
});
