var blogApp = angular.module('dBlogApp', ['ngRoute']);

    blogApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'partials/blogs.html',
            controller: 'ArticlesController'
          })
          .when('/article/:id', {
            templateUrl: 'partials/article.html',
            controller: 'ArticleDetailController'
          })
          .otherwise({
            redirectTo: '/'
          })
      }])

    angular.module('ng').filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });

    blogApp.controller('ArticlesController', ['$scope', 'ArticleService', 
          
           function($scope, ArticleService) {
             ArticleService.getArticles().success(function(data) {
                   $scope.articles = data
                   
                 })
    }])

  blogApp.controller('ArticleDetailController', ['$scope', '$location', '$routeParams', 'ArticleService', 
          
           function($scope, $location, $routeParams, ArticleService) {
             ArticleService.getArticle($routeParams.id)
                .success(function(data) {
                  console.log($routeParams.id);
                  for (var i = 0; i < data.length; i++) {
                    if (data[i].id == $routeParams.id){
                       // console.log(data[i]);
                        $scope.articles = data[i]
                        console.log($scope.articles);
                    }
                    
                  };
                  console.log($scope.articles);
                //  $scope.articles = data
                 
                 })
                .error(function(err) {
                  console.log("error");
                    $location.path('./articles') 
                  })
    }])


 

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

/*
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

  blogApp.factory('ArticleService', ['$http' , function($http){
        var api = {
            getArticles : function() {
                return $http.get('articles/articles.json')            
            },
            getArticle : function(id) {   
                return $http.get('articles/' + id + '.json')
            }
        }
        return api
    }])

    */