"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFromJSONParser = void 0;
var Block_1 = require("./Block");
var Input_1 = require("./Input");
exports.defaultFromJSONParser = {
    BLOCK: function (json) {
        var _a;
        return new Block_1.Block(json['type'], json['name'], (_a = json['fields']) === null || _a === void 0 ? void 0 : _a.map(function (field) {
            return exports.defaultFromJSONParser[field['FRAGMENT_TYPE']](field, exports.defaultFromJSONParser);
        }), json['validation'], json['_id']);
    },
    INPUT: function (json) {
        if (!json['name'])
            throw new Error('Input name is required');
        if (!json['type'])
            throw new Error('Input type is required');
        return new Input_1.Input(json['type'], json['name'], json['validation'], json['options'], json['_id'], json['excludeFromValidation']);
    },
};
