module.exports = function(app) {

  require('./../services/auth_service.js')(app);
  require('./../services/error_service')(app);

  app.controller('GeoLocController', ['AuthService','$http', '$location', 'ErrorService', function(AuthService, $http, $location, ErrorService) {
    const mainRoute = 'http://localhost:3000/geolocation';
    const vm = this;
    vm.parks = [];
    vm.error = ErrorService();

    vm.closeParks = ['closeParks'];
    vm.getCloseParks = function() {
      $http.get(mainRoute, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then(function (result) {
        vm.error = ErrorService(null);
        vm.parks = result.data;
        console.log('result in geolocation', result.data);
        addGeoMapData(result.data.data);
      }, (err) => {
        vm.error = ErrorService('Please Sign In');
        $location.path('/signup')
        console.log(err);
      });
    };

  });

};
