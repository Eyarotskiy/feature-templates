"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = __importDefault(require("../Log/Log"));
var Api_1 = __importDefault(require("./Api"));
var specConstants_1 = require("../common/specConstants");
var MenuApi_1 = __importDefault(require("./MenuApi/MenuApi"));
var DataApi_1 = __importDefault(require("./DataApi/DataApi"));
var FileApi_1 = __importDefault(require("./FileApi/FileApi"));
var AuthorizationApi_1 = __importDefault(require("./AuthorizationApi/AuthorizationApi"));
var jwt = require('jsonwebtoken');
describe('Api', function () {
    beforeEach(function () {
        jwt.verify = jest.fn();
        jwt.sign = jest.fn().mockReturnValue(specConstants_1.TEST_TOKEN);
        Log_1.default.logErrorToFile = jest.fn();
    });
    describe('initApiRequests', function () {
        it('should init API requests', function () {
            var TEST_APP = {};
            TEST_APP.get = jest.fn();
            TEST_APP.post = jest.fn();
            Api_1.default.initApiRequests(TEST_APP);
            expect(TEST_APP.get)
                .toHaveBeenCalledWith('/api/menu/get', MenuApi_1.default.handleMenuGetRequest);
            expect(TEST_APP.get)
                .toHaveBeenCalledWith('/api/data/get', DataApi_1.default.handleDataGetRequest);
            expect(TEST_APP.get)
                .toHaveBeenCalledWith('/api/users/get', DataApi_1.default.handleUsersGetRequest);
            expect(TEST_APP.get)
                .toHaveBeenCalledWith('/api/login/authenticate', AuthorizationApi_1.default.handleAuthenticateRequest);
            expect(TEST_APP.post)
                .toHaveBeenCalledWith('/api/dish/save', MenuApi_1.default.handleDishSaveRequest);
            expect(TEST_APP.post)
                .toHaveBeenCalledWith('/api/dish/update', MenuApi_1.default.handleDishUpdateRequest);
            expect(TEST_APP.post)
                .toHaveBeenCalledWith('/api/dish/delete', MenuApi_1.default.handleDishDeleteRequest);
            expect(TEST_APP.post)
                .toHaveBeenCalledWith('/api/menu/clear', MenuApi_1.default.handleMenuClearRequest);
            expect(TEST_APP.post)
                .toHaveBeenCalledWith('/api/file/upload', FileApi_1.default.handleFileUploadRequest);
            expect(TEST_APP.post)
                .toHaveBeenCalledWith('/api/login/signIn', AuthorizationApi_1.default.handleSignInRequest);
            expect(TEST_APP.post)
                .toHaveBeenCalledWith('/api/login/signUp', AuthorizationApi_1.default.handleSignUpRequest);
        });
    });
    describe('authenticateToken', function () {
        it('should verify token with success', function () {
            Api_1.default.authenticateToken(specConstants_1.TEST_REQUEST, specConstants_1.TEST_RESPONSE, specConstants_1.MOCK_FUNCTION);
            expect(jwt.verify).toHaveBeenCalled();
        });
    });
    describe('generateToken', function () {
        it('should generate token', function () {
            expect(Api_1.default.generateToken(specConstants_1.TEST_LOGIN)).toBe(specConstants_1.TEST_TOKEN);
        });
    });
});
//# sourceMappingURL=Api.spec.js.map