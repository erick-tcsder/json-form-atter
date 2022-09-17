"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
var Fragment_1 = require("./Fragment");
var FromJSONParser_1 = require("./FromJSONParser");
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block(type, name, fields, validation, id) {
        var _this = _super.call(this, name, id) || this;
        _this.type = type;
        _this.fields = fields;
        _this.validation = validation;
        _this.FRAGMENT_TYPE = 'BLOCK';
        return _this;
    }
    Block.prototype.toObject = function () {
        var _a, _b, _c, _d;
        return {
            _id: this._id,
            type: this.type,
            name: (_a = this.name) !== null && _a !== void 0 ? _a : null,
            fields: (_c = (_b = this.fields) === null || _b === void 0 ? void 0 : _b.map(function (field) { return field.toObject(); })) !== null && _c !== void 0 ? _c : null,
            validation: (_d = this.validation) !== null && _d !== void 0 ? _d : null,
            FRAGMENT_TYPE: this.FRAGMENT_TYPE,
        };
    };
    Block.fromJSON = function (json, fromJSONParser) {
        if (fromJSONParser === void 0) { fromJSONParser = FromJSONParser_1.defaultFromJSONParser; }
        return fromJSONParser['BLOCK'](json);
    };
    return Block;
}(Fragment_1.Fragment));
exports.Block = Block;
