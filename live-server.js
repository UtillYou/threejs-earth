var liveServer = require("live-server");
var locations = require('./api/locations.json')

var params = {
    port: 8181, // Set the server port. Defaults to 8080.
    host: "127.0.0.1", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    // root: "/public", // Set root directory that's being served. Defaults to cwd.
    // open: false, // When false, it won't load your browser by default.
    ignore: 'scss,my/templates', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 500, // Waits for all changes, before reloading. Defaults to 0 sec.
    // mount: [['/components', './node_modules']], // Mount a directory to a route.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [function (req, res, next) {
        // console.log(req.url);
        if (req.url === '/api/locations') {
            apiLocations(req, res);
        } else {
            next();
        }

    }] 
};
liveServer.start(params);


function apiLocations(req, res) {
    const body = JSON.stringify(locations);

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json'
    });
    res.end(body);
}