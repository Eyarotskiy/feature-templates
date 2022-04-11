const mockFunction = jest.fn().mockResolvedValue({data: {}});

export default {
	get: mockFunction,
	post: mockFunction,
};
