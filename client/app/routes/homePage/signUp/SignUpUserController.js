/**
 * 
 */
travelAssistant.controller("SignUpUserController", 
		['$scope', 'userService', '$http', '$location', 'authentication',
		 function SignUpUserController($scope, userService, $http, $location, authentication){
	
	$scope.newUser = {};
	
	$scope.register = function(){
		var user = $scope.newUser.name;
		var pass = $scope.newUser.password;
		var passRepeat = $scope.newUser.passRepeat;
		var email = $scope.newUser.email;
		
		console.log(pass);
		
		if (pass === passRepeat){
			var data = {
					name: user,
					password: pass,
					email: email
			}
			
			authentication.registerUser(data)
			.then(function(loggedInUser){
				$location.path('/homePage/login');
			}, function error(response){
				alert(response);
			});
		} else{
			console.log('wrong repeat password');
			return;
		}
	};
	$scope.newUser = {};

}])