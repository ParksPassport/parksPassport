'use strict';

let angular = require('angular');
require('angular-route');

require(__dirname + '/parks/parks.js');
require(__dirname + '/users/users.js');

let app = angular.module('app',
  [
    'users'
     ,'parks'
     ,'ngRoute'
  ]
 );


app.config(['$routeProvider', function(router){
  router
   .when('/signup', {
     controller: 'UsersController',
     controllerAs: 'usersctrl',
     templateUrl: 'signup-in.html'
   })
   .when('/home', {
     controller: 'ParksController',
     controllerAs: 'parksctrl',
     templateUrl:  'home.html'
   });
}]);
