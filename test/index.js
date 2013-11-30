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
var Route          = require('../lib/route.js')(app);

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
      url: '/plain',
      controller: controllers.send(200)
    });

    request(app)
      .get('/plain')
      .expect(200, done);
  
  });

    /**
   *  .url + .method + .controller
   */
  it('Must returns 200', function(done){
    
    new Route({
      method: 'post',
      url: '/plain/post',
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
      url: '/plain/middleware',
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
      url: '/plain/middlewares',
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
  it('Must returns 200 and res.body must contains ["Hello", "World"]', function(done){



    var route = new Route({
      url: ['/plain/multiple/url/1','/plain/multiple/url/2'],
      middlewares: [
        middlewares.addLocalMsg('Hello'),
        middlewares.addLocalMsg('World')
      ],
      controller: controllers.sendLocalMsg(200)
    });

    var counter = route.url.length;
    var next = function() {
      --counter
        ? null
        : done();
    };


    request(app)
      .get('/plain/multiple/url/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert('Hello' === res.body[0]);
        assert('World' === res.body[1]);
        next();
    });

    request(app)
      .get('/plain/multiple/url/2')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert('Hello' === res.body[0]);
        assert('World' === res.body[1]);
        next();
    });

  });


  /**
   *  .url[] + .middleware[] + .controller
   */
  it('Must returns 200 for all CRUD map', function(done){

    var route = new Route.CRUD({
      url: '/crud',
      middlewares: [
        middlewares.addLocalMsg('Hello'),
        middlewares.addLocalMsg('World')
      ],
      controller: {
        create: controllers.sendLocalMsg(200),
        read: controllers.sendLocalMsg(200),
        update: controllers.sendLocalMsg(200),
        del: controllers.sendLocalMsg(200)
      }
    });

    var counter = Object.keys(route.controller).length;
    var next = function() {
      --counter
        ? null
        : done();
    };


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