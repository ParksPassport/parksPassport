require(__dirname + '/../../app/index.js');

const angular = require('angular');

require('angular-mocks');

describe('it should test something', () => {
  var UsersController;
  it('should have a test', ()=> {
    expect(false).toBe(false);
  });

  // beforeEach(angular.mock.module('app'));
  // beforeEach(angular.mock.inject(function($controller) {
  //   UsersController = $controller('UsersController');
  // }));
  //
  // it('should construct a controller', () => {
  //   expect(typeof UsersController).tobe('object');
  //   expect(typeof UsersController.createUser).toBe('function');
  // });
  //
  // describe('REST test', () => {
  //   var $httpBackend;
  //
  //   beforeEach(angular.mock.inject(function(_$httpBackend_) {
  //     $httpBackend = _$httpBackend_;
  //   }));
  //
  //   afterEach(()=> {
  //     $httpBackend.verifyNoOutstandingExpectation();
  //     $httpBackend.verifyNoOutstandingRequest();
  //   });
  //
  //   it('should get all users', () => {
  //     $httpBackend.expectGET('http://localhost:3000/users', {name: 'test user name'})
  //       .respond(200, {name: 'test user name', password: 'password', _id: 'uniqueid'});
  //     UsersController.createUser({name: 'test user name'});
  //     $httpBackend.flush();
  //     expect(UsersController.users.length).toBeGreaterThan(0);
  //     expect(UsersController.users[1].name).toBe('test user name')
  //   })
  // })

});
