'use strict';

/**
 * Create new route for express app.  
 */

var Route = function (options, app) {
  if (app) this.app = app;
  return this.createRoute(options);
};


Route.prototype.createRoute = function(options) {
  this.isValidOptions(options)
    ? this.app.get(
        options.url,
        options.middlewares || [],
        options.controller
      )
    : this.throwError();
};


Route.prototype.throwError = function() {
  throw new Error('Wrong `url` or `controller`.');
};


Route.prototype.isValidOptions = function(options) {
  return options.url && options.controller;
};


module.exports = function (app) {
  Route.prototype.app = app;
  return Route;
};