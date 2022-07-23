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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServer = exports.HttpRouteArgs = exports.HttpRoute = void 0;
const Http = __importStar(require("http"));
const StringUtlils_1 = require("./StringUtlils");
class HttpRoute {
    constructor({ path = "/", method = "", callback = (args) => { } }) {
        this.path = path;
        this.method = method;
        this.callback = callback;
    }
}
exports.HttpRoute = HttpRoute;
class HttpRouteArgs {
}
exports.HttpRouteArgs = HttpRouteArgs;
class HttpServer {
    constructor() {
        this.gen_routes = [];
        this.get_routes = [];
        this.post_routes = [];
        this.server = Http.createServer((req, res) => {
            var args = new HttpRouteArgs();
            args.Request = req;
            args.Response = res;
            args.PassString = "";
            var url = req.url.split("/");
            var called = false;
            iterate(this.gen_routes);
            switch (req.method.toLowerCase()) {
                case "get":
                    iterate(this.get_routes);
                    break;
                case "post":
                    iterate(this.post_routes);
                    break;
            }
            function iterate(routes) {
                for (let i = 0; i < routes.length; i++) {
                    args.PathArgs = [];
                    const route = routes[i];
                    const route_url = route.path.split("/");
                    var valid = true;
                    var passed = false;
                    if (route_url.length == url.length
                        || (route_url[route_url.length - 1] == "<pass>" && route_url.length <= url.length)) {
                        for (let j = 0; j < url.length; j++) {
                            if (url[j] == route_url[j] ||
                                route_url[j] == "<var>" ||
                                route_url[j] == "<pass>") {
                                if (route_url[j] == "<var>") {
                                    args.PathArgs.push(StringUtlils_1.StringUtils.Replace(url[j], "%20", " "));
                                }
                                if (route_url[j] == "<pass>") {
                                    var res = "";
                                    for (let x = j; x < url.length; x++) {
                                        res += "/" + url[x];
                                    }
                                    args.PassString = res;
                                    passed = true;
                                    break;
                                }
                            }
                            else {
                                valid = false;
                                break;
                            }
                        }
                        if (valid) {
                            route.callback(args);
                            called = true;
                            break;
                        }
                    }
                }
            }
            if (!called) {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                }).end("<h1>404</h1>");
            }
        });
    }
    AddRoute(route) {
        switch (route.method.toLowerCase()) {
            case "":
                this.gen_routes.push(route);
                break;
            case "get":
                this.get_routes.push(route);
                break;
            case "post":
                this.post_routes.push(route);
                break;
        }
        return this;
    }
    Run(port) {
        this.server.listen(port);
        return this;
    }
}
exports.HttpServer = HttpServer;
//# sourceMappingURL=HttpServer.js.map