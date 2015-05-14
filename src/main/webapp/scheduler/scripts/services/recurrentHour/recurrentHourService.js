'use strict';

schedulerServices
    .factory('RecurrentHour', function ($resource) {
        return $resource('app/rest/recurrentHour/:id', {}, {
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
