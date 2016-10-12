
travelAssistant.controller("LoginUserController", 
		['$scope', 'userService', '$http', '$location', 'authentication',
		 function LoginUserController($scope, userService, $http, $location, authentication){
			$scope.user={};
	
	if(authentication.isAuthentication) {
		$location.path('/homePage/contacts');
	}
	
	
	$scope.login = function(){
		var user = $scope.user.name;
		var pass = $scope.user.password;
		
		var data = {
				name: user,
				password: pass
		};
		authentication.sendAjax(data)
		.then(function(loggedInUser){
			$location.path('/homePage/contacts');
		});
	};
			
	/*$scope.sendAjax = function(user) {
		var user = $scope.user.name;
		var pass = $scope.user.password;
		var data = {
				name: user,
				password: pass
		};

		$http({
			url: '../server/login.php',
			data: data,
			method: 'POST',
			dataType: "json",
			headers: {'Content-Type': 'application/json'}
		}).then(function(data){
			console.log(data);
			if(data.status == 200) {
				alert("success");
				$sessionStorage.logged = 1;
				$location.path('/homePage/contacts');
				
			} else {
				alert("Not success");
			}
		})
		
		$scope.user={};
		
	}*/
}])