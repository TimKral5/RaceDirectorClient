"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugConsole = void 0;
class DebugConsole {
    set debugMode(v) {
        this._debugMode = v;
    }
    Log(data) {
        if (this._debugMode)
            console.log(data);
    }
}
exports.DebugConsole = DebugConsole;
//# sourceMappingURL=Console.js.map