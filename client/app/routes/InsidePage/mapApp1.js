'use strict';

travelAssistant.controller('MapCtrl', ['$scope', '$rootScope', 'userService', function($scope, $rootScope, userService) {
    
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
			var start = $scope.selectedOptionStart;
			$scope.start = start;
			var end1 = $scope.selectedOptionEnd;
			$scope.end1 = end1;
			end1 = end1.replace('(', "").replace(')', "");
			start = start.replace('(', "").replace(')', "");
			var wayPoints1 = [];
			
			
			
				for (var int = 0; int < wayPoints.length; int++) {
					wayPoints1.push({
					location: (wayPoints[int].position+'').replace('(', "").replace(')', ""),
					stopover: true
					});
				}
				console.log(wayPoints1)
				var wayPoints2 = '';
				for (var int = 0; int < wayPoints1.length-1; int++) {
					var a = wayPoints1[int].location+', ';
					a += wayPoints1[int+1].location;
				}	
				wayPoints2 = a
				console.log(wayPoints2)
				
				$scope.wayPoints2 = wayPoints2; 
				
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
				console.log(requestRoute)
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(result);
					route = result.routes[0];
					//$scope.route = route
					//console.log($scope.route) //save Route Func
						
					
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
			/*console.log($scope.route)//Write here the ajax request to save the route to tha DB
*/			
			
				var user = '1'/*$scope.user.name*/;
				$scope.start = $scope.start.replace('(', "").replace(')', "");
				$scope.end1 = $scope.end1.replace('(', "").replace(')', "");
				
				var route = {
					user: user,
					origin: $scope.start,
					destination: $scope.end1,
					waypoints: $scope.wayPoints2,
					optimizeWaypoints: true,
					unitSystem: google.maps.UnitSystem.METRIC,
					travelMode: 'WALKING'
				};
						
				userService.registerRoute(route)
				.then(function(response){
					console.log('success');
				});
			
		}
		$scope.getAllRoutes = function() {
			userService.getRoutes()
			.then(function(response){
				console.log('success');
				console.log(response);
			});
		}
		
		
		
		var input = document.getElementById('pac-input');
		var searchBox = new google.maps.places.SearchBox(input);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
       
		$scope.changeInput = function() {
			//console.warn($scope.newCity);
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
  
