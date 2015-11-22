//http://jsonplaceholder.typicode.com/users/

'use strict';

/**
 * @ngdoc function
 * @name ngqApp.service:JsonPlaceholder
 * @description
 * # JsonPlaceholder
 * Service of the ngqApp
 */
angular.module('ngqApp')
  .factory('JsonPlaceholder', JsonPlaceholder);

function JsonPlaceholder(URLS, $q, $http) {
  return {
    getusers: getUser
  };

  function getUser() {
    return $http.get(URLS.JSON_URL + 'users/')
  }
}
