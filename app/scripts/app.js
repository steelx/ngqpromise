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
    'ngSanitize',
    'ngqApp.login'
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
      .when('/login', {
        templateUrl: 'scripts/login/login.html',
        controller: 'loginController',
        controllerAs: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  })
  .run(function init(Login, $location, $rootScope) {

    $rootScope.$on('$routeChangeStart', function () {

      if(Login.isLoggedin()){
        console.log('logged in');
        //set rootScope authenticated
        $rootScope.currentUser = {
          token : Login.getToken()
        }
      } else {
        console.log('NOT logged-in');
        $location.url('/login');
      }
    });

  })
  .constant('URLS', {
    'JSON_URL': 'http://jsonplaceholder.typicode.com/'
  });
