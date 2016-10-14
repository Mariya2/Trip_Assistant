/**
 * 
 */
travelAssistant.factory('userService', ['$http', '$httpParamSerializerJQLike',
                                        '$cookies',
                                        '$q',
                                        '$location', 
                                        function($http, $httpParamSerializerJQLike, $cookies,
                                                $q, $location) {

	function registerRoute(route) {
	
		return $http({
				url: '../server/saveRoute.php',
				data: route,
				method: 'POST',
				dataType: "json",
				headers: {'Content-Type': 'application/json'}
			}).then(function(response){
				 /*preserveRouteData(response.data);
                */
                 return response;
				/*if(data.status == 200) {
					alert("success");
					
				} else {
					alert("Not success");
				}*/
			})
    }
	
	function getRoutes(){
		return $http({
			url: '../server/list.php',
			method: 'GET',
			dataType: "json",
			headers: {'Content-Type': 'application/json'}
	}).then(function successCallback(response) {
		$scope.result = response.data;
		console.log(response);
	  }, function errorCallback(response) {
		  $scope.error = response;
	  });
	}
	
	function getRouteFromDB(user) {
		
		return $http({
				url: '../server/getRouteFromDB.php',
				data: user,
				method: 'GET',
				dataType: "json",
				headers: {'Content-Type': 'application/json'}
			}).then(function(response){
				 /*preserveRouteData(response.data);
                */
                 return response;
				/*if(data.status == 200) {
					alert("success");
					
				} else {
					alert("Not success");
				}*/
			})
    }
	
	
	return {
		getUserById: function(id) {
			return users[id];
		},
		addNewUser: function(newUser) {
			return $http.post(baseUrl, {newUser:newUser});
		},
		updateById:function(id, updatedData) {
			users[id] = updatedData;
		},
		
		registerRoute: registerRoute,
		
		getRoutes: getRoutes,
		
		getRouteFromDB: getRouteFromDB
		
		
		/*loginUser: function(user){
			return $http.post('login.php', {newUser:newUser});
		},
        sendLoginData: function (data, successCb, failCb) {
                $http({
                    method: 'POST',
                    url: 'login.php',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'},
                    data: $httpParamSerializerJQLike(data)
                }).then(function successCallback(response) {
                    if (response.data.success == true) {
                        failCounter = 0;
                        successCb(response.data.success)
                    } else {
                        failCb(++failCounter);
                    }
                }, function errorCallback(response) {
                    failCb(++failCounter);
                });
        }*/
	}
}]);
