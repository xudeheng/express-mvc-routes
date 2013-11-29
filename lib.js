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


// Static constructor for CRUD
Route.CRUD = function(options) {

  var map = {
    create: 'post',
    read: 'get',
    update: 'put',
    del: 'del'
  };
  var keys = Object.keys(map);
  var _options = {};

  for (var i = keys.length - 1; i >= 0; i--) {
    if (!options.controller[keys[i]]) continue;
    _options.url = options.url;
    _options.middlewares = options.middlewares;
    _options.controller = options.controller[keys[i]];
    _options.method = map[keys[i]];
    new Route(_options);
  }

};


module.exports = function (app) {
  Route.prototype.app = app;
  return Route;
};