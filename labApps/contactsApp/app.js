var app = angular.module('contactsApp', ['ngRoute']) 

app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'partials/contacts.html',
            controller: 'ContactsController'
          })
          .otherwise({
            redirectTo: '/'
          })
      }])

app.controller('ContactsController', ['$scope', function($scope) {
           //  . . . Body of controller function (next step) . . . . 
           $scope.contacts = [
                        {
                        name: 'Contact 1',
                        address: '1 Test St',
                        phone_number: '087-123456'
                        },
                        {
                        name: 'Contact 2',
                        address: '2 Test St',
                        phone_number: '087-654321'
                        },
                        {
                        name: 'Contact 3',
                        address: '1 Main St',
                        phone_number: '086-123456',
                        state : 'deleted'
                        },
                        {
                        name: 'Contact 4',
                        address: '2 Main St',
                        phone_number: '086-654321'
                        }
                   ]
                $scope.deleteContact = function(contact) {
                    contact.state = "deleted";
                }
                $scope.undoDelete = function(contact) {
                   contact.state = "normal";
                }
                $scope.confirmDelete = function(index) {
                    if ($scope.contacts[index].state == "deleted") {
                      $scope.contacts.splice(index, 1)       
                    }
                }
                $scope.editContact = function(contact) {
                  contact.oldName = contact.name;
                  contact.oldAddress = contact.address;
                  contact.oldPhoneNumber = contact.phone_number;
                  contact.state = "edit";
                }
                 $scope.saveContact = function(contact) {
                  contact.state = "normal";
                }
                $scope.cancelEdit = function(contact) {
                  contact.name = contact.oldName;
                  contact.address = contact.oldAddress;
                  contact.phone_number = contact.oldPhoneNumber;
                  contact.state = "normal";
                }
    }])