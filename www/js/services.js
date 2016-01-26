// var adminurl = "http://localhost:1337/";
// var adminurl = "http://192.168.0.122:82/";
// var adminurl = "http://192.168.0.122:1337/";
var adminurl = "http://104.154.50.117/";
var imgpath = adminurl + "uploadfile/resize?file=";

angular.module('starter.services', [])

.factory('MyServices', function($http) {

    return {
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        saveUser: function(data, callback) {
            $http({
                url: adminurl + 'user/save',
                method: 'POST',
                data: data
            }).success(callback);
        },
        getSlider: function(callback) {
            $http({
                url: adminurl + 'slider/find',
                method: 'POST'
            }).success(callback);
        },
        getLimitedHospital: function(data, callback) {
            $http({
                url: adminurl + 'hospital/findlimited',
                method: 'POST',
                data: {
                    pagenumber: data,
                    pagesize: '20',
                    search: ''
                }
            }).success(callback);
        },
        getNotification: function(data, callback) {
            $http({
                url: adminurl + 'notification/findlimited',
                method: 'POST',
                data: data
            }).success(callback);
        },
        countNotify: function(userid, callback) {
            $http({
                url: adminurl + 'user/countnotify',
                method: 'POST',
                data: {
                    "_id": userid
                }
            }).success(callback);
        },
        getOneNotification: function(id, callback) {
            $http({
                url: adminurl + 'notification/findone',
                method: 'POST',
                data: {
                    '_id': id
                }
            }).success(callback);
        },
        saveNotification: function(obj, callback) {
            obj.read = true;
            $http({
                url: adminurl + 'notification/save',
                method: 'POST',
                data: obj
            }).success(callback);
        },
        getFolder: function(pageno, callback) {
            $http({
                url: adminurl + 'folder/findlimited',
                method: 'POST',
                data: {
                    pagenumber: pageno,
                    pagesize: 20
                }
            }).success(callback);
        },
        getFolderImages: function(id, callback) {
            $http({
                url: adminurl + 'folder/findone',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        sendSMS: function(mobile, callback) {
            $http({
                url: adminurl + 'user/sendSMS',
                method: 'POST',
                data: {
                    mobile: mobile
                }
            }).success(callback);
        },
        saveApp: function(userData, callback) {
            $http({
                url: adminurl + 'user/saveApp',
                method: 'POST',
                data: userData
            }).success(callback);
        },
        getOneDonor: function(userid, callback) {
            $http({
                url: adminurl + 'donor/findone',
                method: 'POST',
                data: {
                    "_id": userid
                }
            }).success(callback);
        },
        findForApp: function(search, callback) {
            $http({
                url: adminurl + 'donor/findforapp',
                method: 'POST',
                data: search
            }).success(callback);
        },
        updateForApp: function(userData, callback) {
            $http({
                url: adminurl + 'user/updateforapp',
                method: 'POST',
                data: userData
            }).success(callback);
        },
        requestBlood: function(request, callback) {
            $http({
                url: adminurl + 'request/save',
                method: 'POST',
                data: request
            }).success(callback);
        },
        setNotify: function(data) {
            $.jStorage.set("notify", data);
        },
        getNotify: function() {
            return $.jStorage.get("notify");
        },
        setUser: function(data) {
            $.jStorage.set("user", data);
        },
        getUser: function() {
            return $.jStorage.get("user");
        }
    };
});
