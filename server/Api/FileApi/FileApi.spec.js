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
var Api_1 = __importDefault(require("../Api"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var specConstants_1 = require("../../common/specConstants");
var FileApi_1 = __importDefault(require("./FileApi"));
describe('FileApi', function () {
    beforeEach(function () {
        Api_1.default.sendSuccess = jest.fn();
        Api_1.default.sendError = jest.fn();
        fs_1.default.existsSync = jest.fn().mockReturnValue(true);
        fs_1.default.mkdirSync = jest.fn();
    });
    describe('handleFileUploadRequest', function () {
        it("should create folder if it doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs_1.default.existsSync = jest.fn().mockReturnValue(false);
                        return [4 /*yield*/, FileApi_1.default.handleFileUploadRequest(specConstants_1.TEST_REQUEST, specConstants_1.TEST_RESPONSE)];
                    case 1:
                        _a.sent();
                        expect(fs_1.default.mkdirSync).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should send successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var expectedUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedUrl = specConstants_1.TEST_PROTOCOL + "://" + specConstants_1.TEST_HOST + "/" + specConstants_1.TEST_FILE_NAME;
                        return [4 /*yield*/, FileApi_1.default.handleFileUploadRequest(specConstants_1.TEST_REQUEST, specConstants_1.TEST_RESPONSE)];
                    case 1:
                        _a.sent();
                        expect(Api_1.default.sendSuccess)
                            .toHaveBeenCalledWith(specConstants_1.TEST_RESPONSE, { url: expectedUrl });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should send error in case of request failure', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path_1.default.join = jest.fn().mockImplementation(function () {
                            throw specConstants_1.TEST_ERROR;
                        });
                        return [4 /*yield*/, FileApi_1.default.handleFileUploadRequest(specConstants_1.TEST_REQUEST, specConstants_1.TEST_RESPONSE)];
                    case 1:
                        _a.sent();
                        expect(Api_1.default.sendError)
                            .toHaveBeenCalledWith(specConstants_1.TEST_RESPONSE, 500, specConstants_1.TEST_ERROR);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=FileApi.spec.js.map