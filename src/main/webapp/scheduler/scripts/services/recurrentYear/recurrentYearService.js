'use strict';

schedulerServices
    .factory('RecurrentYear', function ($resource) {
        return $resource('app/rest/recurrentYear/:id', {}, {
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
