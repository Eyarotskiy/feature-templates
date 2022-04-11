"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var constants_1 = require("../common/constants");
var DataApi_1 = __importDefault(require("./DataApi/DataApi"));
var FileApi_1 = __importDefault(require("./FileApi/FileApi"));
var AuthorizationApi_1 = __importDefault(require("./AuthorizationApi/AuthorizationApi"));
var MenuApi_1 = __importDefault(require("./MenuApi/MenuApi"));
var Log_1 = __importDefault(require("../Log/Log"));
var jwt = require('jsonwebtoken');
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.prototype.initApiRequests = function (app) {
        app.get('/api/menu/get', MenuApi_1.default.handleMenuGetRequest);
        app.post('/api/dish/save', MenuApi_1.default.handleDishSaveRequest);
        app.post('/api/dish/update', MenuApi_1.default.handleDishUpdateRequest);
        app.post('/api/dish/delete', MenuApi_1.default.handleDishDeleteRequest);
        app.post('/api/menu/clear', MenuApi_1.default.handleMenuClearRequest);
        app.get('/api/data/get', DataApi_1.default.handleDataGetRequest);
        app.get('/api/users/get', DataApi_1.default.handleUsersGetRequest);
        app.post('/api/file/upload', FileApi_1.default.handleFileUploadRequest);
        app.post('/api/login/signIn', AuthorizationApi_1.default.handleSignInRequest);
        app.get('/api/login/authenticate', AuthorizationApi_1.default.handleAuthenticateRequest);
        app.post('/api/login/signUp', AuthorizationApi_1.default.handleSignUpRequest);
        app.get('/*', this.handleRootRequest);
    };
    Api.prototype.sendSuccess = function (res, data) {
        if (data === void 0) { data = {}; }
        res.status(200).json(data);
    };
    Api.prototype.sendError = function (res, code, error) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = {
                            code: code,
                            message: error.message,
                            stack: error.stack,
                        };
                        return [4 /*yield*/, Log_1.default.logErrorToFile(response)];
                    case 1:
                        _a.sent();
                        res.status(code).send(response);
                        return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.authenticateToken = function (req, res, next) {
        var _this = this;
        var token = req.headers['auth-token'];
        var handleVerification = function (err, user) {
            if (err) {
                _this.sendError(res, 401, err);
                return;
            }
            next();
        };
        jwt.verify(token, constants_1.JWT_SECRET, handleVerification);
    };
    Api.prototype.generateToken = function (userName) {
        var name = { name: userName };
        var expiration = { 'expiresIn': '1d' };
        return jwt.sign(name, constants_1.JWT_SECRET, expiration);
    };
    Api.prototype.handleRootRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.sendFile(path_1.default.join(constants_1.CLIENT_BUILD_DIRECTORY, 'index.html'));
                }
                catch (error) {
                    this.sendError(res, 400, error);
                }
                return [2 /*return*/];
            });
        });
    };
    return Api;
}());
exports.default = new Api();
//# sourceMappingURL=Api.js.map