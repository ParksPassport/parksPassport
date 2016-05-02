'use strict';

let angular = require('angular');
require('angular-route');

let app = angular.module('app',
[ 'ngRoute' ]
);

require(__dirname + '/parks/parks.js')(app);
require(__dirname + '/users/user.js')(app);

app.config(['$routeProvider', function(router){
  router
   .when('/signup', {
     controller: 'UsersController',
     controllerAs: 'usersctrl',
     templateUrl: 'signup_in.html'
   })
   .when('/home', {
     controller: 'ParksController',
     controllerAs: 'parksctrl',
     templateUrl:  'home.html'
   });
}]);
