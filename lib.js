'use strict';

/**
 * Create new route for express app.  
 */

var Route = function (options, app) {
  if (app) this.app = app;
  return this.createRoute(options);
};


Route.prototype.createRoute = function(options) {

  options ? this.unfoldOptions : this.throwError('Expected `options`.');
  
  this.isValidOptions(options)
    ? this.app[options.method.toLover || 'get'](
        options.url,
        options.middlewares || [],
        options.controller
      )
    : this.throwError('Wrong `url` or `controller`.');

};


Route.prototype.throwError = function(msg) {
  throw new Error(msg);
};


Route.prototype.unfoldOptions = function(o) {
  o.method = o.method && o.method.toLowerCase() || 'get';
  o.middlewares = o.middlewares || [];
};


Route.prototype.isValidOptions = function(options) {
  return options.url && options.controller;
};


module.exports = function (app) {
  Route.prototype.app = app;
  return Route;
};