angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

})

.controller('PlaylistsCtrl', function ($scope) {

    })
    .controller('LoginCtrl', function ($scope) {

    })
    .controller('SignupCtrl', function ($scope) {

    })

.controller('HomeCtrl', function ($scope, $stateParams) {


    $scope.slider = [{
        image: "img/slider/1.jpg",

    }, {
        image: "img/slider/3.jpg",
    }, {
        image: "img/slider/4.jpg",
    }];
    $scope.notification = [{
        image: "img/slider/3.jpg",
        title: "Lorem ipsum dolor",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"

    }, {
        image: "img/slider/4.jpg",
        title: "Lorem ipsum dolor",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }, {
        image: "img/slider/1.jpg",
        title: "Lorem ipsum dolor",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }];

});