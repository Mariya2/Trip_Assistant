/**
 * 
 */
travelAssistant.factory('userService', function($http, $httpParamSerializerJQLike) {
	/*var baseUrl="http://localhost:3000/users";*/
	
	var users = [{name:'testuser', password:-5, email:'abv@abv.abv'},
	             {name:'user 2', password:55, email:'abv@abv.abv'},
	             {name:'user 3', password:33, email:'abv@abv.abv'},
	             {name:'user 4', password:44, email:'abv@abv.abv'},
	             {name:'user 5', password:55, email:'abv@abv.abv'}];
	
	return {
		getAllUsers: function() {
			return $http.get(baseUrl).then(function(response) {
				return response;
			});
		},
		getUserById: function(id) {
			return users[id];
		},
		addNewUser: function(newUser) {
			return $http.post(baseUrl, {newUser:newUser});
		},
		updateById:function(id, updatedData) {
			users[id] = updatedData;
		},
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
});
