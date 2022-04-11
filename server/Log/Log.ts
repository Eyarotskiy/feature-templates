import fs from 'fs';
import {ApiResponse} from '../common/types';
import {ERROR_LOG_FILE_PATH} from '../common/constants';
import {formatDate} from '../common/utils';
const cron = require('node-cron');

class Log {
	initClearErrorFileCronJob() {
		cron.schedule('* * 1 * *', () => {
			this.cleaErrorLogFile();
		});
	}

	async logErrorToFile(error: ApiResponse) {
		const dateString = `\n[${formatDate()}]\n`;
		const errorString = `Code: ${error.code}.\nMessage: ${error.message}.\n`;
		let resultString = dateString + errorString;
		if (error.stack) resultString += `Stack: ${error.stack}\n`;
		fs.appendFileSync(ERROR_LOG_FILE_PATH, resultString);
	}

	private cleaErrorLogFile() {
		fs.writeFileSync(ERROR_LOG_FILE_PATH, '');
	}
}

export default new Log(); 
