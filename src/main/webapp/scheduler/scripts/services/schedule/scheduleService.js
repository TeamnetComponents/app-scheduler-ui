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
                        data.startTime = new Date(data.startTime);
                    }
                    if (data.endTime !== null && data.endTime !== undefined) {
                        data.endTime = new Date(data.endTime);
                    }
                    return data;
                }
            }
        });
    });
