//app.js

 var phonesApp = angular.module('phoneCatApp', ['ngRoute']);

    phonesApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/phones', {
            templateUrl: 'partials/phone-list.html',
            controller: 'PhoneListCtrl'
          })
          .otherwise({
            redirectTo: '/phones'
          });
      }]);

    phonesApp.controller('PhoneListCtrl', ['$scope', 'PhoneService',
          function($scope, PhoneService) {
             PhoneService.getPhones().success(function(data) {
                   $scope.phones = data
                 })
             $scope.orderProp = 'age';
          }])

    phonesApp.factory('PhoneService', ['$http' , function($http){
        var api = {
            getPhones : function() {
                return $http.get('phones/phones.json')            
            }
        }
        return api
    }])