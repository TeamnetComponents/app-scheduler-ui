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

        $scope.appGrid = {
            url:'app/rest/schedule/list',
            id : 'schedule'
        };

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
    .controller('ScheduleControllerOk', function ($scope, AppGridConstants, Schedule, TimeInterval, RecurrentTimeUnit, ScheduledJob, CustomFireTimes, TimeUnit) {

        $scope.timeUnits = TimeUnit.query();
        $scope.timeIntervals = TimeInterval.query();
        $scope.recurrentTimeUnits = RecurrentTimeUnit.query();
        $scope.scheduledJobs = ScheduledJob.query();

        $scope.showTimeInterval = false;
        $scope.showRecurrentTimeUnit = false;
        $scope.showScheduledJob = false;
        $scope.actionEvent = "scheduleGrid";
        $scope.showEditBtn = true;
        $scope.showCreateOrEdit = false;
        $scope.showBtns = false;
        $scope.showDetails = false;
        $scope.showGrid = true;

        $scope.repetitionTypes = [
            {id: "0", name: "Regular intervals"},
            {id: "1", name: "Custom fire times"}
        ];
        $scope.selectedRepetitionType = $scope.repetitionTypes[0];


        $scope.toggleRecurrent = function() {
            resetRegularIntervals();
        }

        $scope.changeRepetitionType = function () {
            if ($scope.schedule != undefined) {
                //Toggle Regular intervals
                if ($scope.selectedRepetitionType == $scope.repetitionTypes[0]) {
                    /* Setez prima valoare ca cea activa in selectorul de regular times */
                    if ($scope.timeIntervals !=null && $scope.timeIntervals != undefined) {
                        $scope.schedule.timeInterval = $scope.timeIntervals[0];
                    }
                    $scope.regularIntervals = true;
                }
                //Toggle Custom fire times
                else if ($scope.selectedRepetitionType == $scope.repetitionTypes[1]) {
                    $scope.regularIntervals = false;
                    $scope.schedule.timeInterval = null;
                    resetCustomFiresIntervals();
                }
            }

        };

        /* ------------- Regular intervals ----------------- */
        $scope.customDefinedIntervals = false;
        $scope.regularIntervals = true;

        function resetRegularIntervals() {
            $scope.selectedRepetitionType = $scope.repetitionTypes[0];
            $scope.customDefinedIntervals = false;
            $scope.regularIntervals = true;
            $scope.changeRepetitionType();
        }
        /* ------------------------------------------------- */

        /* ------------- Custom fire intervals ------------- */
        function createCustomFiresIntervals() {
            $scope.allMonthsButton = {pushed: false};
            $scope.allMonthDaysButton = {pushed: false};
            $scope.allWeekDaysButton = {pushed: false};
            $scope.allHoursButton = {pushed: false};
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
        function resetCustomFiresIntervals() {
            /* Resetare luni */
            $scope.allMonthsButton.pushed = false;
            for (var i = 0; i < $scope.monthsButtons.length; i++) {
                $scope.monthsButtons[i].pushed = false;
            }

            /* Resetare zile luna */
            $scope.allMonthDaysButton.pushed = false;
            for (var i = 0; i < $scope.monthDaysButtons.length; i++) {
                $scope.monthDaysButtons[i].pushed = false;
            }

            /* Resetare zile saptamana*/
            $scope.allWeekDaysButton.pushed = false;
            for (var i = 0; i < $scope.weekDaysButtons.length; i++) {
                $scope.weekDaysButtons[i].pushed = false;
            }

            /* Resetare ore*/
            $scope.allHoursButton.pushed = false;
            for (var i = 0; i < $scope.hoursButtons.length; i++) {
                $scope.hoursButtons[i].pushed = false;
            }

            $scope.nrSelectedCustom = 0;
        }

        createCustomFiresIntervals();

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

        $scope.selectAllMonths = function() {
            if ($scope.allMonthsButton.pushed == false) {
                for (var i = 0; i < $scope.monthsButtons.length; i++) {
                    if ($scope.monthsButtons[i].pushed == false) {
                        $scope.monthsButtons[i].pushed = true;
                        countSelected($scope.monthsButtons[i].pushed);
                    }
                }
                $scope.allMonthsButton.pushed = true;
            }

            else if ($scope.allMonthsButton.pushed == true) {
                for (var i = 0; i < $scope.monthsButtons.length; i++) {
                    if ($scope.monthsButtons[i].pushed == true) {
                        $scope.monthsButtons[i].pushed = false;
                        countSelected($scope.monthsButtons[i].pushed);
                    }
                }
                $scope.allMonthsButton.pushed = false;
            }
        }

        $scope.selectAllMonthDays = function () {
            if ($scope.allMonthDaysButton.pushed == false) {
                for (var i = 0; i < $scope.monthDaysButtons.length; i++) {
                    if ($scope.monthDaysButtons[i].pushed == false) {
                        $scope.monthDaysButtons[i].pushed = true;
                        countSelected($scope.monthDaysButtons[i].pushed);
                    }
                }
                $scope.allMonthDaysButton.pushed = true;
            }

            else if ($scope.allMonthDaysButton.pushed == true) {
                for (var i = 0; i < $scope.monthDaysButtons.length; i++) {
                    if ($scope.monthDaysButtons[i].pushed == true) {
                        $scope.monthDaysButtons[i].pushed = false;
                        countSelected($scope.monthDaysButtons[i].pushed);
                    }
                }
                $scope.allMonthDaysButton.pushed = false;
            }
        }


        $scope.selectAllWeekDays = function () {
            if ($scope.allWeekDaysButton.pushed == false) {
                for (var i = 0; i < $scope.weekDaysButtons.length; i++) {
                    if ($scope.weekDaysButtons[i].pushed == false) {
                        $scope.weekDaysButtons[i].pushed = true;
                        countSelected($scope.weekDaysButtons[i].pushed);
                    }
                }
                $scope.allWeekDaysButton.pushed = true;
            }

            else if ($scope.allWeekDaysButton.pushed == true) {
                for (var i = 0; i < $scope.weekDaysButtons.length; i++) {
                    if ($scope.weekDaysButtons[i].pushed == true) {
                        $scope.weekDaysButtons[i].pushed = false;
                        countSelected($scope.weekDaysButtons[i].pushed);
                    }
                }
                $scope.allWeekDaysButton.pushed = false;
            }
        }


        $scope.selectAllHours = function () {
            if ($scope.allHoursButton.pushed == false) {
                for (var i = 0; i < $scope.hoursButtons.length; i++) {
                    if ($scope.hoursButtons[i].pushed == false) {
                        $scope.hoursButtons[i].pushed = true;
                        countSelected($scope.hoursButtons[i].pushed);
                    }
                }
                $scope.allHoursButton.pushed = true;
            }

            else if ($scope.allHoursButton.pushed == true) {
                for (var i = 0; i < $scope.hoursButtons.length; i++) {
                    if ($scope.hoursButtons[i].pushed == true) {
                        $scope.hoursButtons[i].pushed = false;
                        countSelected($scope.hoursButtons[i].pushed);
                    }
                }
                $scope.allHoursButton.pushed = false;
            }
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

                $scope.showRecurrentTimeUnit = false;
                $scope.showScheduledJob = false;
            }
            if (grid == 'recurrentTimeUnit') {
                $scope.showRecurrentTimeUnit = true;

                $scope.showTimeInterval = false;
                $scope.showScheduledJob = false;
            }
            if (grid == 'scheduledJob') {
                $scope.showScheduledJob = true;

                $scope.showTimeInterval = false;
                $scope.showRecurrentTimeUnit = false;
            }
        };

        function getTimeUnitIdByCode(code) {
            if($scope.timeUnits != null && $scope.timeUnits != undefined) {
                for (var i=0; i<$scope.timeUnits.length; i++) {
                    if ($scope.timeUnits[i].code == code) {
                        return $scope.timeUnits[i];
                    }
                }
            }
            return null;
        }

        /* Construire date pentru custom fire intervals */
        function buildRecurrentTimeUnits() {
            var recurrentTimeUnits = [];

            if ($scope.allMonthsButton.pushed == false) {
                /* Adaugare luni */
                for (var i = 0; i < $scope.monthsButtons.length; i++) {
                    if ($scope.monthsButtons[i].pushed == true) {
                        var obj = {};
                        obj.value = $scope.monthsButtons[i].id;
                        obj.timeUnit = getTimeUnitIdByCode("MON");
                        obj.schedule = {};
                        recurrentTimeUnits.push(obj);
                    }
                }
            }
            else {
                var obj = {};
                obj.value = -1;
                obj.timeunit = getTimeUnitIdByCode("MON"); //7 = MONTH
                recurrentTimeUnits.push(obj);
            }


            if ($scope.allMonthDaysButton.pushed == false) {
                /* Adaugare zile luna */
                for (var i = 0; i < $scope.monthDaysButtons.length; i++) {
                    if ($scope.monthDaysButtons[i].pushed == true) {
                        var obj = {};
                        obj.value = $scope.monthDaysButtons[i].id;
                        obj.timeunit_id = getTimeUnitIdByCode("D"); //4 = DAY
                        recurrentTimeUnits.push(obj);
                    }
                }
            }
            else {
                var obj = {};
                obj.value = -1;
                obj.timeunit_id = getTimeUnitIdByCode("D"); //4 = DAY
                recurrentTimeUnits.push(obj);
            }

            if ($scope.allWeekDaysButton.pushed == false) {
                /* Adaugare zile saptamana*/
                for (var i = 0; i < $scope.weekDaysButtons.length; i++) {
                    if ($scope.weekDaysButtons[i].pushed == true) {
                        var obj = {};
                        obj.value = $scope.weekDaysButtons[i].id;
                        obj.timeUnit = getTimeUnitIdByCode("W"); //8 = WEEK DAY
                        obj.schedule = $scope.schedule;
                        recurrentTimeUnits.push(obj);
                    }
                }
            }
            else {
                var obj = {};
                obj.value = -1;
                obj.timeUnit =  getTimeUnitIdByCode("W"); //8 = WEEK DAY
//                obj.schedule = $scope.schedule;
                recurrentTimeUnits.push(obj);
            }

            if ($scope.allHoursButton.pushed == false) {
                /* Adaugare zile saptamana*/
                for (var i = 0; i < $scope.hoursButtons.length; i++) {
                    if ($scope.hoursButtons[i].pushed == true) {
                        var obj = {};
                        obj.value = $scope.hoursButtons[i].id;
                        obj.timeunit_id =  getTimeUnitIdByCode("H"); //3 = HOUR
                        recurrentTimeUnits.push(obj);
                    }
                }
            }
            else {
                var obj = {};
                obj.value = -1;
                obj.timeunit_id = getTimeUnitIdByCode("H"); //3 = HOUR
                recurrentTimeUnits.push(obj);
            }

            return recurrentTimeUnits;
        }
        /* -------------------------------------------------------------------*/

        /* -------------------- Add custom interval --------------------------*/
        $scope.newTimeInterval = {name: null, custom: true, intervalMillis: null, interval: null, id: null};
        $scope.addCustomInterval = function () {
        TimeInterval.save($scope.newTimeInterval,function(data){
            $scope.timeIntervals = TimeInterval.query(function(data) {
                for (var i=0; i<$scope.timeIntervals.length; i++) {
                    if ($scope.timeIntervals[i].name == $scope.newTimeInterval.name) {
                        $scope.schedule.timeInterval = $scope.timeIntervals[i];
                        break;
                    }
                }
            });
        });

        };
        /* -------------------------------------------------------------------- */

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
            url:'app/rest/schedule/list',
            id : 'schedule'
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
