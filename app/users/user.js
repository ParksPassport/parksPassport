'use strict';

const angular = require('angular');
require('angular-route');

//are we calling this parks app?
const app = angular.module('app', ['ngRoute']);

require('./../services/auth_service')(app);
require('./../services/error_service')(app);

app.controller('UserController', ['$http', '$location', 'AuthService', 'ErrorService',
function($http, $location, AuthService, ErrorService) {
  var mainRoute = 'http://localhost:3000/users';
  var vm = this;
  vm.users = ['users']
  vm.error = ErrorService();

  vm.getUsers = function() {
    $http.get(mainRoute, {
      headers: {
        token: AuthService.getToken()
      }
    })
    .then(function (result) {
      vm.error = ErrorService(null);
      vm.people = result.data;
    }, (err) => {
      vm.error = ErrorService('Please Sign In');
      console.log(err);
      $location.path('/signup');
    });
  };

  vm.


// Auth Routes
  vm.signUp = function(user) {
    AuthService.createUser(user, function(err) {
      if (err) return vm.error = ErrorService('There was a problem creating a user');
      vm.error = ErrorService(null);
      $location.path('/home');
    });
  };

  vm.signOut = function() {
    AuthService.signOut(() => {
      $location.path('/signup');
    });
  };

  vm.signIn = function(user) {
    AuthService.signIn(user, (err) => {
      if (err) return vm.error = ErrorService('Problem Signing In');
      vm.error = ErrorService(null);
      $location.path('/home');
    });
  };

}]);
