var blogApp = angular.module('dBlogApp', ['ngRoute', 'ngMessages', 'angularUtils.directives.dirPagination', 'ngCookies' ]);

    blogApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginController',
            hideMenus: true
          })
          .when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'SignupController',
            secure: true
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
            controller: 'NewArtController'
          })
          .otherwise({
            redirectTo: '/'
          })
      }])
//
.run(['$rootScope', '$location', '$cookieStore', '$http',
  function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
             
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
              // allow just login and signup views to be available
                $location.path('/login') && $location.path('/signup') ;
            }
        });
    }]);
//

 /*     
    .run(function($rootScope, $location) {
      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if ($rootScope.loggedInUser == null) {

          // no logged user, redirect to /login
          if ( next.templateUrl === "partials/blogs.html") {
          } else {
            $location.path("/login");
          }
        } 
      });
    })
      
 

document.addEventListener("offline", function() {
    $rootScope.$apply(function(){
        $rootScope.offline = true;
    })
}, false);

blogApp.filter('breakFilter', function () {
    return function (text) {
        if (text !== undefined) return text.replace(/\n/g, '<br />');
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

// SignUp Controller
  blogApp.controller('SignupController', 
    ['$scope', '$rootScope', '$routeParams', '$location', 'AuthenticationService', 
          
           function($scope, $rootScope, $routeParams, $location, AuthenticationService) {
            //       $scope.users = ArticleService.getUsers()
                  // $scope.articles = ArticleService.getArticles()
                    $scope.signup = function(){
                       $scope.dataLoading = true;
                        AuthenticationService.SignUp($scope.firstname, $scope.lastname, $scope.username, $scope.email, $scope.password, function(response) {
                        //  $location.path('/login');
                          if(response.success) {
                              //AuthenticationService.SetCredentials($scope.username, $scope.password);
                              $location.path('/login');
                          } else {
                              $scope.error = response.message;
                              $scope.dataLoading = false;
                          }
                      });
                      }
            
  }])

// Articles Controller
    blogApp.controller('ArticlesController', ['$scope','$rootScope', '$routeParams', '$location', 'ArticleService', 
          
           function($scope, $rootScope, $routeParams, $location, ArticleService) {
                    
                 //  $scope.users = ArticleService.getUsers()
                   $scope.articles = ArticleService.getArticles()
                  // if($rootScope.globals.currentUser){
                  //s   $scope.Log = $rootScope.globals.currentUser.loggedIn;
                 //  }
                 //  var obj = $scope.articles;
             //      console.log("rootScope.globals " + $rootScope.globals.currentUser);
                  
             //console.log($scope.newPost.title);
              /*      $scope.addArticle = function(){
                        var new_id = 1 + $scope.articles[$scope.articles.length - 1].id
                        $scope.articles.push({
                          title: $scope.newPost.title,
                          id: new_id,
                          data: $scope.newPost.text
                         
                        })

                        console.log($scope.articles);
                        $scope.newPost = { }
                         $location.path('/');
                      }
            */
                
    }])
  blogApp.controller('OtherController', ['$scope', 'ArticleService',
     function($scope) {
        $scope.pageChangeHandler = function(num) {
            console.log('going to page ' + num);
          };
     }])


blogApp.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
        $scope.logout = AuthenticationService.ClearCredentials();
     //    $scope.mes = AuthenticationService.authenticated;
     //        console.log("mes " + $scope.mes)
        $scope.login = function () {
            $scope.dataLoading = true;
           // $scope.loggedInUser
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) { 
                  
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else { 
                    //$rootScope.currentUser.name = "";
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });

        };
    }]);
/*
// Login Controller
 blogApp.controller('LoginController', ['$scope', '$location','$rootScope', 'ArticleService',
     function($scope, $location, $rootScope, ArticleService)  {
      $scope.login = function() {
        $rootScope.loggedInUser = $scope.username;
        console.log("rootScope.loggedInUser " + $rootScope.loggedInUser);
        console.log("rootScope " + $rootScope);
        $location.path("/blogs");
      //  console.log("rootScope " + $rootScope.loggedInUser);
      };
  }])
 */ 
 // 

  
//
  blogApp.controller('ArticleDetailController', ['$scope', '$location', '$routeParams', 'ArticleService', 
          
           function($scope, $location, $routeParams, ArticleService) {
             $scope.article = ArticleService.getArticle($routeParams.id)

              
    }])

  /*
      
 */

 
blogApp.controller('NewArtController', ['$scope', '$rootScope', '$location','ArticleService',
             function($scope, $rootScope, $location, ArticleService) {

              $scope.articles = ArticleService.getArticles()
              
              $scope.addArticle = function(){
                var new_id = 1 + $scope.articles[$scope.articles.length - 1].id
                $scope.articles.push({
                  title: $scope.newPost.title,
                  id: new_id,
                  createdAt: new Date(),
                  data: $scope.newPost.text,
                  by: $rootScope.globals.currentUser.username
                })
                $scope.newPost = { }
                console.log(" PostsController $scope.posts" + $scope.articles);
              $location.path('/');
              }
              
              
    }]) 

//NavController
blogApp.controller('NavController', ['$scope', '$rootScope', '$location','AuthenticationService',
             function($scope, $rootScope, $location, AuthenticationService) {
             
            
            //  };
         //   console.log(" $scope.user = AuthenticationService.getUser();" +  $scope.user)
}])
//

blogApp.factory('ArticleService', function(){
     pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
  };
       
      var posts = [ 
                { 
                  title: "first article", 
                  id: 1, 
                  data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                  createdAt: "2013-04-23T18:25:43.511Z", 
                  by: "Dumitru brinza" 
                },
                 { 
                    title: "2 article", 
                    id: 2, 
                    data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                    createdAt: "2014-04-23T18:25:43.511Z", 
                    by: "Dumitru brinza2" 
                  },
                  { 
                    title: "3 article", 
                    id: 3, 
                    data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                    createdAt: "2015-04-23T18:25:43.511Z", 
                    by: "Dumitru brinza3" 
                  },
                  { 
                    title: "4 article", 
                    id: 4, 
                    data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                    createdAt: "2012-04-23T18:25:43.511Z", 
                    by: "Dumitru brinza4" 
                  }
                ];
         var api = {
          // Atricles part
             getArticles : function() {
                 return posts
             },
             getArticle : function(id) {
                var result = null
               posts.forEach(function(post){
                  if (post.id == id) {
                     result  = post
                    }
               })
                return result
             },
 /*            
         // Users part
             getUsers : function(){
               return users
             },
             getUser: function(id){
              var result = null
              users.forEach(function(user){
                if (user.id == id){
                  result = user
                }
              })
              return result
             }
*/
          }
          return api
 
    })
 
//
blogApp.factory('AuthenticationService',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout', 
    function (Base64, $http, $cookieStore, $rootScope, $timeout ) {
        var service = { };
 //
        
        var users = [ 
                        { "id": 1,
                          "firstname": "Homer", 
                          "lastname": "Simpson",
                          "username": "Homer",
                          "email": "homer@simpson.com", 
                          "password": "secret"
                        },
                        {
                          "id": 2,
                          "firstname": "Bart", 
                          "lastname": "Simpson",
                          "username": "Bart",
                          "email": "bart@simpson.com", 
                          "password": "secret"
                        },
                        {
                          "id": 3,
                          "firstname": "Marge", 
                          "lastname": "Simpson",
                          "username": "Marge",
                          "email": "marge@simpson.com", 
                          "password": "secret"
                        }
                        ]
 
        service.Login = function (username, password, callback) {
             console.log(username, password, callback);
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function(){
               users.forEach(function(user){
                var response = { success: username === user.username && password === user.password };
                 
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                   //  console.log( $rootScope.$broadcast);
                } 
                callback(response);
             } )}, 1000);
 
 
            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });
 
        };
        //
        service.SignUp = function (firstname, lastname, username, email, password, callback){

                        var new_id = 1 + users[users.length - 1].id
                        users.push({
                          id: new_id,
                          firstname: firstname,
                          lastname: lastname,
                          username: username,
                          email: email,
                          password: password
                        })
                        var response = {success:true};
                        callback(response);
          console.log(users)              
       }
        /*
        service.getUser = function() {
                var result = null
               users.forEach(function(user){
                  if (user.username == $rootScope.globals.currentUser.username ) {
                     result  = user
                    }
               })
                return result
             }

        */

        service.SetCredentials = function (username, password) {
            var authdata = Base64.encode(username + ':' + password);
  
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    loggedIn: true,
                    authdata: authdata
                }
            };
          //console.log(" $rootScope.globals.currentUser.username  " + $rootScope.globals.currentUser.username)
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };
  
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
  
        return service;
    }])

blogApp.factory('Base64', function () {
    /* jshint ignore:start */
  
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
  
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
  
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
  
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
  
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
  
            return output;
        },
  
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
  
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
  
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
  
                output = output + String.fromCharCode(chr1);
  
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
  
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
  
            } while (i < input.length);
  
            return output;
        }
    };
  
    /* jshint ignore:end */
});
 