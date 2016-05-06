require(__dirname + '/../../app/index.js');

const angular = require('angular');

require('angular-mocks');

describe('it should test something', () => {
  var ParksController;
  it('should have a test', ()=> {
    expect(false).toBe(false);
  });

  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.inject(function($controller) {
    ParksController = $controller('ParksController');
  }));

  it('should construct a controller', () => {
    expect(typeof ParksController).toBe('object');
    expect(typeof ParksController.createPark).toBe('function');
  });

  describe('REST test', () => {
    var $httpBackend;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(()=> {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get create a new park', () => {
      $httpBackend.expectPOST('http://localhost:3000/parks', {name: 'test park name'})
        .respond(200, {name: 'test park name', _id: 'uniqueid'});
      ParksController.createPark({name: 'test park name'});
      $httpBackend.flush();
      expect(ParksController.parks.length).toBeGreaterThan(0);
      expect(ParksController.parks[1].name).toBe('test park name')
    });

  //   it('should get all parks', () => {
  //     $httpBackend.expectGET('http://localhost:3000/parks')
  //     .respond(200, {data: [{name: 'test park'}]});
  //     ParksController.getParks();
  //     $httpBackend.flush();
  //     expect(ParksController.parks.length).toBe(1);
  //     expect(ParksController.parks[0].name).toBe('test park');
  //   });





});
