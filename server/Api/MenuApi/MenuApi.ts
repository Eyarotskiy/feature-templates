import {Request, Response} from 'express';
import Database from '../../database/Database';
import Api from '../Api';

class MenuApi {
	async handleDishSaveRequest(req: Request, res:Response): Promise<void> {
		try {
			const {dishName} = req.body;
			const savedDish = await Database.saveDish(dishName);
			Api.sendSuccess(res, savedDish);
		} catch (error) {
			Api.sendError(res, 400, error)
		}
	}

	async handleDishUpdateRequest(req: Request, res:Response): Promise<void> {
		try {
			const {oldDishName, newDishName} = req.body;
			const updatedDish = await Database.updateDish(oldDishName, newDishName);
			Api.sendSuccess(res, updatedDish);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	async handleDishDeleteRequest(req: Request, res:Response): Promise<void> {
		try {
			const {dishName} = req.body;
			const deletedDish = await Database.deleteDish(dishName);
			Api.sendSuccess(res, deletedDish);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	async handleMenuClearRequest(req: Request, res:Response): Promise<void> {
		try {
			const result = await Database.clearMenu();
			Api.sendSuccess(res, result);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}

	async handleMenuGetRequest(req: Request, res:Response): Promise<void> {
		try {
			const menu = await Database.getMenu();
			Api.sendSuccess(res, menu);
		} catch (error) {
			Api.sendError(res, 400, error);
		}
	}
}

export default new MenuApi();
