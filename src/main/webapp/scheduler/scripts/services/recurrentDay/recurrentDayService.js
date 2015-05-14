'use strict';

schedulerServices
    .factory('RecurrentDay', function ($resource) {
        return $resource('app/rest/recurrentDay/:id', {}, {
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
