'use strict';

schedulerServices
    .factory('TimeUnit', function ($resource) {
        return $resource('app/rest/timeUnit/:id', {}, {
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
