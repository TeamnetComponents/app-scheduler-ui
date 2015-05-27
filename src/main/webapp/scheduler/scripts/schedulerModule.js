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
           .when('/recurrentTimeUnit', {
              templateUrl: 'scheduler/views/recurrentTimeUnit/recurrentTimeUnitWrapper.html',
              controller: 'RecurrentTimeUnitController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });

    $routeProvider
           .when('/task', {
              templateUrl: 'scheduler/views/task/taskWrapper.html',
              controller: 'TaskController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });
    $routeProvider
           .when('/scheduledJob', {
              templateUrl: 'scheduler/views/scheduledJob/scheduledJobWrapper.html',
              controller: 'ScheduledJobController',
              access: {
                  authorizedModules: [AUTH_BOOTSTRAP.all]
              }
           });
    //place some routes here

        $routeProvider
            .when('/scheduleOk', {
                templateUrl: 'scheduler/views/scheduleOk/scheduleWrapper.html',
                controller: 'ScheduleControllerOk',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            });
    });