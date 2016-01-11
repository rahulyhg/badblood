// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}

		try {
			push = PushNotification.init({
				"android": {
					"senderID": "694450719069",
					"icon": "img/icon.png"
				},
				"ios": {
					"alert": "true",
					"badge": "true",
					"sound": "true"
				},
				"windows": {}
			});

			push.on('registration', function (data) {
				console.log(data);
				$.jStorage.set("device", data.registrationId);
				var isIOS = ionic.Platform.isIOS();
				var isAndroid = ionic.Platform.isAndroid();
				if (isIOS) {
					$.jStorage.set("os", "iOS");
				} else if (isAndroid) {
					$.jStorage.set("os", "Android");
				}
			});

			push.on('notification', function (data) {
				console.log(data);
			});

			push.on('error', function (e) {
				conosle.log("ERROR");
				console.log(e);
			});
		} catch (e) {
			console.log(e)
		}

	});
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
	$httpProvider.defaults.withCredentials = true;
	$ionicConfigProvider.views.maxCache(0);
	$stateProvider

		.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})

	.state('app.emergency', {
			url: '/emergency',
			views: {
				'menuContent': {
					templateUrl: 'templates/emergency.html',
					controller: 'EmergencyCtrl'
				}
			}
		})
		.state('app.needblood', {
			url: '/needblood',
			views: {
				'menuContent': {
					templateUrl: 'templates/needblood.html',
					controller: 'NeedbloodCtrl'
				}
			}
		})
		.state('app.gallery', {
			url: '/gallery',
			views: {
				'menuContent': {
					templateUrl: 'templates/gallery.html',
					controller: 'GalleryCtrl'
				}
			}
		})
		.state('app.activity', {
			url: '/activity',
			views: {
				'menuContent': {
					templateUrl: 'templates/activity.html',
					controller: 'ActivityCtrl'
				}
			}
		})
		.state('app.notification', {
			url: '/notification',
			views: {
				'menuContent': {
					templateUrl: 'templates/notification.html',
					controller: 'NotificationCtrl'
				}
			}
		})
		.state('app.notidetail', {
			url: '/notidetail',
			views: {
				'menuContent': {
					templateUrl: 'templates/notidetail.html',
					controller: 'NotidetailCtrl'
				}
			}
		})
		.state('app.actdetail', {
			url: '/actdetail',
			views: {
				'menuContent': {
					templateUrl: 'templates/actdetail.html',
					controller: 'ActdetailCtrl'
				}
			}
		})
		.state('app.about', {
			url: '/about',
			views: {
				'menuContent': {
					templateUrl: 'templates/about.html',
					controller: 'AboutCtrl'
				}
			}
		})
		.state('app.contact', {
			url: '/contact',
			views: {
				'menuContent': {
					templateUrl: 'templates/contact.html',
					controller: 'ContactCtrl'
				}
			}
		})
		.state('app.profile', {
			url: '/profile',
			views: {
				'menuContent': {
					templateUrl: 'templates/profile.html',
					controller: 'ProfileCtrl'
				}
			}
		})
		.state('app.register', {
			url: '/register',
			views: {
				'menuContent': {
					templateUrl: 'templates/register.html',
					controller: 'RegisterCtrl'
				}
			}
		})
		.state('app.family', {
			url: '/family',
			views: {
				'menuContent': {
					templateUrl: 'templates/family.html',
					controller: 'FamilyCtrl'
				}
			}
		})
		.state('app.donatenow', {
			url: '/donatenow',
			views: {
				'menuContent': {
					templateUrl: 'templates/donatenow.html',
					controller: 'DonatenowCtrl'
				}
			}
		})
		.state('app.hospital', {
			url: '/hospital',
			views: {
				'menuContent': {
					templateUrl: 'templates/hospital.html',
					controller: 'HospitalCtrl'
				}
			}
		})
		.state('app.request', {
			url: '/request',
			views: {
				'menuContent': {
					templateUrl: 'templates/request.html',
					controller: 'RequestCtrl'
				}
			}
		})
		.state('login', {
			url: "/login",
			templateUrl: "templates/login.html",
			controller: 'LoginCtrl'
		})
		.state('signup', {
			url: "/signup",

			templateUrl: "templates/signup.html",
			controller: 'SignupCtrl'

		})
		.state('app.home', {
			url: '/home',
			views: {
				'menuContent': {
					templateUrl: 'templates/home.html',
					controller: 'HomeCtrl'
				}
			}
		});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/home');
})

.directive('headerShrink', function ($document) {
	return {
		restrict: 'A',
		link: function ($scope, $element, $attr) {
			var resizeFactor, scrollFactor, blurFactor;
			var header = $document[0].body.querySelector('.map');

			$scope.$on('contentScroll.scroll', function (event, scrollView) {
				if (scrollView.__scrollTop >= 0) {
					scrollFactor = scrollView.__scrollTop / 2;

					header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, +' + scrollFactor + 'px, 0)';

				} else {
					// shrink(header, $element[0], 0, headerHeight);
					resizeFactor = -scrollView.__scrollTop / 100 + 0.99;
					blurFactor = -scrollView.__scrollTop / 10;
					header.style[ionic.CSS.TRANSFORM] = 'scale(' + resizeFactor + ',' + resizeFactor + ')';
					//          header.style.webkitFilter = 'blur('+blurFactor+'px)';


				}
			});
		}
	}
})

.filter('uploadpath', function () {
	return function (input) {
		return adminurl + "uploadfile/getupload?file=" + input;
	};
})

.directive('capitalizeFirst', function ($parse) {
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, modelCtrl) {
			var capitalize = function (inputValue) {
				if (inputValue === undefined) {
					inputValue = '';
				}
				// var capitalized = inputValue.charAt(0).toUpperCase() + inputValue.substring(1);
				var capitalized = inputValue.toUpperCase();
				if (capitalized !== inputValue) {
					modelCtrl.$setViewValue(capitalized);
					modelCtrl.$render();
				}
				return capitalized;
			}
			modelCtrl.$parsers.push(capitalize);
			capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
		}
	};
})

.directive('onlyDigits', function () {
	return {
		require: 'ngModel',
		link: function (scope, element, attr, ngModelCtrl) {
			function fromUser(text) {
				if (text) {
					var transformedInput = text.replace(/[^0-9]/g, '');

					if (transformedInput !== text) {
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();
					}
					return transformedInput;
				}
				return undefined;
			}
			ngModelCtrl.$parsers.push(fromUser);
		}
	};
});
