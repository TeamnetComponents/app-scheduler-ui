'use strict';

schedulerFilters.filter('booleanFriendlyFormat', [function () {
    return function (input) {
        if (typeof(input) === 'boolean')
            return input ? 'YES' : 'NO';
        return input === 'true' ? 'YES' : input === 'false' ? 'NO' : undefined;
    };
}]);