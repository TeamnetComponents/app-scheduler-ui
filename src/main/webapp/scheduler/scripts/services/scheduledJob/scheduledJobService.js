'use strict';

schedulerServices
    .factory('ScheduledJob', ['$resource', function ($resource) {
        return $resource('app/rest/scheduledJob/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    }]);
