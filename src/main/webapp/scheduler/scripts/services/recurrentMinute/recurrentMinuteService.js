'use strict';

schedulerServices
    .factory('RecurrentMinute', function ($resource) {
        return $resource('app/rest/recurrentMinute/:id', {}, {
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
