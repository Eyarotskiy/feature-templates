import Api from '../Api/Api';
import {TEST_TOKEN} from '../common/specConstants';
import Email from './Email';
const nodemailer = require('nodemailer');

describe('Email', () => {
	beforeEach(() => {
		nodemailer.createTransport =
			jest.fn().mockReturnValue({sendMail: jest.fn()});
		Api.generateToken = jest.fn().mockReturnValue(TEST_TOKEN);
	});

	describe('sendConfirmationEmail', () => {
		it('should init email transporter', () => {
			Email.sendConfirmationEmail('test');

			expect(nodemailer.createTransport).toHaveBeenCalled();
		});
	})
});
