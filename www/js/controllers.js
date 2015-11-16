angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

})

.controller('EmergencyCtrl', function ($scope) {
        $scope.notification = [{
            image: "img/slider/3.jpg",
            title: "Lorem ipsum dolor",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"

    }];
    })
    .controller('LoginCtrl', function ($scope) {

    })
    .controller('NeedbloodCtrl', function ($scope, $ionicScrollDelegate) {
        //    tab change

        $scope.tab = 'fresh';
        $scope.classa = 'active';
        $scope.classb = '';

        $scope.tabchange = function (tab, a) {
            //        console.log(tab);
            $scope.tab = tab;
            if (a == 1) {
                $ionicScrollDelegate.scrollTop();
                $scope.classa = "active";
                $scope.classb = '';
            } else {
                $ionicScrollDelegate.scrollTop();
                $scope.classa = '';

                $scope.classb = "active";
            }
        };
    })
    .controller('SignupCtrl', function ($scope) {

    })
    .controller('ActivityCtrl', function ($scope) {
        $scope.notification = [{
            image: "img/slider/3.jpg",
            title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,"


    }, {
            image: "img/slider/4.jpg",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"

    }, {
            image: "img/slider/1.jpg",
            title: "Lorem ipsum dolor"

    }];

    })
    .controller('RegisterCtrl', function ($scope, $ionicScrollDelegate, $ionicPopup, $timeout) {

        //    tab change

        $scope.tab = 'new';
        $scope.classa = 'active';
        $scope.classb = '';

        $scope.tabchange = function (tab, a) {
            //        console.log(tab);
            $scope.tab = tab;
            if (a == 1) {
                $ionicScrollDelegate.scrollTop();
                $scope.classa = "active";
                $scope.classb = '';
            } else {
                $ionicScrollDelegate.scrollTop();
                $scope.classa = '';

                $scope.classb = "active";
            }
        };
        //popup registration success
        $scope.showRegi = function () {

            var alertPopup = $ionicPopup.alert({
                templateUrl: 'templates/regisuccess.html',

            });

            alertPopup.then(function (res) {

                console.log('Thanks');

            });
            $timeout(function () {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

        };
        //popup success
        $scope.showSuccess = function () {

            var alertPopup = $ionicPopup.alert({
                templateUrl: 'templates/success.html',

            });

            alertPopup.then(function (res) {

                console.log('Thanks');

            });
            $timeout(function () {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

        };
        //popup failed
        $scope.showFailed = function () {

            var alertPopup = $ionicPopup.alert({
                templateUrl: 'templates/failed.html',

            });

            alertPopup.then(function (res) {

                console.log('Thanks');

            });
            $timeout(function () {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

        };

    })
    .controller('HospitalCtrl', function ($scope) {

    })   
    .controller('NotidetailCtrl', function ($scope) {

    })  
    .controller('ActdetailCtrl', function ($scope) {

    })
    .controller('NotificationCtrl', function ($scope) {
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
    })
    .controller('FamilyCtrl', function ($scope) {
        $scope.member = [{
            image: "img/user1.png",

    }, {
            image: "img/user1.png",
    }, {
            image: "img/user1.png",
    }, {
            image: "img/user1.png",
    }];

    })

.controller('HomeCtrl', function ($scope, $stateParams) {

    $scope.head = [{
        qoute: "Blood Donation will cost you nothing but it will save a life !!!"

    }];

    $scope.slider = [{
        image: "img/slider/5.jpg",

    }, {
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