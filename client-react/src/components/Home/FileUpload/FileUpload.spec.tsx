import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import FileUpload from './FileUpload';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

describe('FileUpload component', () => {
	const { getByTestId, getByText, queryByTestId } = screen;
	const axiosMock = axios as jest.Mocked<typeof axios>;

	beforeEach(async () => {
		await waitFor(() => render(<FileUpload />));
	});

	it('should render initial text content', () => {
		const title = getByText('File Upload');

		expect(title).toBeInTheDocument();
	});

	it('should render upload button and image', async () => {
		const TEST_URL = 'testUrl';
		const testFile =
			new File(['test'], 'test.png', { type: 'image/png' });
		axiosMock.post.mockResolvedValueOnce({data: {url: TEST_URL}});
		const uploadInput = getByTestId('upload-input');

		expect(queryByTestId('upload-button')).toBeNull();
		expect(queryByTestId('uploaded-image')).toBeNull();

		await userEvent.upload(uploadInput, testFile);
		const uploadButton = getByTestId('upload-button');

		expect(uploadButton).toBeInTheDocument();

		await userEvent.click(uploadButton);

		await waitFor(() => {
			const uploadedImage = getByTestId('uploaded-image');

			expect(uploadedImage).toBeInTheDocument();
			expect(uploadedImage).toHaveAttribute('src', TEST_URL);
		});
	});
});
