/// <reference types="node" />
import * as Http from "http";
export declare class HttpRoute {
    constructor({ path, method, callback }: {
        path?: string;
        method?: string;
        callback?: (args: HttpRouteArgs) => void;
    });
    method: string;
    path: string;
    callback: (args: HttpRouteArgs) => void;
}
export declare class HttpRouteArgs {
    PathArgs: Array<string>;
    PassString: string;
    Request: Http.IncomingMessage;
    Response: Http.ServerResponse;
}
export declare class HttpServer {
    constructor();
    private server;
    private gen_routes;
    private get_routes;
    private post_routes;
    AddRoute(route: HttpRoute): this;
    Run(port: number): this;
}
