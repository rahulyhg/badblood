// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

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
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
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
        .state('app.hospital', {
            url: '/hospital',
            views: {
                'menuContent': {
                    templateUrl: 'templates/hospital.html',
                    controller: 'HospitalCtrl'
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
    $urlRouterProvider.otherwise('/login');
});