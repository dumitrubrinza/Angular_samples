var hackerApp = angular.module('hackerNewsApp', ['ngRoute'])

    hackerApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/posts', {
            templateUrl: 'partials/posts.html',
            controller: 'PostsController'
          })
          .when('/posts/:post_id/comments',
          {
              controller: 'CommentsController',
              templateUrl: './partials/comments.html'
          })
          .otherwise({
            redirectTo: '/posts'
          })
      }])

    hackerApp.controller('PostsController', ['$scope','PostsService', function($scope,PostsService) {
        	    $scope.posts = PostsService.getPosts()   // CHANGE
				$scope.incrementUpvotes = function(post) {
				    post.upvotes += 1;
				}
				 $scope.addPost = function(){
			          var new_id = 1 + $scope.posts[$scope.posts.length - 1].id
			          $scope.posts.push({
			            title: $scope.newPost.title,
			            id: new_id,
			            link: $scope.newPost.link,
			            username : $scope.newPost.username,
			            comments : [],
			            upvotes: 0
			          })
			          $scope.newPost = { }
			        }
              console.log(" PostsController $scope.posts" + $scope.posts);
    }]) 

    hackerApp.controller('CommentsController', ['$scope',
       'PostsService', 
       '$routeParams',
       function ($scope,PostsService ,$routeParams) {
             $scope.post = PostsService.getPost($routeParams.post_id)
             $scope.incrementUpvotes = function(comment) {
                  comment.upvotes += 1;
             }
             $scope.addComment = function(){
                $scope.post.comments.push({
                  body: $scope.comment.body,
                  author: $scope.comment.author ,
                  upvotes: 0
                })
                $scope.comment = {} ;
              }
    }])

hackerApp.factory('PostsService', [function(){
         var posts = [ 
                { 
                    title : 'India - Tiger population sees 30% increase.',
                    id : 1,
                    link : 'http://www.bbc.com/news/world-asia-30896028',
                    username : 'jbloggs',
                    comments : ["sssssssssss"],
                    upvotes : 10
                  },
                 { 
                    title : 'The button that is not.',
                    id : 2,
                    link : 'http://blog.nuclearsecrecy.com/2014/12/15/button-isnt/',
                    username : 'notme',
                    comments : [],
                    upvotes : 12
                  },
                  { 
                    title : 'Google Nears $1B Investment in SpaceX',
                    id : 3,
                    link : null,
                    username : 'notme',
                    comments : [],
                    upvotes : 12
                  },
                  { 
                    title : 'Coinbase Raises $75M from DFJ Growth, USAA, and More',
                    id : 4,
                    link : 'http://blog.coinbase.com/post/108642362357/coinbase-raises-75m-from-dfj-growth-usaa-nyse',
                    username : 'psmith',  
                    comments : [],
                    upvotes : 2
                  }
                ]
         var api = {
             getPosts : function() {
                return posts
             },
             getPost : function(id) {
                var result = null
                posts.forEach(function(post){
                   if (post.id == id) {
                      result  = post
                    }
                } )
                return result
             }
          }
          return api
        }])