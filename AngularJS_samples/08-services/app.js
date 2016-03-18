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
	                controller: 'CustomersController',
	                templateUrl: '../07-routes/partials/products.html'
	            })
	        .otherwise({ redirectTo: '/customers' });
	})

app.factory('SimpleFactory', ['$http' , function ($http) {
       var api = {
            getCustomers : function() {
                return $http.get('customers/customers.json')            
            },

            getCustomer : function(id) {    
                return $http.get('customers/customers.json')
            }
        }
        return api
    
}])
/*
       blogApp.factory('ArticleService', ['$http' , function($http){
        var api = {
            getArticles : function() {
                return $http.get('articles/articles.json')            
            },

            getArticle : function(id) {    
                return $http.get('articles/articles.json')
            }
        }
        return api
    }])

     

        var products = [ 
		   {name :'iPad 2', price: 52.99, quantity: 8},
		   {name :'iPad Mini', price: 32.99, quantity: 5},
		   {name :'iPhone 5', price: 132.99, quantity: 5} ] 

       
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
    }])
*/  
app.controller('CustomersController', ['$scope', '$routeParams', 'SimpleFactory',
 function ($scope, $routeParams, SimpleFactory) {
    SimpleFactory.getCustomers().success(function(data) { // modif
        $scope.customers = data
    
    })
		 
        $scope.addCustomer = function(customer) {
             $scope.customers.push({ name: $scope.newCustomer.name, address:  $scope.newCustomer.address, 
                      start_date: new Date(), balance: $scope.newCustomer.balance })
             $scope.newCustomer = {}
        }
   
     
    $scope.custNoInRange = function () {
		return  $scope.customerNo && $scope.customerNo >=0 
		                && $scope.customerNo < $scope.customers.length
    }
}])



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