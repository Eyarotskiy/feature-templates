import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';
import { BrowserRouter } from 'react-router-dom';

describe('About component', () => {
	const {getByText} = screen;

	beforeEach(() => {
		render(<BrowserRouter><About /></BrowserRouter>);
	});

	it('should render initial text content', () => {
		const title = getByText('About Component');
		const link = getByText('Inner page');

		expect(title).toBeInTheDocument();
		expect(link).toBeInTheDocument();
	});

	it('should set correct href for link element', () => {
		const link = getByText('Inner page');

		expect(link).toHaveAttribute('href', '/about/about-inner/15');
	});
});
