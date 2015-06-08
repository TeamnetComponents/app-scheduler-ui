'use strict';

schedulerFilters.filter('friendlyFormat', ['booleanFriendlyFormatFilter', function (booleanFriendlyFormat) {
    return function (input) {
        var result = booleanFriendlyFormat(input);
        if (result)
            return result;
        //else // add extra filters here
    };
}]);