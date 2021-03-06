import {Request, Response} from 'express';
import axios from 'axios';
import {extractUserNames} from '../../common/utils';
import Api from '../Api';
import Database from '../../database/Database';

class DataApi {
	async handleDataGetRequest(req: Request, res:Response): Promise<void> {
		try {
			const response =
				await axios.get('https://jsonplaceholder.typicode.com/users');
			Api.sendSuccess(res, response.data);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	async handleUsersGetRequest(req: Request, res:Response): Promise<void> {
		try {
			const response = {
				users: extractUserNames(await Database.getUsers()),
			};
			Api.sendSuccess(res, response);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}
}

export default new DataApi();
