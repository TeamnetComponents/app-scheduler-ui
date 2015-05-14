'use strict';

schedulerServices
    .factory('TimeInterval', function ($resource) {
        return $resource('app/rest/timeInterval/:id', {}, {
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
