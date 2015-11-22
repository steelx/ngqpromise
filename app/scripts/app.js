'use strict';

/**
 * @ngdoc overview
 * @name ngqApp
 * @description
 * # ngqApp
 *
 * Main module of the application.
 */
angular
  .module('ngqApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/posts', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl',
        controllerAs: 'posts'
      })
      .when('/users', {
        templateUrl: 'scripts/users/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'Users',
        resolve: {
          UsersData: function (JsonPlaceholder) {
            return JsonPlaceholder.getusers();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  })
  .constant('URLS', {
    'JSON_URL': 'http://jsonplaceholder.typicode.com/'
  });
