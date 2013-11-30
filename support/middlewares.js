'use strict';

/**
 * Simple controllers for testing.
 * @type {Object} contains methods: .send
 */
module.exports = {
  /**
   * Wrapper for express res.send() method.
   */
  addLocalMsg: function (message) {
    return function (req,res, next) {
      res.locals.messages = res.locals.messages || [];
      res.locals.messages.push(message);
      next();
    };
  }
};