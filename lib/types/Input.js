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
exports.Input = void 0;
var Fragment_1 = require("./Fragment");
var FromJSONParser_1 = require("./FromJSONParser");
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input(type, 
    /**
     * Name will be used as the key in the input object
     */
    name, validation, options, id, excludeFromValidation) {
        if (excludeFromValidation === void 0) { excludeFromValidation = false; }
        var _this = _super.call(this, name, id) || this;
        _this.type = type;
        _this.validation = validation;
        _this.options = options;
        _this.excludeFromValidation = excludeFromValidation;
        _this.FRAGMENT_TYPE = "INPUT";
        return _this;
    }
    Input.prototype.toObject = function () {
        var _a, _b;
        return {
            _id: this._id,
            name: this.name,
            type: this.type,
            validation: (_a = this.validation) !== null && _a !== void 0 ? _a : null,
            options: (_b = this.options) !== null && _b !== void 0 ? _b : null,
            excludeFromValidation: this.excludeFromValidation,
            FRAGMENT_TYPE: this.FRAGMENT_TYPE
        };
    };
    Input.fromJSON = function (obj, fromJSONParser) {
        if (fromJSONParser === void 0) { fromJSONParser = FromJSONParser_1.defaultFromJSONParser; }
        return fromJSONParser['INPUT'](obj);
    };
    return Input;
}(Fragment_1.Fragment));
exports.Input = Input;
