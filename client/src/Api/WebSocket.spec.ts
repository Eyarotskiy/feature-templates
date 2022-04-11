import WebSocket from './WebSocket';
import {DishUpdateData} from '../common/types';

describe('WebSocket', () => {
	const TEST_DISH_NAME = 'Test dish name';
	const testDishUpdateData: DishUpdateData = {
		oldDishName: 'Old test name',
		newDishName: 'New test name',
	};

	beforeEach(() => {
		WebSocket.socket.emit = jest.fn() as any;
	});

	describe('clearMenu', () => {
		it('should emit menu clear event', () => {
			WebSocket.clearMenu();

			expect(WebSocket.socket.emit).toHaveBeenCalledWith('clearMenu');
		});
	});

	describe('saveDish', () => {
		it('should emit dish save event', () => {
			WebSocket.saveDish(TEST_DISH_NAME);

			expect(WebSocket.socket.emit)
				.toHaveBeenCalledWith('saveDish', TEST_DISH_NAME);
		});
	});

	describe('updateDish', () => {
		it('should emit dish delete event', () => {
			WebSocket.updateDish(testDishUpdateData);

			expect(WebSocket.socket.emit)
				.toHaveBeenCalledWith('updateDish', testDishUpdateData);
		});
	});

	describe('deleteDish', () => {
		it('should emit dish delete event', () => {
			WebSocket.deleteDish(TEST_DISH_NAME);

			expect(WebSocket.socket.emit)
				.toHaveBeenCalledWith('deleteDish', TEST_DISH_NAME);
		});
	});
});
