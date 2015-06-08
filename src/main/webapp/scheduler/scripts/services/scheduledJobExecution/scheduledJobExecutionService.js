'use strict';

schedulerServices
    .factory('ScheduledJobExecution', ['$resource', function ($resource) {
        return $resource('app/rest/scheduledJobExecution/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.scheduledFireTime = new Date(data.scheduledFireTime);
                    data.actualFireTime = new Date(data.actualFireTime);
                    data.lastFireTime = new Date(data.lastFireTime);
                    data.nextFireTime = new Date(data.nextFireTime);
                    return data;
                }
            }
        });
    }]);
