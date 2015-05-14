'use strict';

schedulerServices
    .factory('DayOfWeek', function ($resource) {
        return $resource('app/rest/dayOfWeek/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    });
