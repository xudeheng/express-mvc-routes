'use strict';

/**
 * Create new route for express app.  
 */

var Route = function (options, app) {
  if (app) this.app = app;
  return this.createRoute(options);
};


Route.prototype.createRoute = function(options) {

  options
    ? this.unfoldOptions(options)
    : this.throwError('Expected `options`.');
  
  this.isValidOptions(options)
    ? this.appendToApp(options)
    : this.throwError('Expected `url`.');

};


Route.prototype.appendToApp = function(options) {

  var method = options.method;

  for (var i = options.url.length - 1; i >= 0; i--) {
    
    options.controller
      ? this.app[method](
          options.url[i],
          options.middlewares,
          options.controller
        )
      : this.app[method](
        options.url[i],
        options.middlewares
      );

  }

};


Route.prototype.throwError = function(msg) {
  throw new Error(msg);
};


Route.prototype.unfoldOptions = function(o) {
  o.method = o.method && o.method.toLowerCase() || 'get';
  o.url = [].concat(o.url);
  !o.middlewares && (o.middlewares = []);
};


Route.prototype.isValidOptions = function(options) {
  return !!options.url;
};


module.exports = function (app) {
  Route.prototype.app = app;
  return Route;
};