
travelAssistant.controller("LoginUserController", 
		['$scope', 'userService', '$http', '$location', 'authentication',
		 function LoginUserController($scope, userService, $http, $location, authentication){
	console.log(authentication.isAuthenticated());
	if(authentication.isAuthenticated()) {
		$location.path('/InsidePage/mapApp');
	}
	
	$scope.user={};
	
	$scope.login = function(){
		var user = $scope.user.name;
		var pass = $scope.user.password;
		
		var data = {
				name: user,
				password: pass
		};
		authentication.sendAjax(data)
		.then(function(loggedInUser){
			console.log(data);
			
			$location.path('/InsidePage/mapApp');
		});
	};
		
	$scope.user={};
}])