'use strict';
/**
 * @ngdoc module
 * @name ngqApp.login
 * @description
 * # Login
 * Login of the ngqApp.login
 */
angular.module('ngqApp.login', [])
  .factory('Login', Login)
  .controller('loginController', loginController);

function Login($cookies) {
  return {
    isLoggedin: isLoggedin,
    setLoggedin: setLoggedin,
    getToken: getToken
  };

  function isLoggedin() {
    return !!$cookies.get('token');
  }

  function getToken() {
    return $cookies.get('token');
  }

  function setLoggedin(token) {
    $cookies.put('token', token);
  }
}


function loginController($scope, $http, Login, $location) {

  if(Login.isLoggedin()) {
    $location.url('/');
  }


  var LoginCtrl = this;
  $http.defaults.headers.post["Content-type"] = "application/json";
  LoginCtrl.title = 'Please login';


  LoginCtrl.login = function sendLoginDetails(username, password) {
    //http://localhost:8080/login?username=Test&password=Test

    $http.post('http://localhost:8080/login?username=' + username + '&password=' + password).then(
      function (result, status) {
        //success
        if (result.data.sessionId !== null && result.data.loginSucceeded) {
          console.log('pass', result, status);
          Login.setLoggedin(result.data.sessionId);
          LoginCtrl.error = false;
          $location.url('/users');
        } else {
          console.log('fail', result, status);
          LoginCtrl.error = true;
        }
      },
      function (err, status) {
        // fail
        console.log('fail', err, status);
        LoginCtrl.error = true;
      }
    );
  }
}
