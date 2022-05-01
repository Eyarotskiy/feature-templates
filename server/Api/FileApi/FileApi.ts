import {Response} from 'express';
import fs from 'fs';
import { PORT, SERVER_STATIC_FILES_DIRECTORY } from '../../common/constants';
import Api from '../Api';
import path from 'path';

class FileApi {
	async handleFileUploadRequest(req: any, res:Response): Promise<void> {
		try {
			if (!fs.existsSync(SERVER_STATIC_FILES_DIRECTORY)) {
				fs.mkdirSync(SERVER_STATIC_FILES_DIRECTORY);
			}
			const {file} = req.files;
			const destinationPath =
				path.join(SERVER_STATIC_FILES_DIRECTORY, '/', file.name);
			const host =
				process.env.NODE_ENV === 'local' ? `localhost:${PORT}` : req.get('host');
			await file.mv(destinationPath);
			const result = {url: `${req.protocol}://${host}/${file.name}`};
			Api.sendSuccess(res, result);
		} catch (error) {
			Api.sendError(res, 500, error);
		}
	}
}

export default new FileApi();
