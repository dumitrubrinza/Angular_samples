var app = angular.module("demoApp",[])
app.controller('SimpleController', function ($scope) {
    $scope.customers = [ 
       {name :'Dave', address: 'Waterford', balance: 2000, start_date: 1288323623006},
       {name :'Dana', address: 'Wexford', balance: 3000, start_date: 1288323643006},
       {name :'Fiona', address: 'Kilkenny', balance: 12000, start_date: 1299323623006}] 
    $scope.newCustomer = { }
    $scope.addCustomer = function () {
        $scope.customers.push({ name: $scope.newCustomer.name, address: $scope.newCustomer.address, start_date: new Date(), balance: $scope.newCustomer.balance })
        $scope.newCustomer = {}
    }
    $scope.custNoInRange = function () {
        return  $scope.customerNo != '' && 
                $scope.customerNo >=0 && 
                $scope.customerNo < $scope.customers.length
    }
	})
