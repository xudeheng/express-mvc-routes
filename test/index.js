/* globals describe, it */

'use strict';

/**
 * Module dependencies.
 */
var app            = require('../support/app');
var controllers    = require('../support/controllers');
var middlewares    = require('../support/middlewares');
var request        = require('supertest');
var assert         = require('assert');
var Countdown      = require('next-done');
var Route          = require('../')(app);

// End of dependencies.


describe('new Route()', function(){

  /**
   * No route
   */
  it('Must returns 404', function(done){
    request(app)
      .get('/plaint')
      .expect(404, done);
  });


  /**
   *  .url + .controller
   */
  it('Must returns 200', function(done){
    
    new Route({
      urls: '/plain',
      controller: controllers.send(200)
    });

    request(app)
      .get('/plain')
      .expect(200, done);
  
  });


    /**
   *  .url[] + .controller
   */
  it('Must returns 200 ', function(done){


    var route = new Route({
      urls: ['/plain/multiple/url/1','/plain/multiple/url/2'],
      controller: controllers.sendLocalMsg(200)
    });

    var next = new Countdown(route.urls.length, done);


    request(app)
      .get('/plain/multiple/url/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        next();
    });

    request(app)
      .get('/plain/multiple/url/2')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        next();
    });

  });


    /**
   *  .url + .method + .controller
   */
  it('Must returns 200', function(done){
    
    new Route({
      method: 'post',
      urls: '/plain/post',
      controller: controllers.send(200)
    });

    request(app)
      .post('/plain/post')
      .expect(200, done);
  
  });

  /**
   *  .url + .middleware + .controller
   */
  it('Must returns 200 and res.body must contains "Hello"', function(done){
    
    new Route({
      urls: '/plain/middleware',
      middlewares: middlewares.addLocalMsg('Hello'),
      controller: controllers.sendLocalMsg(200)
    });

    request(app)
      .get('/plain/middleware')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert('Hello' === res.body[0]);
        done();
    });
  
  });


  /**
   *  .url + .middleware[] + .controller
   */
  it('Must returns 200 and res.body must contains ["Hello", "World"]', function(done){
    
    new Route({
      urls: '/plain/middlewares',
      middlewares: [
        middlewares.addLocalMsg('Hello'),
        middlewares.addLocalMsg('World')
      ],
      controller: controllers.sendLocalMsg(200)
    });

    request(app)
      .get('/plain/middlewares')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert('Hello' === res.body[0]);
        assert('World' === res.body[1]);
        done();
    });
  
  });


  /**
   *  .url[] + .middleware[] + .controller
   */
  it('Must returns 200 for all CRUD map', function(done){

    var route = new Route.CRUD({
      urls: '/crud',
      middlewares: [
        middlewares.addLocalMsg('Hello'),
        middlewares.addLocalMsg('World')
      ],
      controllers: {
        create: controllers.sendLocalMsg(200),
        read: controllers.sendLocalMsg(200),
        update: controllers.sendLocalMsg(200),
        del: controllers.sendLocalMsg(200)
      }
    });

    var next = new Countdown(Object.keys(route.controllers).length, done);

    request(app)
      .get('/crud')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert('Hello' === res.body[0]);
        assert('World' === res.body[1]);
        next();
    });

    request(app)
      .post('/crud')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert('Hello' === res.body[0]);
        assert('World' === res.body[1]);
        next();
    });

    request(app)
      .put('/crud')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert('Hello' === res.body[0]);
        assert('World' === res.body[1]);
        next();
    });

    request(app)
      .post('/crud')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert('Hello' === res.body[0]);
        assert('World' === res.body[1]);
        next();
    });

  });

});