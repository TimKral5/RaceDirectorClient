"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
class StringUtils {
    static Replace(self, str, val) {
        var parts = self.split(str);
        var res = parts[0];
        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];
            res += val + part;
        }
        return res;
    }
}
exports.StringUtils = StringUtils;
//# sourceMappingURL=StringUtlils.js.map