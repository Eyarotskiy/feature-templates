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
var WebSocket_1 = __importDefault(require("./WebSocket"));
var specConstants_1 = require("../common/specConstants");
var Database_1 = __importDefault(require("../database/Database"));
describe('WebSocket', function () {
    var webSocket;
    var MOCK_IO = {
        on: jest.fn(),
        sockets: { emit: jest.fn() },
    };
    var MOCK_WEBSOCKET_CLIENT = {
        on: jest.fn(),
        emit: jest.fn(),
    };
    beforeEach(function () {
        Database_1.default.getMenu = jest.fn().mockReturnValue(specConstants_1.TEST_MENU);
        Database_1.default.clearMenu = jest.fn();
        Database_1.default.saveDish = jest.fn();
        Database_1.default.updateDish = jest.fn();
        Database_1.default.deleteDish = jest.fn();
        webSocket = new WebSocket_1.default(MOCK_IO);
        webSocket.client = MOCK_WEBSOCKET_CLIENT;
    });
    describe('initSocket', function () {
        it('should init IO socket connection', function () {
            webSocket.initSocket();
            expect(webSocket.io.on).toHaveBeenCalled();
        });
    });
    describe('initMenuRequests', function () {
        it('should init dish and menu event handlers', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, webSocket.initMenuRequests()];
                    case 1:
                        _a.sent();
                        expect(webSocket.client.on).toHaveBeenCalled();
                        expect(webSocket.client.emit)
                            .toHaveBeenCalledWith('getMenu', specConstants_1.TEST_MENU);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('emitError', function () {
        it('should emit error event', function () {
            webSocket.emitError(specConstants_1.TEST_ERROR_STACKTRACE);
            expect(webSocket.client.emit)
                .toHaveBeenCalledWith('menuError', specConstants_1.TEST_ERROR_STACKTRACE);
        });
    });
    describe('emitMenu', function () {
        it('should emit menu event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, webSocket.emitMenu()];
                    case 1:
                        _a.sent();
                        expect(webSocket.client.emit)
                            .toHaveBeenCalledWith('getMenu', specConstants_1.TEST_MENU);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should emit error', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Database_1.default.getMenu = jest.fn().mockImplementation(function () {
                            throw specConstants_1.TEST_ERROR;
                        });
                        return [4 /*yield*/, webSocket.emitMenu()];
                    case 1:
                        _a.sent();
                        expect(webSocket.client.emit)
                            .toHaveBeenCalledWith('menuError', 'Emit menu error');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('emitMenuToAll', function () {
        it('should emit menu event to all clients', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, webSocket.emitMenuToAll()];
                    case 1:
                        _a.sent();
                        expect(webSocket.io.sockets.emit)
                            .toHaveBeenCalledWith('getMenu', specConstants_1.TEST_MENU);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should emit error', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Database_1.default.getMenu = jest.fn().mockImplementation(function () {
                            throw specConstants_1.TEST_ERROR;
                        });
                        return [4 /*yield*/, webSocket.emitMenuToAll()];
                    case 1:
                        _a.sent();
                        expect(webSocket.client.emit)
                            .toHaveBeenCalledWith('menuError', 'Emit menu to all error');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('clearMenu', function () {
        it('should emit menu clear event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, webSocket.clearMenu()];
                    case 1:
                        _a.sent();
                        expect(Database_1.default.clearMenu).toHaveBeenCalled();
                        expect(webSocket.io.sockets.emit)
                            .toHaveBeenCalledWith('getMenu', specConstants_1.TEST_MENU);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should emit error', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Database_1.default.clearMenu = jest.fn().mockImplementation(function () {
                            throw specConstants_1.TEST_ERROR;
                        });
                        return [4 /*yield*/, webSocket.clearMenu()];
                    case 1:
                        _a.sent();
                        expect(webSocket.client.emit)
                            .toHaveBeenCalledWith('menuError', 'Menu clear error');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('saveDish', function () {
        it('should emit dish save event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, webSocket.saveDish(specConstants_1.TEST_DISH_NAME)];
                    case 1:
                        _a.sent();
                        expect(Database_1.default.saveDish).toHaveBeenCalledWith(specConstants_1.TEST_DISH_NAME);
                        expect(webSocket.io.sockets.emit)
                            .toHaveBeenCalledWith('getMenu', specConstants_1.TEST_MENU);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should emit error', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Database_1.default.saveDish = jest.fn().mockImplementation(function () {
                            throw specConstants_1.TEST_ERROR;
                        });
                        return [4 /*yield*/, webSocket.saveDish(specConstants_1.TEST_DISH_NAME)];
                    case 1:
                        _a.sent();
                        expect(webSocket.client.emit)
                            .toHaveBeenCalledWith('menuError', 'Dish save error');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('updateDish', function () {
        it('should emit dish update event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, webSocket.updateDish(specConstants_1.TEST_DISH_UPDATE_PAYLOAD)];
                    case 1:
                        _a.sent();
                        expect(Database_1.default.updateDish)
                            .toHaveBeenCalledWith(specConstants_1.TEST_DISH_NAME, specConstants_1.TEST_NEW_DISH_NAME);
                        expect(webSocket.io.sockets.emit)
                            .toHaveBeenCalledWith('getMenu', specConstants_1.TEST_MENU);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should emit error', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Database_1.default.updateDish = jest.fn().mockImplementation(function () {
                            throw specConstants_1.TEST_ERROR;
                        });
                        return [4 /*yield*/, webSocket.updateDish(specConstants_1.TEST_DISH_UPDATE_PAYLOAD)];
                    case 1:
                        _a.sent();
                        expect(webSocket.client.emit)
                            .toHaveBeenCalledWith('menuError', 'Dish update error');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('deleteDish', function () {
        it('should emit dish update event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, webSocket.deleteDish(specConstants_1.TEST_DISH_NAME)];
                    case 1:
                        _a.sent();
                        expect(Database_1.default.deleteDish).toHaveBeenCalledWith(specConstants_1.TEST_DISH_NAME);
                        expect(webSocket.io.sockets.emit)
                            .toHaveBeenCalledWith('getMenu', specConstants_1.TEST_MENU);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should emit error', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Database_1.default.deleteDish = jest.fn().mockImplementation(function () {
                            throw specConstants_1.TEST_ERROR;
                        });
                        return [4 /*yield*/, webSocket.deleteDish(specConstants_1.TEST_DISH_NAME)];
                    case 1:
                        _a.sent();
                        expect(webSocket.client.emit)
                            .toHaveBeenCalledWith('menuError', 'Dish delete error');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=WebSocket.spec.js.map