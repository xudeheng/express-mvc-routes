# Simple MVC Router for Express.js


## Install

    npm i --save mvc-routes-for-express

## API

    new Routes({
      url: String of Array of Strings,
      [controller: Function],
      [method: String],
      [middlewares: Function or Array of Function]
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
var RouteConstr    = require('mvc-routes-for-express');


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



// And start your app.
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```