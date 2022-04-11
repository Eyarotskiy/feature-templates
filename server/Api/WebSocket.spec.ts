import WebSocket from './WebSocket';
import {
	TEST_DISH_NAME, TEST_DISH_UPDATE_PAYLOAD,
	TEST_ERROR,
	TEST_ERROR_STACKTRACE,
	TEST_MENU, TEST_NEW_DISH_NAME
} from '../common/specConstants';
import Database from '../database/Database';

describe('WebSocket', () => {
	let webSocket: WebSocket;
	const MOCK_IO = {
		on: jest.fn(),
		sockets: {emit: jest.fn()},
	} as any;
	const MOCK_WEBSOCKET_CLIENT = {
		on: jest.fn(),
		emit: jest.fn(),
	} as any;

	beforeEach(() => {
		Database.getMenu = jest.fn().mockReturnValue(TEST_MENU);
		Database.clearMenu = jest.fn();
		Database.saveDish = jest.fn();
		Database.updateDish = jest.fn();
		Database.deleteDish = jest.fn();
		webSocket = new WebSocket(MOCK_IO);
		webSocket.client = MOCK_WEBSOCKET_CLIENT;
	});

	describe('initSocket', () => {
		it('should init IO socket connection', () => {
			webSocket.initSocket();

			expect(webSocket.io.on).toHaveBeenCalled();
		});
	});

	describe('initMenuRequests', () => {
		it('should init dish and menu event handlers', async () => {
			await webSocket.initMenuRequests();

			expect(webSocket.client.on).toHaveBeenCalled();
			expect(webSocket.client.emit)
				.toHaveBeenCalledWith('getMenu', TEST_MENU);
		});
	});

	describe('emitError', () => {
		it('should emit error event', () => {
			webSocket.emitError(TEST_ERROR_STACKTRACE);

			expect(webSocket.client.emit)
				.toHaveBeenCalledWith('menuError', TEST_ERROR_STACKTRACE);
		});
	});

	describe('emitMenu', () => {
		it('should emit menu event', async () => {
			await webSocket.emitMenu();

			expect(webSocket.client.emit)
				.toHaveBeenCalledWith('getMenu', TEST_MENU);
		});

		it('should emit error', async () => {
			Database.getMenu = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await webSocket.emitMenu();

			expect(webSocket.client.emit)
				.toHaveBeenCalledWith('menuError', 'Emit menu error');
		});
	});

	describe('emitMenuToAll', () => {
		it('should emit menu event to all clients', async () => {
			await webSocket.emitMenuToAll();

			expect(webSocket.io.sockets.emit)
				.toHaveBeenCalledWith('getMenu', TEST_MENU);
		});

		it('should emit error', async () => {
			Database.getMenu = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await webSocket.emitMenuToAll();

			expect(webSocket.client.emit)
				.toHaveBeenCalledWith('menuError', 'Emit menu to all error');
		});
	});

	describe('clearMenu', () => {
		it('should emit menu clear event', async () => {
			await webSocket.clearMenu();

			expect(Database.clearMenu).toHaveBeenCalled();
			expect(webSocket.io.sockets.emit)
				.toHaveBeenCalledWith('getMenu', TEST_MENU);
		});

		it('should emit error', async () => {
			Database.clearMenu = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await webSocket.clearMenu();

			expect(webSocket.client.emit)
				.toHaveBeenCalledWith('menuError', 'Menu clear error');
		});
	});

	describe('saveDish', () => {
		it('should emit dish save event', async () => {
			await webSocket.saveDish(TEST_DISH_NAME);

			expect(Database.saveDish).toHaveBeenCalledWith(TEST_DISH_NAME);
			expect(webSocket.io.sockets.emit)
				.toHaveBeenCalledWith('getMenu', TEST_MENU);
		});

		it('should emit error', async () => {
			Database.saveDish = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await webSocket.saveDish(TEST_DISH_NAME);

			expect(webSocket.client.emit)
				.toHaveBeenCalledWith('menuError', 'Dish save error');
		});
	});

	describe('updateDish', () => {
		it('should emit dish update event', async () => {
			await webSocket.updateDish(TEST_DISH_UPDATE_PAYLOAD);

			expect(Database.updateDish)
				.toHaveBeenCalledWith(TEST_DISH_NAME, TEST_NEW_DISH_NAME);
			expect(webSocket.io.sockets.emit)
				.toHaveBeenCalledWith('getMenu', TEST_MENU);
		});

		it('should emit error', async () => {
			Database.updateDish = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await webSocket.updateDish(TEST_DISH_UPDATE_PAYLOAD);

			expect(webSocket.client.emit)
				.toHaveBeenCalledWith('menuError', 'Dish update error');
		});
	});

	describe('deleteDish', () => {
		it('should emit dish update event', async () => {
			await webSocket.deleteDish(TEST_DISH_NAME);

			expect(Database.deleteDish).toHaveBeenCalledWith(TEST_DISH_NAME);
			expect(webSocket.io.sockets.emit)
				.toHaveBeenCalledWith('getMenu', TEST_MENU);
		});

		it('should emit error', async () => {
			Database.deleteDish = jest.fn().mockImplementation(() => {
				throw TEST_ERROR;
			});

			await webSocket.deleteDish(TEST_DISH_NAME);

			expect(webSocket.client.emit)
				.toHaveBeenCalledWith('menuError', 'Dish delete error');
		});
	});
});
