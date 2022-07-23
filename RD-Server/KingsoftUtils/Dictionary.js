"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dictionary = void 0;
class Dictionary {
    constructor(keys = [], values = []) {
        this._keys = keys;
        this._values = values;
    }
    get(index) {
        var i = this._keys.indexOf(index);
        if (i != -1)
            return this._values[i];
        return undefined;
    }
    set(index, value) {
        var i = this._keys.indexOf(index);
        if (i == -1) {
            this._keys.push(index);
            this._values.push(value);
        }
        else {
            this._values[i] = value;
        }
    }
    get keys() {
        return this._keys;
    }
    get values() {
        return this._values;
    }
    get length() {
        return this._keys.length;
    }
    get string_object() {
        var res = {};
        for (let i = 0; i < this._keys.length; i++) {
            const key = this._keys[i];
            const value = this._values[i];
            res[key] = value;
        }
        return res;
    }
    get num_object() {
        var res = {};
        for (let i = 0; i < this._keys.length; i++) {
            const key = this._keys[i];
            const value = this._values[i];
            res[key] = value;
        }
        return res;
    }
    get elements() {
        var res = [];
        for (let i = 0; i < this._keys.length; i++) {
            const key = this._keys[i];
            const value = this._values[i];
            res.push({ key: key, value: value });
        }
        return res;
    }
}
exports.Dictionary = Dictionary;
//# sourceMappingURL=Dictionary.js.map