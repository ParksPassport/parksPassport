'use strict';
module.exports = function(app) {

  require('./../services/auth_service')(app);
  require('./../services/error_service')(app);

  app.controller('UsersController', ['$http', '$location', 'AuthService', 'ErrorService',
  function($http, $location, AuthService, ErrorService) {
    var mainRoute = 'http://localhost:3000/users';
    var vm = this;
    vm.users = ['users'];
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

    vm.createUser = function(user) {
      $http.post(mainRoute, user, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then(function(res) {
        vm.users = vm.users.filter((u) => u._id != user._id);
      });
    };

    vm.updateUser = function(user) {
      $http.put(mainRoute + '/' + user._id, user, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then((res) => {
        user.editing = false;
      }, (err) => console.log(err));
    };

    vm.toggleForm = function(user) {
      if (!user.editing) {
        user.backupName = user.name;
        user.editing = true;
      } else {
        user.name = user.backupName;
        user.editing = false;
      }
    };

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
};
