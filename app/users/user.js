// 'use strict';
module.exports = function(app) {

  require('./../services/auth_service')(app);
  require('./../services/error_service')(app);

  app.controller('UsersController', ['$http', '$location', 'AuthService', 'ErrorService', '$window', '$uibModal', '$scope',
  function($http, $location, AuthService, ErrorService, $window, $uibModal, $scope) {
    var mainRoute = 'http://localhost:3000/users';
    var vm = this;
    vm.list = [];
    vm.users = {};
    vm.error = ErrorService();
    vm.users = ['user'];

    vm.getUsers = function() {
      $http.get(mainRoute, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then(function (result) {
        vm.error = ErrorService(null);
        vm.users = result.data.users;
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

    vm.getList = function(user) {
      $http.get(mainRoute + '/' + user._id + '/list', {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then((res) => {
        vm.list = res.data.list;
      });
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

    vm.currentUser = function() {
      vm.name = $window.localStorage.name;
      vm.list = JSON.parse($window.localStorage.list);
      console.log(vm.list)
    }

    vm.addPark = function(park) {
      $http.put('http://localhost:3000/addpark/' + park._id, {}, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then(() => {
        vm.list.push({item: park, completed: false});
        console.log('added park', vm.list);
        $window.localStorage.list = JSON.stringify(vm.list);
      }, (err) => {
        console.log(err);
      });


    }
    vm.openSignIn = function() {
      vm.error = ErrorService(null);
      var options = {
        templateUrl: 'myModalContent.html'
      };
      $uibModal.open(options).result.then(function(user) {
        AuthService.signIn(user, (err, res) => {
          if (err) {
            // vm.openSignIn();
            return vm.error = ErrorService('Problem Signing In');
          }

          vm.error = ErrorService(null);
          $location.path('/home');
        });
      });
    };

  }]);
};
