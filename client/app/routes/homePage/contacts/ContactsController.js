travelAssistant.controller("ContactsController",
		['$scope', 'userService', '$http', '$location',
		 function ContactsController($scope, userService, $http, $location){
			$scope.user = {};
			
			$scope.userAjaxMessage = function() {
				
				var user = $scope.user.name;
				var email = $scope.user.email;
				var message = $scope.user.message;
		
					var data = {
							name: user,
							email: email,
							message: message
					}
					$http({
						url: '../server/getMessage.php',
						data: data,
						method: 'POST',
						dataType: "json",
						headers: {'Content-Type': 'application/json'}
					}).then(function(data){
						if(data.status == 200) {
							alert("success");
							$location.path('/homePage/login');
						} else {
							alert("Not success");
						}
					})
				
				$scope.newUser = {};
			}
}])