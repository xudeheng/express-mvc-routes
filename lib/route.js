'use strict';

/**
 * Module dependencies.
 */
var error            = require('./error');

// End of dependencies.


/**
 * Create new route for express app.  
 */

var Route = module.exports = function (options) {

  this.options = this.parseOptions(options);
  this.createRoute(this.options);

  return this.options;

};


Route.prototype.parseOptions = function(options) {

  if (!options) error('Expected `options`.');
  if (!options.urls) error('Expected `.urls`.');
  if (!options.middlewares) options.middlewares = [];

  options.urls = [].concat(options.urls);
  options.method = options.method || 'get';
  options.method = options.method.toLowerCase();


  return options;

};


Route.prototype.createRoute = function(options) {

  var args = [];
  var method = options.method;

  for (var i = options.urls.length - 1; i >= 0; i--) {
    args[0] = options.urls[i];
    args[1] = options.middlewares;
    if (options.controller) args[2] = options.controller;
    this.app[method].apply(this.app, args);
  }

};