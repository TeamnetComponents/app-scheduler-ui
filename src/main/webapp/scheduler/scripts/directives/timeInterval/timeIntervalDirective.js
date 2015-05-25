/**
 * Created by Marian.Spoiala on 5/22/2015.
 */


/* Creeaza directiva echivalent pt ng-include html si controller timeinterval */
schedulerDirectives.directive('intervalAdd', function() {
    return {
        controller : '@',
        name: 'TimeIntervalController',
        templateUrl: 'scheduler/views/timeInterval/timeIntervalForm.html'
    };
});