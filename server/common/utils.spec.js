"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils = __importStar(require("./utils"));
describe('utils', function () {
    describe('extractUserNames', function () {
        it('should return empty array', function () {
            var TEST_USERS = [
                {
                    _id: '1',
                    confirmed: false,
                    creation_date: new Date(),
                    login: 'test login',
                    password: 'test password',
                },
                {
                    _id: '2',
                    confirmed: false,
                    creation_date: new Date(),
                    login: 'test login 2',
                    password: 'test password 2',
                },
            ];
            expect(utils.extractUserNames(TEST_USERS)).toEqual([]);
        });
        it('should return an array of confirmed users', function () {
            var TEST_USERS = [
                {
                    _id: '1',
                    confirmed: true,
                    creation_date: new Date(),
                    login: 'test login',
                    password: 'test password',
                },
                {
                    _id: '2',
                    confirmed: false,
                    creation_date: new Date(),
                    login: 'test login 2',
                    password: 'test password 2',
                },
            ];
            expect(utils.extractUserNames(TEST_USERS)).toEqual(['test login']);
        });
    });
    describe('formatDate', function () {
        it('should return formatted date', function () {
            var TEST_DATE_1 = new Date('2022-01-30T12:56:35.659Z');
            jest.useFakeTimers().setSystemTime(TEST_DATE_1.getTime());
            expect(utils.formatDate()).toBe('30-01-2022 13:56');
            var TEST_DATE_2 = new Date('2022-01-30');
            jest.useFakeTimers().setSystemTime(TEST_DATE_2.getTime());
            expect(utils.formatDate()).toBe('30-01-2022 01:00');
        });
    });
});
//# sourceMappingURL=utils.spec.js.map