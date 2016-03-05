var app = angular.module("demoApp",['ngRoute'])
app.config(function ($routeProvider) {
    $routeProvider
        .when('/customers',
            {
                controller: 'CustomersController',
                templateUrl: './partials/customers.html'
            })
        .when('/products',
            {
                controller: 'ProductController',
                templateUrl: './partials/products.html'
            })       
        .otherwise({ redirectTo: '/customers' });
})

app.controller('CustomersController', function ($scope) {
    $scope.customers = [ 
	   {name :'Dave', address: 'Waterford', balance: 2000, start_date: 1288323623006},
	   {name :'Mark', address: 'Wexford', balance: 3000, start_date: 1288323643006},
	   {name :'Fiona', address: 'Kilkenny', balance: 12000, start_date: 1299323623006}] 
		$scope.addCustomer = function () {
        $scope.customers.push({ name: $scope.newCustomer.name, address: $scope.newCustomer.address, start_date: new Date(), balance: $scope.newCustomer.balance })
        $scope.newCustomer = {}
    }
    $scope.custNoInRange = function () {
		return   $scope.customerNo != '' && 
		         $scope.customerNo >=0 && 
		         $scope.customerNo < $scope.customers.length
    }
})

app.controller('ProductController', function ($scope) {
    $scope.products = [ 
	   {name :'iPad 2', price: 52.99, quantity: 8},
	   {name :'iPad Mini', price: 32.99, quantity: 5},
	   {name :'iPhone 5', price: 132.99, quantity: 5} ] 

})
