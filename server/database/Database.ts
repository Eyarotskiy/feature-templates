import mongoose, {Document} from 'mongoose';
import { model } from './model';
import { MONGO_URI } from '../common/constants';

class Database {
	private readonly menuModel = model.menu;
	private readonly usersModel = model.users;

	async connect(): Promise<void> {
		try {
			await mongoose.connect(MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			});
			console.log('Connection to database established!');
		} catch (error) {
			console.log('Connection to database failed! Error log:');
			console.log(error);
		}
	}

	async saveDish(dishName: string): Promise<object|null> {
		try {
			const menuModel: any = new model.menu();
			menuModel.name = dishName;

			return await menuModel.save();
		} catch (e) {
			throw new Error(e);
		}
	}

	async updateDish(oldDishName: string, newDishName: string): Promise<Document|null> {
		try {
			const filter: any = {name: oldDishName};
			const update: any = {$set: {name: newDishName}};

			return await this.menuModel.findOneAndUpdate(
				filter, update, {new: true});
		} catch(e) {
			throw new Error(e);
		}
	}

	async deleteDish(dishName: string): Promise<Document|null> {
		try {
			const filter: any = {name: dishName};

			return await this.menuModel.findOneAndRemove(filter);
		} catch (e) {
			throw new Error(e);
		}
	}

	async clearMenu(): Promise<any> {
		try {
			return await this.menuModel.deleteMany({} as any);
		} catch (e) {
			throw new Error(e);
		}
	}

	async getMenu(): Promise<Document[]> {
		try {
			return await this.menuModel.find();
		} catch (e) {
			throw new Error(e);
		}
	}

	async saveUser(login: string, password: string): Promise<Document[]> {
		try {
			const usersModel: any = new model.users();
			usersModel.login = login;
			usersModel.password = password;

			return await usersModel.save();
		} catch (e) {
			throw new Error(e);
		}
	}

	async getUsers(): Promise<any> {
		try {
			return await this.usersModel.find();
		} catch (e) {
			throw new Error(e);
		}
	}

	async findUser(login: string): Promise<any> {
		try {
			return await this.usersModel.findOne({login} as any);
		} catch (e) {
			throw new Error(e);
		}
	}

	async confirmUser(login: string): Promise<any> {
		try {
			const filter: any = {login};
			const update: any = {$set: {confirmed: true}};

			return await this.usersModel.findOneAndUpdate(
				filter, update, {new: true});
		} catch (e) {
			throw new Error(e);
		}
	}
}

export default new Database();
