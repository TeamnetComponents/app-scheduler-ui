var schedulerModule=angular.module('schedulerModule',['schedulerControllers','schedulerServices','schedulerDirectives','schedulerConstants']);
schedulerModule
    .config(function ($routeProvider, $httpProvider, $translateProvider, tmhDynamicLocaleProvider,AUTH_BOOTSTRAP) {
        console.log('scheduler Module loading!!!');

    $routeProvider
           .when('/schedule', {
              templateUrl: 'scheduler/views/schedule/scheduleWrapper.html',
              controller: 'ScheduleController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });
    $routeProvider
           .when('/timeUnit', {
              templateUrl: 'scheduler/views/timeUnit/timeUnitWrapper.html',
              controller: 'TimeUnitController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });
    $routeProvider
           .when('/timeInterval', {
              templateUrl: 'scheduler/views/timeInterval/timeIntervalWrapper.html',
              controller: 'TimeIntervalController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });
    $routeProvider
           .when('/dayOfWeek', {
              templateUrl: 'scheduler/views/dayOfWeek/dayOfWeekWrapper.html',
              controller: 'DayOfWeekController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });
    $routeProvider
           .when('/month', {
              templateUrl: 'scheduler/views/month/monthWrapper.html',
              controller: 'MonthController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });
    $routeProvider
           .when('/recurrentYear', {
              templateUrl: 'scheduler/views/recurrentYear/recurrentYearWrapper.html',
              controller: 'RecurrentYearController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });
    $routeProvider
           .when('/recurrentDay', {
              templateUrl: 'scheduler/views/recurrentDay/recurrentDayWrapper.html',
              controller: 'RecurrentDayController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });
    $routeProvider
           .when('/recurrentHour', {
              templateUrl: 'scheduler/views/recurrentHour/recurrentHourWrapper.html',
              controller: 'RecurrentHourController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });
    $routeProvider
           .when('/recurrentMinute', {
              templateUrl: 'scheduler/views/recurrentMinute/recurrentMinuteWrapper.html',
              controller: 'RecurrentMinuteController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });
    $routeProvider
           .when('/recurrentTimeUnit', {
              templateUrl: 'scheduler/views/recurrentTimeUnit/recurrentTimeUnitWrapper.html',
              controller: 'RecurrentTimeUnitController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });

    //place some routes here

    });