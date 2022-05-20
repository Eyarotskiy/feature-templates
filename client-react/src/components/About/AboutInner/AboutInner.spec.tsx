import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AboutInner from './AboutInner';

describe('AboutInner component', () => {
	const TEST_ID = '5';
	const routeComponentPropsMock = {
		history: {} as any,
		location: {} as any,
		match: {params: {id: TEST_ID}} as any,
	};
	const { getByText } = screen;

	beforeEach(async () => {
		await waitFor(() => {
			return render(<AboutInner {...routeComponentPropsMock} />);
		});
	});

	it('should render initial text content', () => {
		const title = getByText('AboutInner Component');
		const text = getByText(`ID: ${TEST_ID}`);

		expect(title).toBeInTheDocument();
		expect(text).toBeInTheDocument();
	});
});
