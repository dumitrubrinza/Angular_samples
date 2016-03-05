var app = angular.module("demoApp",['ngRoute'])
app.config(function ($routeProvider) {
	    $routeProvider
	        .when('/customers',
	            {
	                controller: 'CustomersController',
	                templateUrl: './partials/customers.html'
	            })
	        .when('/customers/:customer_index',
	            {
	                controller: 'CustomerDetailController',
	                templateUrl: './partials/customer_edit.html'
	            })
	        .when('/products',
	            {
	                controller: 'ProductController',
	                templateUrl: '../07-routes/partials/products.html'
	            })
	        .otherwise({ redirectTo: '/customers' });
	})

app.factory('SimpleFactory', function () {
        var factory = {};
        var customers = [ 
		   {name :'Dave', address: 'Waterford', balance: 2000, start_date: 1288323623006},
		   {name :'Mark', address: 'Wexford', balance: 3000, start_date: 1288323643006},
		   {name :'Fiona', address: 'Kilkenny', balance: 12000, start_date: 1299323623006}] 

        var products = [ 
		   {name :'iPad 2', price: 52.99, quantity: 8},
		   {name :'iPad Mini', price: 32.99, quantity: 5},
		   {name :'iPhone 5', price: 132.99, quantity: 5} ] 

        factory.getCustomers = function () {
            return customers;
        }
       factory.getCustomer = function (index) {
            if (index >=0 && index < customers.length ) {
               return customers[index]
           }
           return undefined
        }
        factory.getProducts = function () {
            return products;
        }

        factory.addCustomer = function(customer) {
             customers.push({ name: customer.name, address: customer.address, 
             	      start_date: new Date(), balance: customer.balance })
        }
        factory.updateCustomer = function(index,customer) {
             customers[index].name = customer.name
             customers[index].address = customer.address
             customers[index].balance = customer.balance
        }
        return factory;
    })

app.controller('CustomersController', function ($scope,SimpleFactory) {
    $scope.customers = SimpleFactory.getCustomers()
		$scope.addCustomer = function () {
        SimpleFactory.addCustomer($scope.newCustomer)
        $scope.newCustomer = {}
    }
    $scope.custNoInRange = function () {
		return  $scope.customerNo && $scope.customerNo >=0 
		                && $scope.customerNo < $scope.customers.length
    }
})

app.controller('CustomerDetailController', 
	 function ($scope,$location,$routeParams,SimpleFactory) {
    $scope.customer = {  
    	index : $routeParams.customer_index, 
    	detail : SimpleFactory.getCustomer($routeParams.customer_index)
      }
    $scope.updateCustomer = function () {
		 SimpleFactory.updateCustomer($scope.customer.index, 
                           $scope.customer.detail )
		 $location.path('./customers')
    }
})

app.controller('ProductController', function ($scope,SimpleFactory) {
        $scope.products = SimpleFactory.getProducts()

	})