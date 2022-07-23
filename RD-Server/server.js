const { HttpRoute, HttpServer, HttpRouteArgs } = require("./KingsoftUtils/all");
const fs = require("fs");

const config = require("./conf.json");

var server = new HttpServer();

/**
 * @type {[{token: string, obj: {name: string, driver1: {name: string, short: string, number: string, team: string}, driver2: {name: string, short: string, number: string, team: string} }}]}
 */
var teams = config.default.teams;

/**
 * @type {[{name: string, short: string, number: string, team: string, token: string}]}
 */
var drivers = config.default.drivers;

/**
 * @type {[{type: string, content: string, title: string}]}
 */
var casts = [];

var session_data = config.default.session_data;

server.AddRoute(new HttpRoute({
    path: "/ui/<pass>",
    method: "get",
    callback: (args) => {

        var content_type = "text/plain";

        if (args.PassString.endsWith(".js"))
            content_type = "application/javascript";
        if (args.PassString.endsWith(".css"))
            content_type = "text/css";
        if (args.PassString.endsWith(".html"))
            content_type = "text/html";
        if (args.PassString.endsWith(".png"))
            content_type = "image/png";

        args.Response.writeHead(200, {
            'Content-Type': content_type
        });
        var uri = "./client" + args.PassString;
        args.Response.write(fs.existsSync(uri) ? fs.readFileSync(uri) : "ERROR: 404");
        args.Response.end();
    }
}));

server.AddRoute(new HttpRoute({
    path: "/login/admin/<var>",
    method: "get",
    callback: (args) => {
        var res = "failed";
        if (args.PathArgs[0] == config.tokens.admin) {
            res = "succeeded";
        }

        args.Response.writeHead(200, {
            'Content-Type': "text/plain"
        });
        args.Response.write(res);
        args.Response.end();
    }
}));

server.AddRoute(new HttpRoute({
    path: "/login/driver/<var>",
    method: "get",
    callback: (args) => {
        var res = "failed";
        var dToken = args.PathArgs[0];

        for (let i = 0; i < drivers.length; i++) {
            const driver = drivers[i];
            if (driver.token == dToken) {
                res = "succeeded";
                break;
            }
        }

        args.Response.writeHead(200, {
            'Content-Type': "text/plain"
        });
        args.Response.write(res);
        args.Response.end();
    }
}));

server.AddRoute(new HttpRoute({
    path: "/data/<var>/add/team/<var>/<var>/<var>/<var>/<var>/<var>/<var>/<var>/<var>/<var>",
    method: "get",
    callback: (args) => {
        var token = args.PathArgs[0];
        var team_name = args.PathArgs[1];
        var team_token = args.PathArgs[2];

        var _drivers = [
            {
                name: args.PathArgs[3],
                short: args.PathArgs[4],
                number: args.PathArgs[5],
                team: team_name
            },
            {
                name: args.PathArgs[7],
                short: args.PathArgs[8],
                number: args.PathArgs[9],
                team: team_name
            }
        ]

        var res = "failed";
        if (token == config.tokens.admin) {
            teams.push({token: team_token, obj: { name: team_name, driver1: _drivers[0], driver2: _drivers[1] }});
            drivers.push(
                {
                    name: _drivers[0].name,
                    short: _drivers[0].short,
                    number: _drivers[0].number,
                    team: _drivers[0].team,
                    token: args.PathArgs[6]
                },
                {
                    name: _drivers[1].name,
                    short: _drivers[1].short,
                    number: _drivers[1].number,
                    team: _drivers[1].team,
                    token: args.PathArgs[10]
                });
            res = "succeeded";
        };

        args.Response.writeHead(200, {
            'Content-Type': "text/plain"
        });
        args.Response.write(res);
        args.Response.end();
    }
}));

server.AddRoute(new HttpRoute({
    path: "/data/<var>/set/session/<var>/<var>",
    method: "get",
    callback: (args) => {

        var res = "failed";

        if (args.PathArgs[0] == config.tokens.admin && session_data[args.PathArgs[1]]) {
            session_data[args.PathArgs[1]] = args.PathArgs[2];
            res = "succeeded";
        }

        args.Response.writeHead(200, {
            'Content-Type': "text/plain"
        });
        args.Response.write(res);
        args.Response.end();
    }
}));

server.AddRoute(new HttpRoute({
    path: "/data/all",
    method: "get",
    callback: (args) => {

        var _teams = [];

        for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
            _teams.push(team.obj);
        }

        var data = {
            data: {
                session: session_data,
                teams: _teams,
                casts: casts
            }
        };

        args.Response.writeHead(200, {
            'Content-Type': "application/json"
        });
        args.Response.write(JSON.stringify(data));
        args.Response.end();
    }
}));

server.AddRoute(new HttpRoute({
    path: "/data/driver/<var>",
    method: "get",
    callback: (args) => {

        var target = null;

        for (let i = 0; i < drivers.length; i++) {
            const driver = drivers[i];
            if (driver.token == args.PathArgs[0])
                target = driver;
        }

        var data = {
            driver: target
        };

        args.Response.writeHead(200, {
            'Content-Type': "application/json"
        });
        args.Response.write(JSON.stringify(data));
        args.Response.end();
    }
}));

server.AddRoute(new HttpRoute({
    path: "/data/admindata/<var>",
    method: "get",
    callback: (args) => {

        var data = {};
        
        if (args.PathArgs[0] == config.tokens.admin) {
            data = {
                teams: teams,
                drivers: drivers,
                tokens: config.tokens
            };
        }

        args.Response.writeHead(200, {
            'Content-Type': "application/json"
        });
        args.Response.write(JSON.stringify(data));
        args.Response.end();
    }
}));

server.AddRoute(new HttpRoute({
    path: "/admin/broadcast/<var>/<var>/<var>/<var>",
    method: "get",
    callback: (args) => {

        var res = "failed";
        var token = args.PathArgs[0];
        var cast_type = args.PathArgs[1];
        var cast_title = args.PathArgs[2];
        var cast_content = args.PathArgs[3];
        
        if (token == config.tokens.admin) {
            casts.push({type: cast_type, title: cast_title, content: cast_content});
        }

        args.Response.writeHead(200, {
            'Content-Type': "text/plain"
        });
        args.Response.write(res);
        args.Response.end();
    }
}));

server.Run(3001);