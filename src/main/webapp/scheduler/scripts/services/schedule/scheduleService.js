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
