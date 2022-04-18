import openSocket from 'socket.io-client';
import {DishUpdateData, DishData} from 'common/types';
import {getAppUrl} from 'common/utils';

class WebSocket {
	socket = openSocket(`${getAppUrl()}:8000`, {transports: ['websocket']});

	constructor() {
		this.initErrorHandler();
	}

	getMenu(callback: Function) {
		this.socket.on('getMenu', (response: DishData) => {
			callback(response);
		});
	}

	clearMenu() {
		this.socket.emit('clearMenu');
	}

	saveDish(dishCreateName: string) {
		this.socket.emit('saveDish', dishCreateName);
	}

	updateDish(payload: DishUpdateData) {
		this.socket.emit('updateDish', payload);
	}

	deleteDish(dishDeleteName: string) {
		this.socket.emit('deleteDish', dishDeleteName);
	}

	private initErrorHandler() {
		this.socket.on('menuError', (errorMessage: string) => {
			console.error(errorMessage);
		});
	}
}

export default new WebSocket();
