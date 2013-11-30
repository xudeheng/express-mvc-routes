# Simple MVC Router for Express.js

[![Build Status](https://secure.travis-ci.org/shuvalov-anton/next-done.png)](http://travis-ci.org/shuvalov-anton/next-done)


## Install

    npm i --save express-mvc-routes

## API

    // Create route:
    new Routes({
      urls: String or Array of Strings,
      [controller: Function],
      [method: String],
      [middlewares: Function or Array of Function]
    });


    // CRUD Support:
    new Route.CRUD({
      urls: String or Array of Strings,
      [middlewares: Function or Array of Function],
      controllers: {
        [create: Function],
        [read: Function],
        [update: Function],
        [del: Function],
      }
    });


## Example


```JS
/**
 * Module dependencies.
 */

var express        = require('express');
var controllers    = require('./controllers/');
var middlewares    = require('./middlewares/');
var app            = express();


// Bind `Route` constructor to your app.
var Route          = require('express-mvc-routes')(app);


// Setup your app 
// ... 


// And bind your controllers to your routes
new Route({
  urls: '/',
  controller: controllers.render('index')
});

// And bind your controllers to your routes
new Route({
  urls: '/styles.css',
  controller: controllers.stylus(__dirname + '/main.styl')
});

new Route({
  method: 'get',
  urls: '/admin',
  middlewares: middlewares.auth,
  controller: controllers.render('admin')
});

new Route({
  method: 'post',
  urls: '/analytics',
  controller: controllers.something()
});

new Route({
  method: 'all',
  urls: [routes.projects, routes.projects+'/*'],
  middlewares: checkAuth
});


new Route.CRUD({
  urls: routes.users,
  middlewares: checkAuth,
  controllers: {
    create: controllers.users.create,
    read: controllers.users.read
  }
});


new Route.CRUD({
  urls: routes.user,
  middlewares: checkAuth,
  controllers: {
    update: controllers.users.update,
    read: controllers.users.read,
    del: controllers.users.del
  }
});


// And start your app.
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```