'use strict';

/**
 * @ngdoc function
 * @name ngqApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the ngqApp
 */
angular.module('ngqApp')
  .controller('UsersCtrl', UsersCtrl);

function UsersCtrl($scope, UsersData) {

  var vm = this;
  vm.users = UsersData.data;

  vm.selectedUsers = [];

  vm.addToSelection = function (user) {
    if(user.checked){
      vm.selectedUsers.push(user);
    } else {
      vm.selectedUsers = _.reject(vm.selectedUsers, function(item){ return item.id == user.id; });
    }
  };

  $scope.$watchCollection('Users.selectedUsers', function (newVal, oldVal) {
    console.log(newVal, oldVal);
  });

}
