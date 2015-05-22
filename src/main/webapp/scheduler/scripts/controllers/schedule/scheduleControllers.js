'use strict';
/*
 schedulerControllers
 .controller('ScheduleController', function ($scope,AppGridConstants, Schedule, TimeInterval, Month, DayOfWeek, RecurrentTimeUnit, ScheduledJob) {


 $scope.timeIntervals = TimeInterval.query();
 $scope.months = Month.query();


 $scope.dayOfWeeks = DayOfWeek.query();
 $scope.recurrentTimeUnits = RecurrentTimeUnit.query();
 $scope.scheduledJobs = ScheduledJob.query();

 $scope.showTimeInterval = false;
 $scope.showMonth = false;
 $scope.showDayOfWeek = false;
 $scope.showRecurrentTimeUnit = false;
 $scope.showScheduledJob = false;
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
 $scope.showRecurrentTimeUnit = false;
 $scope.showScheduledJob = false;
 }
 if(grid == 'month'){
 $scope.showMonth = true;

 $scope.showTimeInterval = false;
 $scope.showDayOfWeek = false;
 $scope.showRecurrentTimeUnit = false;
 $scope.showScheduledJob = false;
 }
 if(grid == 'dayOfWeek'){
 $scope.showDayOfWeek = true;

 $scope.showTimeInterval = false;
 $scope.showMonth = false;
 $scope.showRecurrentTimeUnit = false;
 $scope.showScheduledJob = false;
 }
 if(grid == 'recurrentTimeUnit'){
 $scope.showRecurrentTimeUnit = true;

 $scope.showTimeInterval = false;
 $scope.showMonth = false;
 $scope.showDayOfWeek = false;
 $scope.showScheduledJob = false;
 }
 if(grid == 'scheduledJob'){
 $scope.showScheduledJob = true;

 $scope.showTimeInterval = false;
 $scope.showMonth = false;
 $scope.showDayOfWeek = false;
 $scope.showRecurrentTimeUnit = false;
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
 $scope.schedule = {active: null, recurrent: null, cron: null, startTime: null, endTime: null, repetitions: null, id: null};
 $scope.searchTerms = [];
 $scope.showDetails=false;
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
 if ($scope.timeInterval != null) {
 $scope.schedule.timeInterval = $scope.timeInterval;
 }
 if ($scope.scheduledJob != null) {
 $scope.schedule.scheduledJob = $scope.scheduledJob;
 }
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
 */

schedulerControllers
    .controller('ScheduleControllerOk', function ($scope, AppGridConstants, Schedule, TimeInterval, Month, DayOfWeek, RecurrentTimeUnit, ScheduledJob, CustomFireTimes) {

        $scope.timeIntervals = TimeInterval.query();
        $scope.months = Month.query();
        $scope.dayOfWeeks = DayOfWeek.query();
        $scope.recurrentTimeUnits = RecurrentTimeUnit.query();
        $scope.scheduledJobs = ScheduledJob.query();

        $scope.showTimeInterval = false;
        $scope.showMonth = false;
        $scope.showDayOfWeek = false;
        $scope.showRecurrentTimeUnit = false;
        $scope.showScheduledJob = false;
        $scope.actionEvent = "scheduleGrid";
        $scope.showEditBtn = true;
        $scope.showCreateOrEdit = false;
        $scope.showBtns = false;
        $scope.showDetails = false;
        $scope.showGrid = true;

        $scope.selectedRepetitionType = 1;
        $scope.repetitionTypes = [
            {id: "1", name: "Regular intervals"},
            {id: "2", name: "Custom fire times"}
        ];

        $scope.createdNewEvent = 'test';

        $scope.customDefinedIntervals = false;
        $scope.regularIntervals = true;

        /* ------------- Custom fire intervals ------------- */
        function resetCustomFiresIntervals() {
            $scope.nrSelectedCustom = 0;
            $scope.monthsButtons = [];
            $scope.monthDaysButtons = null;
            $scope.weekDaysButtons = [];
            $scope.hoursButtons = null;

            $scope.generateMonthDays = function () {

                $scope.monthDaysButtons = [];
                for (var i = 1; i <= 31; i++) {
                    var day = {};
                    day.id = i;
                    day.pushed = false;
                    $scope.monthDaysButtons.push(day);
                }
            };

            $scope.generateHours = function () {
                $scope.hoursButtons = [];
                for (var i = 0; i <= 23; i++) {
                    var hour = {};
                    hour.id = i;
                    hour.pushed = false;
                    $scope.hoursButtons.push(hour);
                }
            };

            if ($scope.monthDaysButtons == null) {
                $scope.generateMonthDays();
            }

            if ($scope.hoursButtons == null) {
                $scope.generateHours();
            }

            CustomFireTimes.getMonths()
                .success(function (data) {
                    $scope.monthsButtons = angular.fromJson(data);
                })
                .error(function (data) {
                    console.log(data);
                });

            CustomFireTimes.getWeekDays()
                .success(function (data) {
                    $scope.weekDaysButtons = angular.fromJson(data);
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        resetCustomFiresIntervals();

        /* Numar cate butoane au fost apasate */
        function countSelected(pushed) {
            if (pushed == true) {
                $scope.nrSelectedCustom++;
            }
            else {
                $scope.nrSelectedCustom--;
            }
        }

        $scope.selectWeekDay = function (id) {
            $scope.weekDaysButtons[id].pushed = !$scope.weekDaysButtons[id].pushed;
            countSelected($scope.weekDaysButtons[id].pushed);
        }

        $scope.selectMonth = function (id) {
            $scope.monthsButtons[id].pushed = !$scope.monthsButtons[id].pushed;
            countSelected($scope.monthsButtons[id].pushed);
        }

        $scope.selectMonthDay = function (id) {
            $scope.monthDaysButtons[id].pushed = !$scope.monthDaysButtons[id].pushed;
            countSelected($scope.monthDaysButtons[id].pushed);
        }

        $scope.selectHour = function (id) {
            $scope.hoursButtons[id].pushed = !$scope.hoursButtons[id].pushed;
            countSelected($scope.hoursButtons[id].pushed);
        }

        /* --------------------------------------------------- */

        $scope.selected = function () {
        };

        $scope.$root.$on('scheduleGridSelection', function (data) {
            $scope.showBtns = true;
        });

        $scope.getCurrentDate = function () {
            return new Date();
        };

        $scope.changeRepetitionType = function () {
            if ($scope.schedule != undefined) {
                if ($scope.selectedRepetitionType == 1) {
                    /* Setez prima valoare ca cea activa in selectorul de regular times */
                   // $scope.schedule.timeInterval.id = $scope.timeIntervals[0].id;
                    $scope.regularIntervals = true;
                }
                else if ($scope.selectedRepetitionType == 2) {
                    $scope.regularIntervals = false;
                }
            }

        };

        $scope.redrawGrid = function (grid) {

            $scope.searchTerms = [];
            $scope.searchTerms.push(
                {
                    property: 'schedule.id',
                    value: parseInt($scope.selected()[0].id),
                    type: AppGridConstants.searchFilterTypes.EQUAL,
                    negation: false
                }
            );

            if (grid == 'timeInterval') {
                $scope.showTimeInterval = true;

                $scope.showMonth = false;
                $scope.showDayOfWeek = false;
                $scope.showRecurrentTimeUnit = false;
                $scope.showScheduledJob = false;
            }
            if (grid == 'month') {
                $scope.showMonth = true;

                $scope.showTimeInterval = false;
                $scope.showDayOfWeek = false;
                $scope.showRecurrentTimeUnit = false;
                $scope.showScheduledJob = false;
            }
            if (grid == 'dayOfWeek') {
                $scope.showDayOfWeek = true;

                $scope.showTimeInterval = false;
                $scope.showMonth = false;
                $scope.showRecurrentTimeUnit = false;
                $scope.showScheduledJob = false;
            }
            if (grid == 'recurrentTimeUnit') {
                $scope.showRecurrentTimeUnit = true;

                $scope.showTimeInterval = false;
                $scope.showMonth = false;
                $scope.showDayOfWeek = false;
                $scope.showScheduledJob = false;
            }
            if (grid == 'scheduledJob') {
                $scope.showScheduledJob = true;

                $scope.showTimeInterval = false;
                $scope.showMonth = false;
                $scope.showDayOfWeek = false;
                $scope.showRecurrentTimeUnit = false;
            }
        };

        /* Construire date pentru custom fire intervals */
        function buildRecurrentTimeUnits() {
            var recurrentTimeUnits = [];

            /* Adaugare luni */
            for (var i = 0; i < $scope.monthsButtons.length; i++) {
                if ($scope.monthsButtons[i].pushed == true) {
                    var obj = {};
                    obj.value = $scope.monthsButtons[i].id;
                    obj.timeunit_id = 7; //7 = MONTH
                    obj.schedule_id = $scope.schedule.scheduledJob.id;
                    recurrentTimeUnits.push(obj);
                }
            }

            /* Adaugare zile luna */
            for (var i = 0; i < $scope.monthDaysButtons.length; i++) {
                if ($scope.monthDaysButtons[i].pushed == true) {
                    var obj = {};
                    obj.value = $scope.monthDaysButtons[i].id;
                    obj.timeunit_id = 4; //4 = DAY
                    obj.schedule_id = $scope.schedule.scheduledJob.id;
                    recurrentTimeUnits.push(obj);
                }
            }

            /* Adaugare zile saptamana*/
            for (var i = 0; i < $scope.weekDaysButtons.length; i++) {
                if ($scope.weekDaysButtons[i].pushed == true) {
                    var obj = {};
                    obj.value = $scope.weekDaysButtons[i].id;
                    obj.timeunit_id = 8; //8 = WEEK DAY
                    obj.schedule_id = $scope.schedule.scheduledJob.id;
                    recurrentTimeUnits.push(obj);
                }
            }

            /* Adaugare zile saptamana*/
            for (var i = 0; i < $scope.hoursButtons.length; i++) {
                if ($scope.hoursButtons[i].pushed == true) {
                    var obj = {};
                    obj.value = $scope.hoursButtons[i].id;
                    obj.timeunit_id = 3; //3 = HOUR
                    obj.schedule_id = $scope.schedule.scheduledJob.id;
                    recurrentTimeUnits.push(obj);
                }
            }

            return recurrentTimeUnits;
        }

        $scope.createOrUpdate = function () {
            $scope.showGrid = true;

            /* Daca este pe custom fire intervals, contruiesc arrayul */
            if ($scope.schedule.recurrent && !$scope.regularIntervals) {
                $scope.schedule.recurrentTimeUnits = buildRecurrentTimeUnits();
            }
            Schedule.save($scope.schedule,
                function () {
                    $scope.showCreateOrEdit = false;
                    $scope.refresh();
                });
        };

        $scope.clear = function () {
            $scope.schedule = {active: true, recurrent: false, cron: null, startTime: null, endTime: null, repetitions: null, id: null};
            $scope.searchTerms = [];
            $scope.showDetails = false;
        };

        $scope.showDelete = function (id) {
            if (!_.isEmpty($scope.selected())) {
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
            url: 'app/rest/schedule/list',
            id: 'schedule',
            title: 'Lista schedule'
        };

        $scope.functionality = 'Schedule';

        $scope.customOptions = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            noUnselect: true,
            enableSorting: true,
            rowTemplate: "<div ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
        };


        $scope.refresh = function () {
            $scope.$broadcast($scope.refreshEvent);
        };

        $scope.back = function () {
            $scope.showCreateOrEdit = false;
            $scope.searchTerms = [];
            $scope.showGrid = true;
        };

        $scope.showAdd = function () {
            $scope.clear();
            $scope.showCreateOrEdit = true;
            $scope.showGrid = false;
            if ($scope.timeInterval != null) {
                $scope.schedule.timeInterval = $scope.timeInterval;
            }
            if ($scope.scheduledJob != null) {
                $scope.schedule.scheduledJob = $scope.scheduledJob;
            }
        };

        $scope.showEdit = function () {
            if ((!_.isEmpty($scope.selected()))) {
                var id = parseInt($scope.selected()[0].id);
                Schedule.get({id: id}, function (data) {
                    $scope.schedule = data;
                });
                $scope.showCreateOrEdit = true;
                $scope.showDetails = true;
                $scope.showGrid = false;
            }
        };


    });
