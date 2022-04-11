"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.extractUserNames = void 0;
function extractUserNames(users) {
    return users.filter(function (user) { return user.confirmed; }).map(function (user) { return user.login; });
}
exports.extractUserNames = extractUserNames;
exports.formatDate = function () {
    var date = new Date();
    return ('0' + date.getDate()).slice(-2) + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        date.getFullYear() + ' ' +
        ('0' + date.getHours()).slice(-2) + ':' +
        ('0' + date.getMinutes()).slice(-2);
};
//# sourceMappingURL=utils.js.map