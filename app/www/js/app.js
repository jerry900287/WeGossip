// Ionic Starter App 

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var example = angular.module('starter', ['ionic']) ;
var us;
example.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();     
    }
    Parse.initialize("0ekcDIcYCDRfF3rLy4yo5JVmqdOxPe7o4fyMCYCh", "HXaKOjKo77cU6SnC8tYdm5uECwDAqPbUPiAiOytd");

  });
});

example.controller("ExampleController" , function($scope){


    $scope.regist = function(){
        alert("!!!");
        var user = new Parse.User();
        user.set("username", "jerry900287");
        user.set("password", "jerry840414");
        user.set("email", "jerry900287@gmail.com");       
        user.signUp(null, {
          success: function(user) {
            // login success
            us = user;
            alert("Success!");    
          },
          error: function(user, error) {
            // login fail
            alert("Error: " + error.code + " " + error.message);
          }
        });    
    }

    $scope.login = function(){
        Parse.User.logIn("jerry900287", "jerry840414", {
        success: function(user) {
            // Do stuff after successful login.
            us = user;
            alert("successful!");
            //alert("Success!");
            
        },
        error: function(user, error) {
            // The login failed. Check error to see why.
            alert("Erroe password or username!");
            }
        });

    };

    $scope.currentuser = function(){
        alert("123");
       
        
        if(us){
            alert(us.get("username"));
        }else{
            alert("error");
        }
    };

    $scope.changeusername = function(){
        alert("!");
        var user = Parse.User.logIn("jerry900287","jerry840414",{
            success: function(user){
                user.set("username","jerry1023334");
                user.save(null,{});

            },
            error: function(user,error){
                alert("Erroe password or username!")
            }
        });
    };


    $scope.savePerson = function(firstname, lastname) {
        var PeopleObject = Parse.Object.extend("PeopleObject");
        var person = new PeopleObject();
        person.set("firstname", firstname);
        person.set("lastname", lastname);
        person.save(null, {});
    }

    $scope.getPeople = function(params) {
        var PeopleObject = Parse.Object.extend("PeopleObject");
        var query = new Parse.Query(PeopleObject);
        if(params !== undefined) {
            if(params.lastname !== undefined) {
                query.equalTo("lastname", params.lastname);
            }
            if(params.firstname !== undefined) {
                query.equalTo("firstname", params.lastname);
            }
        }
        query.find({
            success: function(results) {
                alert("Successfully retrieved " + results.length + " people!");
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.id + ' - ' + object.get("firstname") + " " + object.get("lastname"));
                }
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
/*Parse Cloud Call*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.randomnumber = function(){
        Parse.Cloud.run('RandomNumberSetParse',{},{})
    }

    $scope.sendmaill2 = function(){

        var s = "jerry1023334@gmail.com";
        Parse.Cloud.run('SentVerificationLetter',{mail:s},{
            success: function(result){
                alert(result);
            },
            error: function(error){
                alert(error);
            }
        });
    }

    $scope.sendmaill = function(){
        Parse.Cloud.run('myMandrillFunction',{},{})
    }

    $scope.template = function(){
        var s = "sss";
        Parse.Cloud.run('templatesentence',{str:s},{
            success: function(result){
                alert(result);
            }
        })
    }

    $scope.parsecall = function(){
        Parse.Cloud.run('hello',{},{
            success: function(result){
                alert(result);},
            error: function(error){
                alert(error);
            }   
        })
    }

    $scope.registparsecall = function(){
           Parse.Cloud.run('recallrandom',{},{})
    }

});


