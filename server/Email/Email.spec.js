"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Api_1 = __importDefault(require("../Api/Api"));
var specConstants_1 = require("../common/specConstants");
var Email_1 = __importDefault(require("./Email"));
var nodemailer = require('nodemailer');
describe('Email', function () {
    beforeEach(function () {
        nodemailer.createTransport =
            jest.fn().mockReturnValue({ sendMail: jest.fn() });
        Api_1.default.generateToken = jest.fn().mockReturnValue(specConstants_1.TEST_TOKEN);
    });
    describe('sendConfirmationEmail', function () {
        it('should init email transporter', function () {
            Email_1.default.sendConfirmationEmail('test');
            expect(nodemailer.createTransport).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=Email.spec.js.map