require('dotenv').config();
import compression from 'compression';
import express, {Application, NextFunction, Request, Response} from 'express';
import Api from './Api/Api';
import WebSocket from './Api/WebSocket';
import Log from './Log/Log';
import Database from './database/Database';
import {CLIENT_BUILD_DIRECTORY, PORT, SERVER_STATIC_FILES_DIRECTORY, WEBSOCKET_PORT} from './common/constants';
const fileUpload = require('express-fileupload');
const app: Application = express();
const io = require('socket.io')();

export default class App {
	port: string | number = process.env.PORT || PORT;

	constructor() {
		Database.connect();
		this.initMiddleware();
		Api.initApiRequests(app);
		Log.initClearErrorFileCronJob();
		this.createPort();
		new WebSocket(io);
	}

	private initMiddleware(): void {
		app.use(compression());
		app.use(express.json());
		app.use(express.static(CLIENT_BUILD_DIRECTORY));
		app.use(express.static(SERVER_STATIC_FILES_DIRECTORY));
		app.use('/', this.applyRootRequestMiddleware);
		app.use(fileUpload());
	}

	private createPort(): void {
		app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});

		io.listen(WEBSOCKET_PORT);
		console.log(`Websocket server listening on port ${WEBSOCKET_PORT}`);
	}

	private applyRootRequestMiddleware(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		const exceptionUrls = [
			'/',
			'/api/login/signIn',
			'/api/login/signUp',
			'/api/users/get',
		];
		const shouldPass = exceptionUrls.some((url) => req.url === url);

		if (shouldPass) {
			next();
		} else {
			Api.authenticateToken(req, res, next);
		}
	}
}

new App();
