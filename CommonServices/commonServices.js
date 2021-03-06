process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config');
var express = require("express");
var bodyParser = require("body-parser");

var server = express();

// configure server to use bodyParser()
// this will let us get the data from a POST
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/txDetails.js")(server);

// START THE SERVER
server.listen(config.port);
console.log('Common Services (Direct Access) - server running @ ' + config.url);
console.log('Common Services (Via OpenIG) - server running @ ' + config.OpenIG_url);
