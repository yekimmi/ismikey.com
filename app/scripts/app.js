'use strict';

angular.module('ismikey.comApp', [])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.hashPrefix('#');
    $locationProvider.html5Mode(true);
  }]);
