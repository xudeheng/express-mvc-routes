'use strict';

/**
 * Simple controllers for testing.
 * @type {Object} contains methods: .send
 */
module.exports = {
  /**
   * Wrapper for express res.send() method.
   */
  send: function (code, msg) {
    return function (req,res) {
      res.send(code, msg);
    };
  },
  /**
   * Wrapper for express res.send() method. Do req.send(code, req.locals.msg)
   */
  sendLocalMsg: function (code) {
    return function (req, res) {
      res.json(code, res.locals.messages);
    };
  }
};