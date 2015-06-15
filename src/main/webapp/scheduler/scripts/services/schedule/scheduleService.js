'use strict';

schedulerServices
    .factory('Schedule', function ($resource) {
        return $resource('app/rest/schedule/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    if (data.startTime !== null && data.startTime !== undefined) {
                        //data.startTime = new Date(data.startTime);
                        data.startTime = moment(data.startTime).toDate();
                    }
                    if (data.endTime !== null && data.endTime !== undefined) {
                        //data.endTime = new Date(data.endTime);
                        data.endTime = moment(data.endTime).toDate();
                    }
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
