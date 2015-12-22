// var adminurl = "http://localhost:1337/";
var adminurl = "http://192.168.0.125:81/";
var adminurl = "http://104.197.50.51/";
var imgpath = adminurl + "uploadfile/getupload?file=";

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
