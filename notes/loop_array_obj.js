 // get users from post array , to be used in app

  var posts = [ 
                { 
                  title: "first article", 
                  id: 1, 
                  data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                  date: "2012-04-23T18:25:43.511Z", 
                  by: "Dumitru brinza",
                  me: [
                        {
                            "user": "dada",
                            "pass": "secret"
                        }
                        ]
                },
                 { 
                    title: "2 article", 
                    id: 2, 
                    data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                    date: "2013-04-23T18:25:43.511Z", 
                    by: "Dumitru brinza2",
                    me: [
                        {
                            "user": "dada1",
                            "pass": "secret1"
                        }
                        ]
                  },
                  { 
                    title: "3 article", 
                    id: 3, 
                    data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                    date: "2013-04-23T18:25:43.511Z", 
                    by: "Dumitru brinza3",
                    me: [
                        {
                            "user": "dada2",
                            "pass": "secret2"
                        }
                        ]
                  },
                  { 
                    title: "4 article", 
                    id: 4, 
                    data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                    date: "2013-04-23T18:25:43.511Z", 
                    by: "Dumitru brinza4",
                    me: [
                        {
                            "user": "dada3",
                            "pass": "secret3"
                        }
                        ]
                  }
                ];

 getUsers : function(){
              var uService = [];
                for(var key in posts) {
                    var obj = posts[key]
                    for(var prop in obj) {
                      var obj2 = obj[prop]
                      if (prop == "me"){
                        for (var any in obj2){
                          uService.push(obj2[any]) 
                          console.log(uService)
                        }
                      }
                    }
                  //  if (posts.hasOwnProperty(key)) {
                  //      console.log(posts[key]);
                 //   }
                }
                  return uService
                 //return posts
             }
          }
          return api
 