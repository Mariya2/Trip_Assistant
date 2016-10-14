

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
	if(authentication.isAuthenticated()){
		$liacation.path('/InsidePage/mapApp')
	}
	
	
	$scope.logout = function(){
		
	/*	authentication.isAuthenticated = false;*/
		authentication.logoutUser()
	}
		
	identity.getCurrentUser()
		.then(function(user){
	
			$scope.currentUser = user;
			
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