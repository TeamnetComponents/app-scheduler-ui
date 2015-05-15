'use strict';

schedulerServices
    .factory('SchedulableJob', function ($resource) {
        return $resource('app/rest/schedulableJob/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.nextScheduledExecution = new Date(data.nextScheduledExecution);
                    data.lastExecutionTime = new Date(data.lastExecutionTime);
                    return data;
                }
            }
        });
    });
