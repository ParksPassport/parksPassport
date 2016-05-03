module.exports = function(app) {

  require('./../services/auth_service.js')(app);
  require('./../services/error_service')(app);

  app.controller('ParksController', ['AuthService','$http', '$location', 'ErrorService', function(AuthService, $http, $location, ErrorService) {
    const mainRoute = 'http://localhost:3000/parks';
    const vm = this;
    vm.parks = [];
    vm.error = ErrorService();

    vm.parks = ['park'];
    vm.getParks = function() {
      $http.get(mainRoute, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then(function (result) {
        vm.error = ErrorService(null);
        vm.parks = result.data;
        addMapData(result.data.data);
      }, (err) => {
        vm.error = ErrorService('Please Sign In');
        $location.path('/signup');
      });
    };

    vm.createPark = function(park) {
      $http.post(mainRoute, park, {
        headers: {
          token: AuthService.getToken()
        }
      })
        .then(function(res){
          console.log(res);
          vm.parks.push(res.data);
          vm.newPark = null;
        });
    };

    vm.getPark = function(park) {
      $http.get(mainRoute + '/' + park._id, {
        headers: {
          token: AuthService.getToken()
        }
      })
        .then(function (result) {
          vm.error = ErrorService(null);
          vm.people = result.data;
        }, (err) => {
          vm.error = ErrorService('Please Sign In');
          $location.path('/signup');
        });
    };
    vm.searchByName = function(parks) {
      $http.get('http://localhost:3000/search', parks, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then (function (result) {
        vm.error = ErrorService(null);
        vm.parks = result.data;
      }, (err) => {
        vm.error = ErrorService('Please Sign In');
        $location.path('/signup');
      });
    };


    vm.parksByState = function(parks) {
      $http.get('http://localhost:3000/state', parks, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then (function (result) {
        vm.error = ErrorService(null);
        vm.parks = result.data;
      }, (err) => {
        vm.error = ErrorService('Please Sign In');
        $location.path('/signup');
      });
    };

  }]);
  };
