

var travelAssistant = angular.module('travelAssistant',['ngRoute'                                                    
    , 'ngCookies'/*,
    'travelAssistent.routes.insidePage', 
    'uiGmapGoogleMapApiProvider', 
    'geolocation' */])

.config(['$locationProvider', '$routeProvider', 
          function($locationProvider, $routeProvider){
	//$locationProvider.hashPrefix('!');   ???
	
	$routeProvider
	.when('/homePage', {
		templateUrl:"./app/routes/homePage/home/homePage.html",
		controller:'HomePageController'
	})
	.when('/InsidePage/mapApp', {
		templateUrl:"./app/routes/InsidePage/mapApp.html",
		controller:'MapCtrl'
	})
	.when('/homePage/contacts', {
		templateUrl:"./app/routes/homePage/contacts/contacts.html",
		controller:'ContactsController'
	})
	.when('/homePage/login', {
		templateUrl:"./app/routes/homePage/login/login.html",
		controller:'LoginUserController'
	})
	.when('/homePage/signUp', {
		templateUrl:"./app/routes/homePage/signUp/signUp.html",
		controller:'SignUpUserController'
	})
	.when('/homePage/:id/edit', {
		templateUrl:"./app/routes/homePage/edit/userEdit.html",
		controller:'EditUserController'
	})
	.otherwise({redirectTo: '/homePage'})
}])
.run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection == 'Unauthorized Access') {
                $location.path('/');
            }
        });
        
        authentication.refreshCookie();
    }])
.controller('PageController', function($rootScope, $scope, $cookies, authentication, identity) {
	/*$scope.log = "Log In";*/
	
		identity.getCurrentUser()
		.then(function(user){
	
			$scope.currentUser = user;
			$scope.isAuthenticated = true;
		});
	
	
})
.constant('BASE_URL', 'http://localhost/MAIN_PROJECT/Trip_Project-master09-10/client/index.html#/homePage')
	
	
	
	
/*var existingCookie = $cookies.get('my-cookie');
if(existingCookie){
	console.log('FROM COOKIE');
} else {
	$cookies.put('my-cookie', 'new Cookie');
}*/
	/*$scope.changeState = function(){
		$scope.hidden = !$scope.hidden;
	}
	if (isLogged){
		$scope.
	}*/


/*   .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAg_ZL1c9NXonjqOM9UKwsk43lUXDZ7jYU',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

.controller('geoCtrl', function ($scope, geolocation) {
    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });
});
*/

/*.controller("someController", function($scope, uiGmapGoogleMapApi) {
    // Do stuff with your $scope.
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {

    });
*/

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

travelAssistant.factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {
        
            var deferred = $q.defer();
        
            var currentUser = undefined;
        
            return {
                getCurrentUser: function () {
                    if (currentUser) {
                        return $q.when(currentUser);
                    }
                    else {
                        return deferred.promise;
                    }
                },
                removeUserProfile: function() {
                    currentUser = undefined;
                },
                requestUserProfile: function() {
                    var userProfileDeferred = $q.defer();
                    
                    $http.get(BASE_URL + 'me')
                        .then(function(response) {
                            currentUser = response.data;
                            deferred.resolve(currentUser);
                            userProfileDeferred.resolve();
                        });
                        
                    return userProfileDeferred.promise;
                }
            };
    }]);
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

'use strict';



travelAssistant.controller('MapCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    
	if(!!navigator.geolocation) {
	    
        var map;
        var mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var startPosLat = position.coords.latitude;
            var startPosLat1 = startPosLat + '';
            var startPosLng = position.coords.longitude;
            var startPosLng1 = startPosLng + '';
           
    	    var image =	{
    	    		  url: 'pin1.ico',
    	    		  size: new google.maps.Size(90, 90),
    	    		  origin: new google.maps.Point(0, 0),
    	    		  anchor: new google.maps.Point(17, 34),
    	    		  scaledSize: new google.maps.Size(50, 50)
    	    		 };
            	
    	    var image2 = {
		    		  url: 'pin2.ico',
		    		  size: new google.maps.Size(90, 90),
		    		  origin: new google.maps.Point(0, 0),
		    		  anchor: new google.maps.Point(17, 34),
		    		  scaledSize: new google.maps.Size(50, 50)
			    	};
            var initalPosition = new google.maps.Marker({
			          position: geolocate,
			          map: map,
			          title: 'My Place',
			          draggable: true,
			          icon: image,
			          animation: google.maps.Animation.DROP,
			          animation: google.maps.Animation.BOUNCE
			          });
          initalPosition.addListener('click', toggleBounce);

		function toggleBounce() {
			if (initalPosition.getAnimation() == null) {
				initalPosition.setAnimation(google.maps.Animation.BOUNCE);
			} else {
				initalPosition.setAnimation(null);
			}
		}
		var typesA=[];
		var types ={};
		$scope.changeSelectAttr = function() {
			
			types = $scope.selectedAttractions;
		}
		$scope.showPlaces = function() {
			if(types){
				for (var type in types) {
					typesA.push(type)
				}
				var requestCurrentLocationPlaces = {
					    location: geolocate,
					    radius: '500',
					    types: typesA
					  };
			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch(requestCurrentLocationPlaces, callback);
			 
			function callback(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					for (var i = 0; i < results.length; i++) {
						var place = results[i];
						    
						createMarker(results[i]);
					}
				}
			}
				}
		
		}

		
	/*	types: ['poi', 'place_of_worship', 'museum', 'amusement_park', 'art_gallery']*/
		map.setCenter(geolocate);
		
        	 
		var wayPoints = [];
        $rootScope.wayPoints = wayPoints;
        
		function createMarker(place) {
			var placeLoc = place.geometry.location;
			var marker = new google.maps.Marker({
				      map: map,
				      position: placeLoc,
				      name: place.name,
				      id: place.place_id,
				      icon: image2,
				   });
			//map add event listener click / take latLng na eventa/ create marker at click
			var infowindow = new google.maps.InfoWindow({
			    position: placeLoc,
			    content: place.name,
			    maxWidth: 50 
			})
			marker.addListener('click', function() {
			    infowindow.open(map, marker);
			});
			$scope.marker = marker;
			marker.addListener('dblclick', function selectWayPointsOne(e) {
				wayPoints.push(marker)
			}, false); 
		}
		$scope.changeSelectStart = function() {
			console.warn($scope.selectedOptionStart);
		};
		$scope.changeSelectEnd = function() {
			console.warn($scope.selectedOptionEnd);
		};	
		var timeLength = 0;
		var routeLength = 0;
		
		$scope.selectionClick = function () {
			if(wayPoints.length>1){
			$scope.data =  [];
				for (var int = 0; int < wayPoints.length; int++) {
					var item = wayPoints[int];
					var id = item.id;
					var name = item.name;
					var position = item.position;
					$scope.data.push({id:item.id, name:item.name,  position: position})
					
				 }
			}
		}
		var directionsService = new google.maps.DirectionsService();
		$scope.directionsService =  directionsService;
		
		var directionsDisplay = new google.maps.DirectionsRenderer();
		$scope.directionsDisplay = directionsDisplay;
		directionsDisplay.setMap(map);
		
		$scope.calcRoute = function(geo, $window) {
			var start = $scope.selectedOptionStart;;
			var end1 = $scope.selectedOptionEnd;
			end1 = end1.replace('(', "").replace(')', "");
			start = start.replace('(', "").replace(')', "");
			var wayPoints1 = [];
				for (var int = 0; int < wayPoints.length; int++) {
					wayPoints1.push({
					location: (wayPoints[int].position+'').replace('(', "").replace(')', ""),
					stopover: true
					});
				}
					
			var requestRoute = {
						/*origin: startPosLat1+', '+ startPosLng1,*/
						origin: start,
						destination: end1,
						waypoints: wayPoints1,
						optimizeWaypoints: true,
						unitSystem: google.maps.UnitSystem.METRIC,
						travelMode: 'WALKING'
						};
			var route = null;
			directionsService.route(requestRoute, function(result, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(result);
					route = result.routes[0];
					$scope.route = route
					console.log($scope.route) //save Route Func
						
					
						for (var i = 0; i < route.legs.length; i++) {
							var routeSegment = i + 1;
							timeLength += route.legs[i].distance.value;
							routeLength += route.legs[i].duration.value;
						}
						
						$scope.timeLength = timeLength;
						$scope.routeLength = routeLength;
						$scope.totalTimeMinutes = function() {
							var time = 0;
							if (timeLength/60 < 60) {
								time = Math.floor(timeLength/60) + "min";
							} else if (timeLength/60 > 60) {
								time = Math.floor(timeLength/60) + "h." + " " + timeLength%60 + "min"
							}
							return time;
						};
						
						var totalRouteKm;
						$scope.totalRouteKm = function() {
							return routeLength/1000 + "km";
						};
						
					}
			});
		}
		
		
		
		$scope.saveRoute = function() {
			console.log($scope.route)//Write here the ajax request to save the route to tha DB
		}
		var input = document.getElementById('pac-input');
		var searchBox = new google.maps.places.SearchBox(input);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
       
		$scope.changeInput = function() {
			console.warn($scope.newCity);
		};
		map.addListener('bounds_changed', function() { // Bias the SearchBox results towards current map's viewport.
			searchBox.setBounds(map.getBounds());
		});
     
		var markers = [];
		searchBox.addListener('places_changed', function() {	// Listen for the event fired when the user selects a prediction and retrieve
			var places = searchBox.getPlaces();					 // more details for that place.
		       
			if (places.length == 0) {
				return;
			}
			markers.forEach(function(marker) { // Clear out the old markers.
				marker.setMap(null);
			});
			markers = [];
			var bounds = new google.maps.LatLngBounds(); // For each place, get the icon, name and location.
			map.setCenter(bounds.getCenter());
			places.forEach(function(place) {
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}
				var icon = {
						url: place.icon,
						size: new google.maps.Size(71, 71),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 34),
						scaledSize: new google.maps.Size(25, 25)
						};
				markers.push(new google.maps.Marker({  // Create a marker for each place.
						map: map,
						icon: icon,
						title: place.name,
						position: place.geometry.location
				}));
				if (place.geometry.viewport) {  // Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
			});
			map.fitBounds(bounds);
			mapOptions = {
						zoom: 13,
						mapTypeId: google.maps.MapTypeId.ROADMAP
						};
			map.setOptions(mapOptions);
			var requestNewCityPlaces = {
						location: map.getCenter(),
						radius: '2000',
						types: ['poi']
						};
			service.nearbySearch(requestNewCityPlaces, callback);
			

			
			});
	
        }); 	

	}
}]);
  

/**
 * var formSection = document.getElementById("form");

formSection.addEventListener('focus', function(e){
	var target = e.target;
	if (target.tagName.toLowerCase()== "input" 
			|| target.tagName.toLowerCase()=="textarea") {
		var label = target.previousElementSibling;
		label.style.transition = "0.5s ease";
		label.style.transform = "translate(0px, -1.8em)";
	}
	
}, true);

}, false);
 */

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
							$location.path('/homePage');
						} else {
							alert("Not success");
						}
					})
				
				$scope.newUser = {};
			}
			
			/*label.style.transition = "0.5s ease";
			label.style.transform = "translate(0px, -1.8em)";*/
		
}])
/**
 * 
 */
travelAssistant.controller("EditUserController",
		['$scope', 'userService', '$http',
		 function EditUserController($scope, userService, $http){
	/*$scope.users = userService.getUserById($routeParams.id);
	$scope.userId = $routeParams.id;
	$scope.update = function() {
		userService.updateById($routeParams.id, $scope.users);
		$location.url('/homePage/' + $routeParams.id);
	}*/
	$scope.makeNewPass = function(user) {
		/*$location.url('/homePage/' + $routeParams.id);*/
		
		var user = $scope.user.name;
		var pass = $scope.user.password;
		var passRepeat = $scope.user.passRepeat;
		if (pass === passRepeat){
			var data = {
					name: user,
					password: pass,
			}
		} else {
			console.log('error');
		}
		
		$http({
			url: '../server/update.php',
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
	
	}
	
}])
/**
 * 
 */
travelAssistant.controller("HomePageController",
		['$scope', 'userService', '$http',
		 function HomePageController($scope, userService, $http){
			
			
		}])

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
/**
 * 
 */
travelAssistant.controller("SignUpUserController", 
		['$scope', 'userService', '$http', '$location', 'authentication',
		 function SignUpUserController($scope, userService, $http, $location, authentication){
	$scope.newUser = {};
	
/*	var user = $scope.newUser.name;
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
	} else {
		console.log('error');
	}*/
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
		} else {
			console.log('error');
		}
		authentication.registerUser(data)
		.then(function(loggedInUser){
			$location.path('/homePage/login');
		});
	};
	/*$scope.addUserAjax = function(newUser) {
		
		var user = $scope.newUser.name;
		var pass = $scope.newUser.password;
		var passRepeat = $scope.newUser.passRepeat;
		var email = $scope.newUser.email;
		if (pass === passRepeat){
			var data = {
					name: user,
					password: pass,
					email: email
			}
		} else {
			console.log('error');
		}
		userService.addNewUser($scope.newUser);
		
			$http({
				url: '../server/insert.php',
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
		*/
		$scope.newUser = {};

}])