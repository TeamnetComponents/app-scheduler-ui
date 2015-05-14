'use strict';

schedulerServices
    .factory('Month', function ($resource) {
        return $resource('app/rest/month/:id', {}, {
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
