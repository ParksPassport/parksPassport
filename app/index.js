'use strict';

let angular = require('angular');
require('angular-route');
require('angular-animate');
require('angular-touch');
require('angular-ui-bootstrap');

let app = angular.module('app',
[ 'ngRoute' , 'ui.bootstrap' ]
);

require(__dirname + '/parks/parks.js')(app);
require(__dirname + '/users/user.js')(app);

app.config(['$routeProvider', function(router){
  router
   .when('/signup', {
    //  controller: 'UsersController',
    //  controllerAs: 'usersctrl',
     templateUrl: 'signup_in.html'
   })
   .when('/home', {
    //  controller: 'ParksController',
    //  controllerAs: 'parksctrl',
     templateUrl:  'home.html'
   });
  //  .when('/users', {
  //    controller: 'UsersController',
  //    controllerAs: 'usersctrl',
  //    templateUrl: 'home.html'
  //  });
}]);
