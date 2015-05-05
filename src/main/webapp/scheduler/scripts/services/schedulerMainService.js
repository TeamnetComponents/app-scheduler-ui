schedulerServices.factory('schedulerMainService', ['$resource', function ($resource) {
    return $resource('app/rest/main', {}, {
    });
}]);