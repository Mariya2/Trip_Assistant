
travelAssistant.factory('authentication', [
            '$http',
            '$cookies',
            '$q',
            '$location',
            'identity', 
            'BASE_URL',
            function($http, $cookies, $q, $location, identity, BASE_URL) {
                
                var AUTHENTICATION_COOKIE_KEY = '!__Authentication_Cookie_Key__!';
                
                function preserveUserData(data) {
                    var accessToken = data.access_token;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                    $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
                }
                
                function registerUser(user) {
            		
            		return $http({
            				url: '../server/insert.php',
            				data: user,
            				method: 'POST',
            				dataType: "json",
            				headers: {'Content-Type': 'application/json'}
            			}).then(function(response){
            				 preserveUserData(response.data);
                             
                             identity.requestUserProfile()
                             
                             
                             return response;
            				/*if(data.status == 200) {
            					alert("success");
            					
            				} else {
            					alert("Not success");
            				}*/
            			})
                }
                function sendAjax(user) {
                	return $http({
            			url: '../server/login.php',
            			data: user,
            			method: 'POST',
            			dataType: "json",
            			headers: {'Content-Type': 'application/json'}
            		}).then(function(response){
            			preserveUserData(response.data);
            			identity.requestUserProfile();
            			
            			return response;
            		});
            		
            	}
                /*function registerUser(user) {
                    var deferred = $q.defer();
                    
                    $http.post(BASE_URL + 'Users/Register', user)
                        .then(function(response) {
                            preserveUserData(response.data);
                            
                            identity.requestUserProfile()
                                .then(function() {
                                    deferred.resolve(response.data);
                                });
                        });
                    
                    return deferred.promise;
                }
                
                function loginUser(user) {
                    var deferred = $q.defer();
                    
                    $http.post(BASE_URL + 'Users/Login', user)
                        .then(function(response) {
                            preserveUserData(response.data);
                            
                            identity.requestUserProfile()
                                .then(function() {
                                    deferred.resolve(response.data);
                                });
                        });
                        
                    return deferred.promise;
                }*/
                
                function isAuthenticated() {
                    return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
                }
                
                function logout() {
                    $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                    $http.defaults.headers.common.Authorization = undefined;
                    identity.removeUserProfile();
                    $location.path('/homePage');
                }
                
                function refreshCookie() {
                    if (isAuthenticated()) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
                        identity.requestUserProfile();
                    }
                }
                
                return {
                	registerUser: registerUser,
                    sendAjax: sendAjax,
                    isAuthenticated: isAuthenticated,
                    refreshCookie: refreshCookie,
                    logout: logout
                }
        }])