schedulerDirectives.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'mm/dd/yy',
                onSelect: function (date) {
                    var updateDate = function() {
                        scope.date = date;
                    };
                    scope.$apply(updateDate);
                }
            });
        }
    };
});