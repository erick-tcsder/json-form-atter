"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fragment = void 0;
var uuid_1 = require("uuid");
var Fragment = /** @class */ (function () {
    function Fragment(name, _id) {
        this.name = name;
        this._id = _id;
        this.FRAGMENT_TYPE = "FRAGMENT";
        if (!_id)
            this._id = (0, uuid_1.v4)();
    }
    Fragment.prototype.toObject = function () {
        throw new Error('to Object not implemented');
    };
    Fragment.fromJSON = function (obj, fromJSONParser) {
        return new Fragment(obj['name'], obj['_id']);
    };
    return Fragment;
}());
exports.Fragment = Fragment;
