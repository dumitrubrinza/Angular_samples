var blogApp = angular.module('dBlogApp', ['ngRoute', 'ngMessages',  'angularUtils.directives.dirPagination']);

    blogApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
          })
          .when('/', {
            templateUrl: 'partials/blogs.html',
            controller: 'ArticlesController'
          })
          .when('/article/:id', {
            templateUrl: 'partials/article.html',
            controller: 'ArticleDetailController'
          })
          .when('/new-article', {
            templateUrl: 'partials/new-article.html',
            controller: 'ArticlesController'
          })
          .otherwise({
            redirectTo: '/'
          })
      }])
/*
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

*/

blogApp.filter('cut', function(ArticleService) {
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
/*

    angular.module('app', ['ngMessages'])
.run(function ($templateCache, $http) {
  $http.get('scriptTemplate.html')
  .then(function(response) {
    $templateCache.put('error-messages', response.data); 
  })
})


//
 var underscore = angular.module('underscore', []);
        underscore.factory('_', function() {
            return window._; //Underscore should be loaded on the page
        });
//  */
var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
              console.log("directive compareTo");
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};
 var RegistrationController = 
 blogApp.directive("compareTo",['ArticleService', compareTo] );



//
    blogApp.controller('ArticlesController', ['$scope', '$routeParams', '$location', 'ArticleService', 
          
           function($scope, $routeParams, $location, ArticleService, _) {
             
     

                   $scope.articles = ArticleService.getArticles() 
                   console.log($scope.articles);
                  
             //console.log($scope.newPost.title);
             $scope.addArticle = function(){
                        var new_id = 1 + $scope.articles[$scope.articles.length - 1].id
                        $scope.articles.push({
                          title: $scope.newPost.title,
                          id: new_id,
                          data: $scope.newPost.text
                         
                        })
                        //$scope.$apply();
                       
                        console.log($scope.articles);
                        $scope.newPost = { }
                         $location.path('/');
                      }
     
                
    }])
  blogApp.controller('OtherController', ['$scope', 'ArticleService',
     function($scope) {
      $scope.currentPage = 1;
      $scope.pageSize = 10;
      $scope.meals = [];

        $scope.pageChangeHandler = function(num) {
            console.log('going to page ' + num);
          };
     }])


 blogApp.controller('LoginController', ['$scope', '$location', '$routeParams', 'ArticleService',
     function() {
    var model = this;

    model.message = "";

    model.user = {
      username: "",
      password: "",
      confirmPassword: ""
    };

    model.submit = function(isValid) {
      console.log("h");
      if (isValid) {
        model.message = "Submitted " + model.user.username;
        console.log("a");
      } else {
        model.message = "There are still invalid fields below";
        console.log("b");
      }
    };
  
  }
  ])
  

  blogApp.controller('ArticleDetailController', ['$scope', '$location', '$routeParams', 'ArticleService', 
          
           function($scope, $location, $routeParams, ArticleService) {
             $scope.article = ArticleService.getArticle($routeParams.id)

               /* 
                {
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
                */
    }])
 /* 
blogApp.controller('NewArtController', ['$scope','ArticleService',
             function($scope, ArticleService) {

              ArticleService.getArticles().success(function(data){
                $scope.articles = data
                // CHANGE
       
              $scope.addArticle = function(){
                var new_id = 1 + $scope.articles[$scope.articles.length - 1].id
                $scope.articles.push({
                  title: $scope.newPost.title,
                  id: new_id,
                  data: $scope.newPost.text
                })
                $scope.newPost = { }
              }
              })
              console.log(" PostsController $scope.posts" + $scope.articles);
    }]) 
*/
blogApp.factory('ArticleService', function(){
     pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
  };
      var posts = [ 
                { 
                  "title": "first article", 
                  "id": 1, 
                  "data": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                  "date": "2012-04-23T18:25:43.511Z", 
                  "by": "Dumitru brinza"
                },
                 { 
                    "title": "2 article", 
                    "id": 2, 
                    "data": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                    "date": "2013-04-23T18:25:43.511Z", 
                    "by": "Dumitru brinza2"
                  },
                  { 
                    "title": "3 article", 
                    "id": 3, 
                    "data": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                    "date": "2013-04-23T18:25:43.511Z", 
                    "by": "Dumitru brinza3"
                  },
                  { 
                    "title": "4 article", 
                    "id": 4, 
                    "data": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                    "date": "2013-04-23T18:25:43.511Z", 
                    "by": "Dumitru brinza4"
                  }
                ]
         var api = {
             getArticles : function() {
                return posts
             },
             getArticle : function(id) {
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
 
    })

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