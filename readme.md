# Simple MVC Router for Express.js

[![Build Status](https://secure.travis-ci.org/shuvalov-anton/next-done.png)](http://travis-ci.org/shuvalov-anton/next-done)


## Install

    npm i --save express-mvc-routes

## API

    // Create route:
    new Routes({
      url: String or Array of Strings,
      [controller: Function],
      [method: String],
      [middlewares: Function or Array of Function]
    });


    // CRUD Support:
    new Route.CRUD({
      url: String or Array of Strings,
      [middlewares: Function or Array of Function],
      controller: {
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
var routes         = require('./routes');
var controllers    = require('./controllers/');
var middlewares    = require('./middlewares/');
var RouteConstr    = require('express-mvc-routes');


var app            = express();

// Setup your app 
// ... 

// Bind `Route` constructor to your app.
RouteConstr(app);


// And bind your controllers to your routes
new Route({
  url: '/',
  controllers: controllers.render('index')
});

// And bind your controllers to your routes
new Route({
  url: '/styles.css',
  controllers: controllers.stylus(__dirname + '/main.styl')
});

new Route({
  method: 'get',
  url: '/admin',
  middlewares: middlewares.auth,
  controllers: controllers.render('admin')
});

new Route({
  method: 'post',
  url: '/analytics',
  controllers: controllers.something()
});

new Route({
  method: 'all',
  url: [routes.projects, routes.projects+'/*'],
  middlewares: checkAuth
});


new Route.CRUD({
  url: routes.users,
  middlewares: checkAuth,
  controller: {
    create: controllers.users.create,
    read: controllers.users.read
  }
});


new Route.CRUD({
  url: routes.user,
  middlewares: checkAuth,
  controller: {
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