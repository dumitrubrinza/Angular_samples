var hackerApp = angular.module('hackerNewsApp', ['ngRoute'])

    hackerApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/posts', {
            templateUrl: 'partials/posts.html',
            controller: 'PostsController'
          })
          .otherwise({
            redirectTo: '/posts'
          })
      }])

    hackerApp.controller('PostsController', ['$scope', function($scope) {
      //  . . . TODO . . . . 
      $scope.posts = [
	              { title : 'India - Tiger population sees 30% increase.',
	                link : 'http://www.bbc.com/news/world-asia-30896028',
	                username : 'jbloggs',
	                upvotes : 10
	              },
	             { title : 'The button that is not.',
	                link : 'http://blog.nuclearsecrecy.com/2014/12/15/button-isnt/',
	                username : 'notme',
	                upvotes : 12
	              },
	              { title : 'Google Nears $1B Investment in SpaceX',
	                link : null,
	                username : 'notme',
	                upvotes : 12
	              },
	              { title : 'Coinbase Raises $75M from DFJ Growth, USAA, and More',
	                link : 'http://blog.coinbase.com/post/108642362357/coinbase-raises-75m-from-dfj-growth-usaa-nyse',
	                username : 'psmith',
	                upvotes : 2
	              }
	            ]
				$scope.incrementUpvotes = function(post) {
				    post.upvotes += 1;
				}
				$scope.addPost = function(){
		      	  $scope.posts.push({
			            title: $scope.newPost.title,
			            link: $scope.newPost.link,
			            username : $scope.newPost.username,
			            upvotes: 0
			          })
			          $scope.newPost = {} 
		     	   }
    }]) 