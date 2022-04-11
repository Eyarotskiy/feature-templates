"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOCK_FUNCTION = exports.TEST_ERROR = exports.TEST_FILE_DATA = exports.TEST_PATH = exports.TEST_ERROR_STACKTRACE = exports.TEST_DATA_RESPONSE = exports.TEST_DISH_UPDATE_PAYLOAD = exports.TEST_CONFIRMED_USER = exports.TEST_UNCONFIRMED_USER = exports.TEST_RESPONSE = exports.TEST_REQUEST = exports.TEST_MENU = exports.TEST_DISH = exports.TEST_NEW_DISH_NAME = exports.TEST_DISH_NAME = exports.TEST_HOST = exports.TEST_FILE_NAME = exports.TEST_PROTOCOL = exports.TEST_TOKEN = exports.TEST_HASH = exports.TEST_LOGIN = void 0;
exports.TEST_LOGIN = 'test login';
exports.TEST_HASH = 'test hash';
exports.TEST_TOKEN = 'test token';
exports.TEST_PROTOCOL = 'https';
exports.TEST_FILE_NAME = 'testFileName';
exports.TEST_HOST = 'testHost';
exports.TEST_DISH_NAME = 'test dish name';
exports.TEST_NEW_DISH_NAME = 'test new dish name';
exports.TEST_DISH = {
    _id: '1',
    name: exports.TEST_DISH_NAME,
    creation_date: new Date(),
};
exports.TEST_MENU = { menu: [exports.TEST_DISH] };
exports.TEST_REQUEST = {
    body: { login: 'test login', password: 'test password' },
    protocol: exports.TEST_PROTOCOL,
    headers: { 'auth-login': 'test auth login' },
    files: { file: { mv: jest.fn(), name: exports.TEST_FILE_NAME } },
    get: jest.fn().mockReturnValue(exports.TEST_HOST),
    dishName: exports.TEST_DISH,
    oldDishName: exports.TEST_DISH,
    newDishName: exports.TEST_DISH,
};
exports.TEST_RESPONSE = {};
exports.TEST_UNCONFIRMED_USER = {
    _id: '1',
    confirmed: false,
    creation_date: new Date(),
    login: exports.TEST_LOGIN,
    password: 'test password',
};
exports.TEST_CONFIRMED_USER = {
    _id: '2',
    confirmed: true,
    creation_date: new Date(),
    login: exports.TEST_LOGIN,
    password: 'test password2',
};
exports.TEST_DISH_UPDATE_PAYLOAD = {
    oldDishName: exports.TEST_DISH_NAME,
    newDishName: exports.TEST_NEW_DISH_NAME,
};
exports.TEST_DATA_RESPONSE = [{ id: '1', name: 'test name' }];
exports.TEST_ERROR_STACKTRACE = 'test error stacktrace';
exports.TEST_PATH = 'test path';
exports.TEST_FILE_DATA = 'test file data';
exports.TEST_ERROR = new Error(exports.TEST_ERROR_STACKTRACE);
exports.MOCK_FUNCTION = jest.fn();
//# sourceMappingURL=specConstants.js.map