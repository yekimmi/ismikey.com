'use strict';

angular.module('ismikey.comApp', [])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/:locationName', {
        templateUrl: 'views/main.html',
        reloadOnSearch: false
      })
      .otherwise({redirectTo : '/'});
    $locationProvider.hashPrefix('#');
    $locationProvider.html5Mode(true);
  }]);
