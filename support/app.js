'use strict';

/**
 * Module dependencies.
 */

var express = require('express');

// End of dependencies


var app = module.exports = express();
    app.set('port', 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);