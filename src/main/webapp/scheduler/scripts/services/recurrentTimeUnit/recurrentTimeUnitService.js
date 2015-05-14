'use strict';

schedulerServices
    .factory('RecurrentTimeUnit', function ($resource) {
        return $resource('app/rest/recurrentTimeUnit/:id', {}, {
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
