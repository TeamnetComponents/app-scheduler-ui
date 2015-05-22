'use strict';

schedulerServices
    .factory('ScheduledJob', function ($resource) {
        return $resource('app/rest/scheduledJob/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    if (data.nextScheduledExecution !== null && data.nextScheduledExecution !== undefined) {
                        data.nextScheduledExecution = new Date(data.nextScheduledExecution);
                    }
                    if (data.lastExecutionTime !== null && data.lastExecutionTime !== undefined) {
                        data.lastExecutionTime = new Date(data.lastExecutionTime);
                    }
                    return data;
                }
            }
        });
    });
