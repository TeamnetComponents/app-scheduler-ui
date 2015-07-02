schedulerDirectives.directive('jobExecutionDetails',[function(){
return {
    restrict: 'EA',
    scope: {
        jobExecutionId: '=',
        detailsConfig: '='
    },
    link: function(scope, element, attrs) {}
}
}]);