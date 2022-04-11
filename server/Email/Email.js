"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Api_1 = __importDefault(require("../Api/Api"));
var nodemailer = require('nodemailer');
var Email = /** @class */ (function () {
    function Email() {
    }
    Email.prototype.sendConfirmationEmail = function (email) {
        var token = Api_1.default.generateToken(email);
        var mailOptions = {
            from: process.env.EMAIL_LOGIN,
            to: email,
            subject: 'Confirm Your Registration',
            html: this.getConfirmationMarkup(token),
        };
        return this.getTransporter().sendMail(mailOptions);
    };
    Email.prototype.getTransporter = function () {
        return nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    };
    Email.prototype.getConfirmationMarkup = function (token) {
        return "\n\t\t\t<div style=\"padding: 20px;\">\n\t\t\t\t<p style=\"padding-bottom: 20px;\">\n\t\t\t\t\tOpen the link below to confirm your account:\n\t\t\t\t</p>\n\t\t\t\t<a href=\"http://localhost:3000/confirmation?id=" + token + "\"\n\t\t\t\t\t\t style=\"background-color: #65b6ef; \n\t\t\t\t\t\t\t\t\t\twidth: 100px; \n\t\t\t\t\t\t\t\t\t\theight: 40px; \n\t\t\t\t\t\t\t\t\t\ttext-decoration: none; \n\t\t\t\t\t\t\t\t\t\tcolor: #fff; \n\t\t\t\t\t\t\t\t\t\tpadding: 20px; \n\t\t\t\t\t\t\t\t\t\tfont-weight: 700; \n\t\t\t\t\t\t\t\t\t\tfont-size: 18px; \n\t\t\t\t\t\t\t\t\t\tletter-spacing: 1px; \n\t\t\t\t\t\t\t\t\t\ttext-shadow: 1px 1px 1px #000; \n\t\t\t\t\t\t\t\t\t\tborder-radius: 3px; \n\t\t\t\t\t\t\t\t\t\tborder: 1px solid #000;\">\n\t\t\t\t\tConfirmation Link\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t";
    };
    return Email;
}());
exports.default = new Email();
//# sourceMappingURL=Email.js.map