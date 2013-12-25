'use strict';

/**
 * Module dependencies.
 */
var Crud           = require('./crud');
var Route          = require('./route');

// End of dependencies.


module.exports = function (app) {
  Route.prototype.app = app;
  Route.CRUD = Crud;
  return Route;
};