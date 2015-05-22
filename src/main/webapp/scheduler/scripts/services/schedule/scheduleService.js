'use strict';

schedulerServices
    .factory('Schedule', function ($resource) {
        return $resource('app/rest/schedule/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.startTime = new Date(data.startTime);
                    data.endTime = new Date(data.endTime);
                    return data;
                }
            }
        });
    });

schedulerServices.factory('CustomFireTimes', ['$http', function($http) {
    var list = {};

    list.getMonths = function() {
        return $http( {
            url: "scheduler/data/months_ro.json",
            method: "GET"});
    }

    list.getWeekDays = function() {
        return $http( {
            url: "scheduler/data/weekDays_ro.json",
            method: "GET"});
    }

    return list;
} ]);
