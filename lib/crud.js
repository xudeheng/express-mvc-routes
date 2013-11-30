'use strict';

/**
 * Module dependencies.
 */
var Route          = require('./route.js');

// End of dependencies.


var RouteCRUD = module.exports = function(options) {
  if (!options.controllers) return;
  for (var key in this.map) this.createRoute(options.controllers[key], this.map[key], options);
  return options;
};


RouteCRUD.prototype.createRoute = function(controller, method, options) {
  if (!controller) return;
  options.method = method;
  options.controller = controller;
  new Route(options);
  delete options.controller;
};


RouteCRUD.prototype.map = {
  create: 'post',
  read: 'get',
  update: 'put',
  del: 'del'
};