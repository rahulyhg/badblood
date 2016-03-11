var allfunction = {};
var userImage = '';
angular.module('starter.controllers', ['ion-gallery', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $stateParams, $ionicScrollDelegate, $ionicSlideBoxDelegate, $ionicPopup, $ionicLoading, MyServices, $state) {

    $scope.hideRegister = false;
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
        }, 3000);
    };

    allfunction.loading = function() {
        allfunction.countNotify();
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-positive"></ion-spinner>'
        });
        $timeout(function() {
            $ionicLoading.hide();
        }, 10000);
    };

    allfunction.countNotify = function() {
        var obj = {};
        if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").id && !$.jStorage.get("deviceObj").donorid) {
            obj.user = true;
            obj._id = $.jStorage.get("deviceObj").id;
            MyServices.countNotify(obj, function(data) {
                $scope.notiBadge = data;
            })
        } else if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").donorid) {
            obj.donor = true;
            obj._id = $.jStorage.get("deviceObj").donorid;
            MyServices.countNotify(obj, function(data) {
                $scope.notiBadge = data;
            })
        }
        if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").donorid) {
            MyServices.countEmergency($.jStorage.get("deviceObj").donorid, function(data) {
                $scope.emergencyBadge = data;
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

    allfunction.getUserData = function() {
        $scope.userData = {};
        if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").donorid) {
            MyServices.getOneDonor($.jStorage.get("deviceObj").donorid, function(data) {
                console.log(data);
                if (data.value != false) {
                    $scope.userData = data;
                    userImage = data.image;
                    $scope.hideRegister = true;
                }
            })
        }
    }
    allfunction.getUserData();

})

.controller('HomeCtrl', function($scope, $stateParams, $ionicScrollDelegate, MyServices, $ionicSlideBoxDelegate, $cordovaDevice, $ionicLoading, $timeout) {

    allfunction.countNotify();
    allfunction.getUserData();
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
        console.log($.jStorage.get('device'));
        if ($.jStorage.get('device') && !$.jStorage.get("deviceObj")) {
            console.log("in if");
            var obj = {};
            obj.uuid = uuid;
            obj.platform = platform;
            obj.deviceid = $.jStorage.get('device');
            $.jStorage.set("deviceObj", obj);
            allfunction.loading();
            if ($.jStorage.get("deviceObj") && !$.jStorage.get("deviceObj").donorid) {
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
        } else {
            $timeout(function() {
                if ($.jStorage.get('device') && !$.jStorage.get("deviceObj")) {
                    console.log("in else");
                    var obj = {};
                    obj.uuid = uuid;
                    obj.platform = platform;
                    obj.deviceid = $.jStorage.get('device');
                    $.jStorage.set("deviceObj", obj);
                    allfunction.loading();
                    if ($.jStorage.get("deviceObj") && !$.jStorage.get("deviceObj").donorid) {
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
                }
            }, 10000);
        }
    }, false);

    MyServices.getNotification($scope.pagedata, function(data) {
        console.log(data);
        if (data.value != false)
            $scope.notification = data;
    })

    // MyServices.getSlider(function(data) {
    //     console.log(data);
    //     if (data.value != false) {
    //         $scope.slides = data[0].image;
    //         $ionicSlideBoxDelegate.update();
    //     }
    // })

    $scope.head = [{
        qoute: "Blood Donation will cost you nothing but it will save a life !!!"
    }];

    $scope.slider = [{
        image: "img/slider/s1.jpg",
    }, {
        image: "img/slider/s2.jpg",
    }, {
        image: "img/slider/s3.jpg",
    }, {
        image: "img/slider/s4.jpg",
    }, {
        image: "img/slider/s5.jpg",
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

.controller('EmergencyCtrl', function($scope, $ionicPopup, $timeout, MyServices, $state, $ionicLoading) {

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

    function getAllRequests() {
        if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").donorid) {
            allfunction.loading();
            MyServices.getEmergencyReq($.jStorage.get("deviceObj").donorid, function(data) {
                $ionicLoading.hide();
                if (data.value != false) {
                    var i = 0;
                    _.each(data, function(n) {
                        MyServices.getOneRequest(n.requestid, function(request) {
                            if (request.value != false) {
                                n.status = request.status;
                            }
                        })
                    })
                    $scope.emergencyRequests = data;
                    console.log($scope.emergencyRequests);
                } else {
                    $scope.emergencyRequests = [];
                }
            })
        }
    }

    getAllRequests();

    $scope.rejectEmergencyRequest = function(emergencyid) {
        allfunction.loading();
        MyServices.rejectEmergencyRequest(emergencyid, function(data) {
            $ionicLoading.hide();
            console.log(data);
            if (data.value != false) {
                getAllRequests();
            }
        })
    }

    $scope.acceptEmergencyRequest = function(emergencyid, reqid) {
        allfunction.loading();
        var obj = {};
        obj._id = emergencyid;
        obj.requestid = reqid;
        obj.userid = $.jStorage.get("deviceObj").donorid;
        obj.accepted = true;
        MyServices.acceptEmergencyRequest(obj, function(data) {
            $ionicLoading.hide();
            console.log(data);
            if (data.value != false) {
                getAllRequests();
            }
        })
    }

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

.controller('NeedbloodCtrl', function($scope, $ionicScrollDelegate, MyServices, $ionicLoading) {

    $scope.need = {};
    if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").donorid) {
        MyServices.getOneDonor($.jStorage.get("deviceObj").donorid, function(data) {
            console.log(data);
            $scope.need.donorid = data.donorid;
            if (data.mobile) {
                $scope.need.mobile = data.mobile;
            }
        })
    }

    $scope.requestBlood = function() {
        if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").donorid) {
            allfunction.loading();
            $scope.need.status = "Pending";
            $scope.need.getid = $.jStorage.get("deviceObj").donorid;
            MyServices.requestBlood($scope.need, function(data) {
                $ionicLoading.hide();
                if (data.value != false) {
                    allfunction.msg("Request Submitted Successfully", "Successfull !")
                } else {
                    allfunction.msg("Invalid Donor Id", "Error !")
                }
            })
        }
    }

})

.controller('SignupCtrl', function($scope) {

    $scope.signup = {};

    $scope.doSignUp = function() {
        console.log($scope.signup);
    }

})

.controller('RequestCtrl', function($scope, MyServices, $ionicLoading) {

    $scope.showRegMsg = false;
    if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").donorid) {
        $scope.showRegMsg = false;
        allfunction.loading();
        MyServices.getMyNeedBloodReq($.jStorage.get("deviceObj").donorid, function(data) {
            $ionicLoading.hide();
            console.log(data);
            if (data.value != false) {
                _.each(data, function(n) {
                    n.image = userImage;
                })
                $scope.myBloodReqs = data;
            } else {
                $scope.myBloodReqs = [];
            }
        })
    } else {
        $scope.showRegMsg = true;
    }

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

.controller('RegisterCtrl', function($scope, $ionicScrollDelegate, $ionicPopup, $timeout, MyServices, $ionicLoading, $state, $cordovaImagePicker, $cordovaFileTransfer) {

    //    tab change
    $scope.tab = 'new';
    $scope.classa = 'active';
    $scope.classb = '';
    $scope.register = {};
    $scope.search = {};
    $scope.search.firstname = '';
    $scope.search.middlename = '';
    $scope.search.lastname = '';
    $scope.search.donorid = '';

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

    $scope.calcAge = function() {
        var birth = new Date($scope.register.birthdate);
        var curr = new Date();
        var diff = curr.getTime() - birth.getTime();
        $scope.register.age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    //popup registration success
    $scope.showRegi = function() {
        var alertPopup = $ionicPopup.alert({
            templateUrl: 'templates/regisuccess.html',
        });

        alertPopup.then(function(res) {
            console.log('Thanks');
        });
    };

    $scope.showOtp = function(mobileno, fullData) {
        if (mobileno && mobileno != "" && mobileno.toString().length == 10) {
            var fmobile = mobileno.toString().substr(mobileno.toString().length - 4);
            var mobile = "XXXXXX" + fmobile;
            var myPopup = $ionicPopup.show({
                template: '<div class="pop text-center" style="margin: -5px;"><div class="popup-body nopad" style="padding:0 !important"><h4 style="margin-bottom:5px;">Confirm !</h4><p>OTP will be sent to ' + mobile + '</p></div></div>',
                scope: $scope,
                buttons: [{
                    text: 'Cancel',
                    onTap: function(e) {
                        return false;
                    }
                }, {
                    text: '<b>OK</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        return true;
                    }
                }]
            });

            myPopup.then(function(res) {
                // console.log('Tapped!', res);
                if (res == true) {
                    allfunction.loading();
                    MyServices.sendSMS(mobileno, function(data) {
                        $ionicLoading.hide();
                        console.log(data);
                        if (data.value != false) {
                            $scope.enterOtp(data.otp, fullData);
                        }
                    })
                }
            });
        } else {
            var myErrPopup = $ionicPopup.show({
                template: '<div class="pop text-center" style="margin: -5px;"><div class="popup-body nopad" style="padding:0 !important"><h4 style="margin-bottom:5px;">Error !</h4><p>No/Invalid Mobile Number</p></div></div>',
                scope: $scope
            });
            $timeout(function() {
                myErrPopup.close();
            }, 3000);
        }
    };

    $scope.enterOtp = function(otpreceived, fullData) {
        console.log(otpreceived);
        $scope.valid = {};
        smsplugin.startReception(function(result) {
            console.log(result);
            $scope.valid.otp = result.substr(result.length - 6);
            $scope.$apply();
            smsplugin.stopReception(function(stopresult) {
                console.log(stopresult);
            }, function(stoperror) {
                if (stoperror) {
                    console.log(stoperror);
                }
            });
        }, function(error) {
            if (error) {
                console.log(error);
            }
        });
        var myPopup = $ionicPopup.show({
            template: '<input type="tel" ng-model="valid.otp">',
            title: 'Enter OTP',
            subTitle: 'Please enter the otp sent to your mobile number.',
            scope: $scope,
            buttons: [{
                text: 'Cancel',
                onTap: function(e) {
                    return false;
                }
            }, {
                text: '<b>Submit</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if ($scope.valid.otp) {
                        return $scope.valid.otp;
                    }
                }
            }]
        });

        myPopup.then(function(res) {
            console.log(res);
            if (res != false) {
                if (otpreceived === parseInt(res)) {
                    console.log("valid OTP");
                    if ($scope.register.firstname && $scope.register.lastname) {
                        saveDonor();
                    } else {
                        getOldDonorDetails(fullData);
                    }
                }
            }
        });
    }

    function saveDonor() {
        allfunction.loading();
        $scope.register._id = $.jStorage.get("deviceObj").id;
        console.log($scope.register);
        MyServices.saveApp($scope.register, function(data) {
            console.log(data);
            $ionicLoading.hide();
            if (data.value != false) {
                var deviceObj = $.jStorage.get("deviceObj");
                deviceObj.donorid = data.id;
                $.jStorage.set("deviceObj", deviceObj);
                $state.go("app.home");
            }
        })
    }

    function getOldDonorDetails(fullData) {
        allfunction.loading();
        var obj = {};
        obj._id = $.jStorage.get("deviceObj").id;
        obj.donor = fullData._id;
        console.log(obj);
        MyServices.saveApp(obj, function(data) {
            console.log(data);
            $ionicLoading.hide();
            if (data.value != false) {
                var deviceObj = $.jStorage.get("deviceObj");
                deviceObj.donorid = data.id;
                $.jStorage.set("deviceObj", deviceObj);
                $state.go("app.home");
            }
        })
    }

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

    var options = {
        maximumImagesCount: 1,
        quality: 80
    };

    $scope.uploadProfilePic = function() {
        $cordovaImagePicker.getPictures(options).then(function(resultImage) {
            // Success! Image data is here
            console.log(resultImage);
            $scope.imagetobeup = resultImage[0];
            $scope.uploadPhoto(adminurl + "uploadfile/uploadmob", function(data) {
                console.log(data);
                console.log(JSON.parse(data.response));
                $scope.register.image = JSON.parse(data.response);
            });
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

    $scope.uploadPhoto = function(serverpath, callback) {
        console.log("function called");
        $cordovaFileTransfer.upload(serverpath, $scope.imagetobeup, options)
            .then(function(result) {
                console.log(result);
                callback(result);
                $ionicLoading.hide();
                //$scope.addretailer.store_image = $scope.filename2;
            }, function(err) {
                // Error
                console.log(err);
            }, function(progress) {
                // constant progress updates
                allfunction.loading();
            });
    };

    $scope.getSearchResults = function() {
        console.log($scope.search);
        MyServices.findForApp($scope.search, function(data) {
            console.log(data);
            if (data.value != false) {
                $scope.searchResults = data;
            } else {
                $scope.searchResults = [];
            }
        })
    }

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
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
    $scope.addMoreItems();

})

.controller('DonatenowCtrl', function($scope) {

})

.controller('NotidetailCtrl', function($scope, $stateParams, MyServices, $ionicLoading) {
    allfunction.loading();

    if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").id && !$.jStorage.get("deviceObj").donorid) {
        var obj = {};
        obj._id = $stateParams.id;
        obj.user = $.jStorage.get("deviceObj").id;
        MyServices.saveNotification(obj, function(data) {
            console.log(data);
            allfunction.countNotify();
        });
    } else if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").donorid) {
        var obj = {};
        obj._id = $stateParams.id;
        obj.donor = $.jStorage.get("deviceObj").donorid;
        MyServices.saveNotification(obj, function(data) {
            console.log(data);
            allfunction.countNotify();
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

.controller('ProfileCtrl', function($scope, $ionicScrollDelegate, $ionicPopup, $timeout, MyServices, $ionicLoading, $state, $cordovaImagePicker, $cordovaFileTransfer, $filter, $ionicModal) {
    //    tab change
    $scope.tab = 'new';
    $scope.classa = 'active';
    $scope.classb = '';
    $scope.modal = '';

    $ionicModal.fromTemplateUrl('templates/historyModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.openHistory = function() {
        $scope.openModal();
    }

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

    var OGMobile = '';

    function getUserData() {
        if ($.jStorage.get("deviceObj") && $.jStorage.get("deviceObj").donorid) {
            allfunction.loading();
            MyServices.getOneDonor($.jStorage.get("deviceObj").donorid, function(data) {
                $ionicLoading.hide();
                console.log(data);
                if (data.value != false) {
                    $scope.register = data;
                    if ($scope.register.mobile) {
                        OGMobile = $scope.register.mobile;
                    }
                    if ($scope.register.birthdate) {
                        $scope.register.birthdate = $filter('date')($scope.register.birthdate, 'dd/MM/yyyy');
                    }
                }
            })
        }
    }

    getUserData();

    $scope.showOtp = function(mobileno, fullData) {
        if (OGMobile != mobileno) {
            if (mobileno && mobileno != "" && mobileno.toString().length == 10) {
                var fmobile = mobileno.toString().substr(mobileno.toString().length - 4);
                var mobile = "XXXXXX" + fmobile;
                var myPopup = $ionicPopup.show({
                    template: '<div class="pop text-center" style="margin: -5px;"><div class="popup-body nopad" style="padding:0 !important"><h4 style="margin-bottom:5px;">Confirm !</h4><p>OTP will be sent to ' + mobile + '</p></div></div>',
                    scope: $scope,
                    buttons: [{
                        text: 'Cancel',
                        onTap: function(e) {
                            return false;
                        }
                    }, {
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            return true;
                        }
                    }]
                });

                myPopup.then(function(res) {
                    // console.log('Tapped!', res);
                    if (res == true) {
                        allfunction.loading();
                        MyServices.sendSMS(mobileno, function(data) {
                            $ionicLoading.hide();
                            console.log(data);
                            if (data.value != false) {
                                $scope.enterOtp(data.otp, fullData);
                            }
                        })
                    }
                });
            } else {
                var myErrPopup = $ionicPopup.show({
                    template: '<div class="pop text-center" style="margin: -5px;"><div class="popup-body nopad" style="padding:0 !important"><h4 style="margin-bottom:5px;">Error !</h4><p>No/Invalid Mobile Number</p></div></div>',
                    scope: $scope
                });
                $timeout(function() {
                    myErrPopup.close();
                }, 3000);
            }
        } else {
            editDonor();
        }
    };

    $scope.enterOtp = function(otpreceived, fullData) {
        console.log(otpreceived);
        $scope.valid = {};
        smsplugin.startReception(function(result) {
            console.log(result);
            $scope.valid.otp = result.substr(result.length - 6);
            $scope.$apply();
            smsplugin.stopReception(function(stopresult) {
                console.log(stopresult);
            }, function(stoperror) {
                if (stoperror) {
                    console.log(stoperror);
                }
            });
        }, function(error) {
            if (error) {
                console.log(error);
            }
        });
        var myPopup = $ionicPopup.show({
            template: '<input type="tel" ng-model="valid.otp">',
            title: 'Enter OTP',
            subTitle: 'Please enter the otp sent to your mobile number.',
            scope: $scope,
            buttons: [{
                text: 'Cancel',
                onTap: function(e) {
                    return false;
                }
            }, {
                text: '<b>Submit</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if ($scope.valid.otp) {
                        return $scope.valid.otp;
                    }
                }
            }]
        });

        myPopup.then(function(res) {
            console.log(res);
            if (res != false) {
                if (otpreceived === parseInt(res)) {
                    console.log("valid OTP");
                    editDonor();
                }
            }
        });
    }

    function editDonor() {
        allfunction.loading();
        console.log($scope.register);
        if ($scope.register.vill) {
            var foundIndex = _.findIndex($scope.allvillages, function(n) {
                return n.name == $scope.register.vill;
            })
            $scope.register.village = [];
            $scope.register.village.push($scope.allvillages[foundIndex]);
        }
        MyServices.updateForApp($scope.register, function(data) {
            console.log(data);
            $ionicLoading.hide();
            if (data.value != false) {
                $scope.register = {};
                console.log($scope.register);
                getUserData();
                allfunction.getUserData();
                var mySuccessPopup = $ionicPopup.show({
                    template: '<div class="pop text-center" style="margin: -5px;"><div class="popup-body nopad" style="padding:0 !important"><h4 style="margin-bottom:5px;">Updated !</h4><p>Your changes have been updated</p></div></div>',
                    scope: $scope
                });
                $timeout(function() {
                    mySuccessPopup.close();
                }, 3000);
            }
        })
    }

    var options = {
        maximumImagesCount: 1,
        quality: 80
    };

    $scope.uploadProfilePic = function() {
        $cordovaImagePicker.getPictures(options).then(function(resultImage) {
            // Success! Image data is here
            console.log(resultImage);
            $scope.imagetobeup = resultImage[0];
            $scope.uploadPhoto(adminurl + "uploadfile/uploadmob", function(data) {
                console.log(data);
                console.log(JSON.parse(data.response));
                $scope.register.image = JSON.parse(data.response);
            });
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

    $scope.uploadPhoto = function(serverpath, callback) {
        console.log("function called");
        $scope.register.image = null;
        console.log($scope.register);
        $cordovaFileTransfer.upload(serverpath, $scope.imagetobeup, options)
            .then(function(result) {
                console.log(result);
                callback(result);
                $ionicLoading.hide();
                //$scope.addretailer.store_image = $scope.filename2;
            }, function(err) {
                // Error
                console.log(err);
            }, function(progress) {
                // constant progress updates
                allfunction.loading();
            });
    };

    MyServices.getAllVillages(function(data) {
        console.log(data);
        if (data.value != false)
            $scope.allvillages = data;
    });
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
    allfunction.loading();

    MyServices.getNotification($scope.pagedata, function(data) {
        $ionicLoading.hide();
        console.log(data);
        if (data.value != false)
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

})

.controller('GalleryCtrl', function($scope, $ionicModal, $timeout, $ionicScrollDelegate, $location, MyServices, $ionicLoading) {

    $scope.folders = [];
    $scope.msg = "";
    $scope.pageno = 1;
    $scope.keepscrolling = true;

    allfunction.loading();
    $scope.loadFolder = function(pageno) {
        MyServices.getFolder(pageno, function(data) {

            if (data.value == false) {
                $scope.keepscrolling = false;
            } else {
                _.each(data.data, function(n) {
                    $scope.folders.push(n);
                })
                $scope.folders = _.chunk($scope.folders, 2);
                console.log($scope.folders);
            }
            $ionicLoading.hide();
        });
        $timeout(function() {
            if ($scope.folders == "") {
                $scope.msg = "No Folders.";
            } else {
                $scope.msg = "";
            }
        }, 2000);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.refreshComplete');
    }
    $scope.loadFolder($scope.pageno);

    $scope.loadMoreFolders = function() {
        $scope.loadFolder(++$scope.pageno);
    }

    $scope.openFolder = function(folder) {
        $location.url("/app/innergallery/" + folder._id);
    }

})

.controller('InnerGalleryCtrl', function($scope, $ionicModal, $timeout, $ionicScrollDelegate, $stateParams, MyServices, $filter, $ionicLoading) {

    $scope.gallery = [];
    $scope.msg = "";
    allfunction.loading();
    MyServices.getFolderImages($stateParams.id, function(data) {
        if (data.value == false || !data.image || data.image == '') {
            $scope.msg = "No Galleries";
        }
        _.each(data.image, function(n) {
            $scope.gallery.push({
                "src": $filter("uploadpath")(n)
            });
        });
        $ionicLoading.hide();
    });


    $ionicModal.fromTemplateUrl('templates/modal-gallery.html', function($ionicModal) {
        $scope.omodal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    $scope.opengallery = function() {
        $scope.omodal.show();
    };

    $scope.closegallery = function() {
        $scope.omodal.hide();
    };

    $scope.openFolder = function(num) {
        $scope.opengallery();
    }

});
