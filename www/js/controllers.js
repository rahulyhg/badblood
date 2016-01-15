var allfunction = {};
angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $stateParams, $ionicScrollDelegate, $ionicSlideBoxDelegate, $ionicPopup, $ionicLoading, MyServices, $state) {

    $timeout(function() {
        $scope.slides = ['1', '2'];
        $ionicSlideBoxDelegate.update();
    }, 900);

    allfunction.msg = function(msg, title) {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">' + msg + '!</p>',
            title: title,
            scope: $scope,
        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2500);
    };

    allfunction.loading = function() {
        allfunction.countNotify();
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-positive"></ion-spinner>'
        });
        $timeout(function() {
            $ionicLoading.hide();
        }, 5000);
    };

    allfunction.countNotify = function() {
        if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").id) {
            MyServices.countNotify($.jStorage.get("deviceObj").id, function(data) {
                $scope.notiBadge = data;
            })
        }
    }

    $scope.logout = function() {
        MyServices.logout(function(data) {
            console.log(data);
            if (data.value == true) {
                $state.go('login');
            }
        })
    }

})

.controller('HomeCtrl', function($scope, $stateParams, $ionicScrollDelegate, MyServices, $ionicSlideBoxDelegate, $cordovaDevice, $ionicLoading) {

    allfunction.countNotify();
    $scope.pagedata = {};
    $scope.pagedata.pagenumber = 1;
    $scope.pagedata.pagesize = 20;

    $scope.onContentScroll = function() {
        var scrollDelegate = $ionicScrollDelegate.$getByHandle('contentScroll');
        var scrollView = scrollDelegate.getScrollView();
        $scope.$broadcast('contentScroll.scroll', scrollView);
    };

    $scope.currentDate = new Date();

    document.addEventListener("deviceready", function() {
        var platform = $cordovaDevice.getPlatform();
        console.log("platform = " + platform);
        var uuid = $cordovaDevice.getUUID();
        console.log("uuid = " + uuid);
        if ($.jStorage.get('device')) {
            var obj = {};
            obj.uuid = uuid;
            obj.platform = platform;
            obj.deviceid = $.jStorage.get('device');
            $.jStorage.set("deviceObj", obj);
            allfunction.loading();
            MyServices.saveUser(obj, function(data) {
                $ionicLoading.hide();
                console.log(data);
                if (data.id) {
                    var deviceObj = $.jStorage.get("deviceObj");
                    deviceObj.id = data.id;
                    $.jStorage.set("deviceObj", deviceObj);
                }
            })
        }
    }, false);


    MyServices.getNotification($scope.pagedata, function(data) {
        console.log(data);
        $scope.notification = data;
    })

    MyServices.getSlider(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.slides = data[0].image;
            $ionicSlideBoxDelegate.update();
        }
    })



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

    // $scope.notification = [{
    //     image: "img/slider/3.jpg",
    //     title: "Lorem ipsum dolor",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    // }, {
    //     image: "img/slider/4.jpg",
    //     title: "Lorem ipsum dolor",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    // }, {
    //     image: "img/slider/1.jpg",
    //     title: "Lorem ipsum dolor",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    // }];

})

.controller('EmergencyCtrl', function($scope, $ionicPopup, $timeout, MyServices, $state) {


})

.controller('GalleryCtrl', function($scope) {

})

.controller('LoginCtrl', function($scope, $ionicPopup, $timeout, MyServices, $state) {
    //popup success
    $scope.showSuccess = function() {
        var alertPopup = $ionicPopup.alert({
            scope: $scope,
            templateUrl: 'templates/forgetpassword.html',
        });

        alertPopup.then(function(res) {
            console.log('Thanks');
        });

        $scope.closPop = function() {
            console.log("Close called");
            alertPopup.close();
        };
    };

})

.controller('NeedbloodCtrl', function($scope, $ionicScrollDelegate) {


})

.controller('SignupCtrl', function($scope) {

    $scope.signup = {};

    $scope.doSignUp = function() {
        console.log($scope.signup);
    }

})

.controller('RequestCtrl', function($scope) {

    $scope.notification = [{
        image: "img/slider/3.jpg",
        title: "Lorem ipsum dolor",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }];

})

.controller('ActivityCtrl', function($scope) {

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

.controller('RegisterCtrl', function($scope, $ionicScrollDelegate, $ionicPopup, $timeout) {

    //    tab change
    $scope.tab = 'new';
    $scope.classa = 'active';
    $scope.classb = '';

    $scope.tabchange = function(tab, a) {
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
    $scope.showRegi = function() {
        var alertPopup = $ionicPopup.alert({
            templateUrl: 'templates/regisuccess.html',
        });

        alertPopup.then(function(res) {
            console.log('Thanks');
        });

        $timeout(function() {
            alertPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    $scope.showOtp = function() {
        var alertPopup = $ionicPopup.alert({
            templateUrl: 'templates/otp.html',
        });

        alertPopup.then(function(res) {
            console.log('Thanks');
        });
        // 	$scope.closeOTP = function() {
        // alertPopup.close();
        // };
        $timeout(function() {
            alertPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    //popup success
    $scope.showSuccess = function() {
        var alertPopup = $ionicPopup.alert({
            templateUrl: 'templates/success.html',
        });

        alertPopup.then(function(res) {
            console.log('Thanks')
        });

        $timeout(function() {
            alertPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    //popup failed
    $scope.showFailed = function() {
        var alertPopup = $ionicPopup.alert({
            templateUrl: 'templates/failed.html',
        });

        alertPopup.then(function(res) {
            console.log('Thanks');
        });

        $timeout(function() {
            alertPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

})

.controller('HospitalCtrl', function($scope, MyServices, $ionicLoading) {

    allfunction.loading();
    $scope.pageno = 0;
    $scope.hospitals = [];
    $scope.shownodata = false;
    $scope.keepscrolling = true;

    $scope.addMoreItems = function() {
        ++$scope.pageno;
        MyServices.getLimitedHospital($scope.pageno, function(data, status) {
            console.log(data);
            if (data.value == false) {
                $scope.keepscrolling = false;
            }
            _.each(data.data, function(n) {
                $scope.hospitals.push(n);
            });
            console.log($scope.hospitals);
            if ($scope.hospitals.length == 0) {
                $scope.shownodata = true;
            }
            $ionicLoading.hide();
        });
    }
    $scope.addMoreItems();

})

.controller('DonatenowCtrl', function($scope) {

})

.controller('NotidetailCtrl', function($scope, $stateParams, MyServices, $ionicLoading) {
    allfunction.loading();

    if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").id) {
        var obj = {};
        obj._id = $stateParams.id;
        obj.user = $.jStorage.get("deviceObj").id;
        MyServices.saveNotification(obj, function(data) {
            console.log(data);
        });
    }

    MyServices.getOneNotification($stateParams.id, function(data, status) {
        $ionicLoading.hide();
        console.log(data);
        $scope.notification = data; //Add More Array
    });

})

.controller('ActdetailCtrl', function($scope) {

})

.controller('AboutCtrl', function($scope) {

})

.controller('ProfileCtrl', function($scope, $ionicScrollDelegate) {
    //    tab change
    $scope.tab = 'new';
    $scope.classa = 'active';
    $scope.classb = '';

    $scope.tabchange = function(tab, a) {
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

.controller('ContactCtrl', function($scope, $ionicPopup, $timeout) {
    //popup success

    $scope.showSuccess = function() {
        var alertPopup = $ionicPopup.alert({
            templateUrl: 'templates/successsend.html',
        });

        alertPopup.then(function(res) {
            console.log('Thanks');
        });

        $timeout(function() {
            alertPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

})

.controller('NotificationCtrl', function($scope, MyServices, $ionicLoading) {

    $scope.pagedata = {};
    $scope.pagedata.pagenumber = 1;
    $scope.pagedata.pagesize = 20;

    MyServices.getNotification($scope.pagedata, function(data) {
        console.log(data);
        $scope.notification = data;
    })

    // $scope.notification = [{
    //     image: "img/slider/3.jpg",
    //     title: "Lorem ipsum dolor",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    // }, {
    //     image: "img/slider/4.jpg",
    //     title: "Lorem ipsum dolor",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    // }, {
    //     image: "img/slider/1.jpg",
    //     title: "Lorem ipsum dolor",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    // }];

})

.controller('FamilyCtrl', function($scope) {
    $scope.member = [{
        image: "img/user1.png",
    }, {
        image: "img/user1.png",
    }, {
        image: "img/user1.png",
    }, {
        image: "img/user1.png",
    }];

});
