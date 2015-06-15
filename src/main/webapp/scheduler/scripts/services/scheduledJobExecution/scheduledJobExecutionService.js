'use strict';

schedulerServices
    .factory('ScheduledJobExecution', ['$resource', function ($resource) {
        return $resource('app/rest/scheduledJobExecution/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    //data.scheduledFireTime = new Date(data.scheduledFireTime);
                    //data.actualFireTime = new Date(data.actualFireTime);
                    //data.lastFireTime = new Date(data.lastFireTime);
                    //data.nextFireTime = new Date(data.nextFireTime);
                    data.scheduledFireTime = moment(data.scheduledFireTime).toDate();
                    data.actualFireTime = moment(data.actualFireTime).toDate();
                    data.lastFireTime = moment(data.lastFireTime).toDate();
                    data.nextFireTime = moment(data.nextFireTime).toDate();
                    return data;
                }
            }
        });
    }]);
