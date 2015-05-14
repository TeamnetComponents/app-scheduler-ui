'use strict';
schedulerControllers
    .controller('ScheduleController', function ($scope,AppGridConstants, Schedule, TimeInterval, Month, DayOfWeek, RecurrentYear, RecurrentDay, RecurrentHour, RecurrentMinute, RecurrentTimeUnit) {

        
        $scope.timeIntervals = TimeInterval.query();
        $scope.months = Month.query();
        $scope.dayOfWeeks = DayOfWeek.query();
        $scope.recurrentYears = RecurrentYear.query();
        $scope.recurrentDays = RecurrentDay.query();
        $scope.recurrentHours = RecurrentHour.query();
        $scope.recurrentMinutes = RecurrentMinute.query();
        $scope.recurrentTimeUnits = RecurrentTimeUnit.query();
        
        $scope.showTimeInterval = false;
        $scope.showMonth = false;
        $scope.showDayOfWeek = false;
        $scope.showRecurrentYear = false;
        $scope.showRecurrentDay = false;
        $scope.showRecurrentHour = false;
        $scope.showRecurrentMinute = false;
        $scope.showRecurrentTimeUnit = false;
        $scope.actionEvent="scheduleGrid";
        $scope.showEditBtn = true;
        $scope.showCreateOrEdit = false;
        $scope.showBtns = false;
        $scope.showDetails = false;
        $scope.showGrid = true;

        $scope.selected = function(){};

        $scope.$root.$on('scheduleGridSelection',function(data){
            $scope.showBtns = true;
        });

        $scope.redrawGrid = function(grid) {
         
            $scope.searchTerms=[];
            $scope.searchTerms.push(
                {
                    property: 'schedule.id',
                    value: parseInt($scope.selected()[0].id),
                    type: AppGridConstants.searchFilterTypes.EQUAL,
                    negation: false
                }
            );
            
            if(grid == 'timeInterval'){
                $scope.showTimeInterval = true;
                
                $scope.showMonth = false;
                $scope.showDayOfWeek = false;
                $scope.showRecurrentYear = false;
                $scope.showRecurrentDay = false;
                $scope.showRecurrentHour = false;
                $scope.showRecurrentMinute = false;
                $scope.showRecurrentTimeUnit = false;
            }
            if(grid == 'month'){
                $scope.showMonth = true;
                
                $scope.showTimeInterval = false;
                $scope.showDayOfWeek = false;
                $scope.showRecurrentYear = false;
                $scope.showRecurrentDay = false;
                $scope.showRecurrentHour = false;
                $scope.showRecurrentMinute = false;
                $scope.showRecurrentTimeUnit = false;
            }
            if(grid == 'dayOfWeek'){
                $scope.showDayOfWeek = true;
                
                $scope.showTimeInterval = false;
                $scope.showMonth = false;
                $scope.showRecurrentYear = false;
                $scope.showRecurrentDay = false;
                $scope.showRecurrentHour = false;
                $scope.showRecurrentMinute = false;
                $scope.showRecurrentTimeUnit = false;
            }
            if(grid == 'recurrentYear'){
                $scope.showRecurrentYear = true;
                
                $scope.showTimeInterval = false;
                $scope.showMonth = false;
                $scope.showDayOfWeek = false;
                $scope.showRecurrentDay = false;
                $scope.showRecurrentHour = false;
                $scope.showRecurrentMinute = false;
                $scope.showRecurrentTimeUnit = false;
            }
            if(grid == 'recurrentDay'){
                $scope.showRecurrentDay = true;
                
                $scope.showTimeInterval = false;
                $scope.showMonth = false;
                $scope.showDayOfWeek = false;
                $scope.showRecurrentYear = false;
                $scope.showRecurrentHour = false;
                $scope.showRecurrentMinute = false;
                $scope.showRecurrentTimeUnit = false;
            }
            if(grid == 'recurrentHour'){
                $scope.showRecurrentHour = true;
                
                $scope.showTimeInterval = false;
                $scope.showMonth = false;
                $scope.showDayOfWeek = false;
                $scope.showRecurrentYear = false;
                $scope.showRecurrentDay = false;
                $scope.showRecurrentMinute = false;
                $scope.showRecurrentTimeUnit = false;
            }
            if(grid == 'recurrentMinute'){
                $scope.showRecurrentMinute = true;
                
                $scope.showTimeInterval = false;
                $scope.showMonth = false;
                $scope.showDayOfWeek = false;
                $scope.showRecurrentYear = false;
                $scope.showRecurrentDay = false;
                $scope.showRecurrentHour = false;
                $scope.showRecurrentTimeUnit = false;
            }
            if(grid == 'recurrentTimeUnit'){
                $scope.showRecurrentTimeUnit = true;
                
                $scope.showTimeInterval = false;
                $scope.showMonth = false;
                $scope.showDayOfWeek = false;
                $scope.showRecurrentYear = false;
                $scope.showRecurrentDay = false;
                $scope.showRecurrentHour = false;
                $scope.showRecurrentMinute = false;
            }
        };


        $scope.createOrUpdate = function () {
            $scope.showGrid = true;
            Schedule.save($scope.schedule,
                function () {
                     $scope.showCreateOrEdit = false;
                     $scope.refresh();
                });
        };

        $scope.clear = function () {
            $scope.schedule = {active: null, recurrent: null, cron: null, startTime: null, endTime: null, repetitions: null, years: null, daysInMonth: null, hours: null, minutes: null, id: null};
        };

        $scope.showDelete = function (id) {
            if(!_.isEmpty($scope.selected())){
                $('#deleteScheduleConfirmation').modal('show');
            }
        };

        $scope.confirmDelete = function (id) {
            Schedule.delete({id: $scope.selected()[0].id},
                function () {
                   $scope.refresh();
                   $('#deleteScheduleConfirmation').modal('hide');
                });
        };

        $scope.refreshEvent = "refreshEvent";
        $scope.selected;
        $scope.refreshFunction;

        $scope.appGrid = {
            url:'app/rest/schedule/list',
            id : 'schedule',
            title :  'Lista schedule'
            };

        $scope.functionality='Schedule';

        $scope.customOptions = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            noUnselect: true,
            enableSorting: true,
            rowTemplate: "<div ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
        };


        $scope.refresh = function(){
            $scope.$broadcast($scope.refreshEvent);


        };

        $scope.back = function(){
            $scope.showCreateOrEdit = false;
            $scope.searchTerms=[];
            $scope.showGrid = true;
        };

        $scope.showAdd = function(){
            $scope.clear();
            $scope.showCreateOrEdit = true;
             $scope.showGrid = false;
        };

        $scope.showEdit = function(){
            if((!_.isEmpty($scope.selected())) ){
            var id = parseInt($scope.selected()[0].id);
                Schedule.get({id: id}, function(data){
                    $scope.schedule = data;
                });
                $scope.showCreateOrEdit = true;
                $scope.showDetails = true;
                $scope.showGrid = false;
            }
        };


    });
