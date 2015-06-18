'use strict';

schedulerControllers
    .filter('booleanCellFormatter', function(){
        var boolValues = {
            true: "Da",
            false: "Nu"
        };
        return function(boolCell) {
            return boolValues[boolCell];
        };
    })
    .controller('ScheduleController', function ($scope, AppGridConstants, Schedule, TimeInterval, RecurrentTimeUnit, ScheduledJob, CustomFireTimes, TimeUnit, AppGridMetadataBuilder, MisfirePolicy) {

        $scope.timeUnits = TimeUnit.query();
        $scope.timeIntervals = TimeInterval.query();
        //$scope.recurrentTimeUnits = RecurrentTimeUnit.query();
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
            {id: "0", name: "Intervale regulate"},
            {id: "1", name: "Intervale neregulate"}
        ];
        $scope.selectedRepetitionType = $scope.repetitionTypes[0];

        $scope.misfirePolicies = MisfirePolicy.misfirePolicies;


        $scope.toggleRecurrent = function() {
            resetRegularIntervals();
        };

        $scope.changeRepetitionType = function () {
            if ($scope.schedule != undefined) {
                //Toggle Regular intervals
                if ($scope.selectedRepetitionType.id == "0") {
                    /* Setez prima valoare ca cea activa in selectorul de regular times */
                    if ($scope.timeIntervals !=null && $scope.timeIntervals != undefined) {
                        $scope.schedule.timeInterval = $scope.timeIntervals[0];
                    }
                    $scope.regularIntervals = true;
                }
                //Toggle Custom fire times
                else if ($scope.selectedRepetitionType.id == "1") {
                    $scope.regularIntervals = false;
                    $scope.schedule.timeInterval = null;
                    setCustomFiresFromCTU();
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
            /* ------------------------------------------------- */
            $scope.nrSelectedMonths = 0;
            $scope.nrSelectedMonthsDays = 0;
            $scope.nrSelectedWeekDays = 0;
            $scope.nrSelectedHours = 0;
            /* ------------------------------------------------- */
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
            /* ------------------------------------------------- */
            /* ------------------------------------------------- */
            $scope.nrSelectedMonths = 0;
            $scope.nrSelectedMonthsDays = 0;
            $scope.nrSelectedWeekDays = 0;
            $scope.nrSelectedHours = 0;
            /* ------------------------------------------------- */
            /* ------------------------------------------------- */
        }

        function setCustomFiresFromCTU() {
            resetCustomFiresIntervals();
            if ($scope.schedule != null && $scope.schedule.recurrentTimeUnits != null) {
                for (var i = 0; i < $scope.schedule.recurrentTimeUnits.length; i++) {
                    var recurrentTimeUnit = $scope.schedule.recurrentTimeUnits[i];
                    console.log(recurrentTimeUnit.timeUnit.code + '=' + recurrentTimeUnit.value);
                    if (recurrentTimeUnit.timeUnit.code == "MON") {
                        if (recurrentTimeUnit.value == -1) {
                            $scope.allMonthsButton.pushed = true;
                            $scope.nrSelectedMonths = 12;
                            $scope.nrSelectedCustom += 12;
                            for (var j = 0; j < $scope.monthsButtons.length; j++) {
                                $scope.monthsButtons[j].pushed = true;
                            }
                        } else {
                            $scope.monthsButtons[recurrentTimeUnit.value - 1].pushed = true;
                            $scope.nrSelectedCustom++;
                            $scope.nrSelectedMonths++;
                        }
                    }
                    else if (recurrentTimeUnit.timeUnit.code == "D") {
                        if (recurrentTimeUnit.value == -1) {
                            $scope.allMonthDaysButton.pushed = true;
                            $scope.nrSelectedMonthsDays = 31;
                            $scope.nrSelectedCustom += 31;
                            for (var j = 0; j < $scope.monthDaysButtons.length; j++) {
                                $scope.monthDaysButtons[j].pushed = true;
                            }
                        } else {
                            $scope.monthDaysButtons[recurrentTimeUnit.value - 1].pushed = true;
                            $scope.nrSelectedCustom++;
                            $scope.nrSelectedMonthsDays++;
                        }
                    }
                    else if (recurrentTimeUnit.timeUnit.code == "W") {
                        if (recurrentTimeUnit.value == -1) {
                            $scope.allWeekDaysButton.pushed = true;
                            $scope.nrSelectedWeekDays = 7;
                            $scope.nrSelectedCustom += 7;
                            for (var j = 0; j < $scope.weekDaysButtons.length; j++) {
                                $scope.weekDaysButtons[j].pushed = true;
                            }
                        } else {
                            $scope.weekDaysButtons[recurrentTimeUnit.value - 1].pushed = true;
                            $scope.nrSelectedCustom++;
                            $scope.nrSelectedWeekDays++;
                        }
                    }
                    else if (recurrentTimeUnit.timeUnit.code == "H") {
                        if (recurrentTimeUnit.value == -1) {
                            $scope.allHoursButton.pushed = true;
                            $scope.nrSelectedHours = 24;
                            $scope.nrSelectedCustom += 24;
                            for (var j = 0; j < $scope.hoursButtons.length; j++) {
                                $scope.hoursButtons[j].pushed = true;
                            }
                        } else {
                            $scope.hoursButtons[recurrentTimeUnit.value].pushed = true;
                            $scope.nrSelectedCustom++;
                            $scope.nrSelectedHours++;
                        }
                    }
                }
            }
        }

        createCustomFiresIntervals();

        //setCustomFiresFromCTU();

        /* Numar cate butoane au fost apasate */
        function countSelected(pushed) {
            if (pushed == true) {
                $scope.nrSelectedCustom++;
            }
            else {
                $scope.nrSelectedCustom--;
            }
        }
        function countSelectedMonths(pushed) {
            if (pushed == true) {
                $scope.nrSelectedMonths++;
            }
            else {
                $scope.nrSelectedMonths--;
            }
        }
        function countSelectedMonthsDays(pushed) {
            if (pushed == true) {
                $scope.nrSelectedMonthsDays++;
            }
            else {
                $scope.nrSelectedMonthsDays--;
            }
        }
        function countSelectedWeekDays(pushed) {
            if (pushed == true) {
                $scope.nrSelectedWeekDays++;
            }
            else {
                $scope.nrSelectedWeekDays--;
            }
        }
        function countSelectedHours(pushed) {
            if (pushed == true) {
                $scope.nrSelectedHours++;
            }
            else {
                $scope.nrSelectedHours--;
            }
        }

        $scope.checkInputsByGroup = function() {

            return $scope.nrSelectedWeekDays <= 0    ||
                   $scope.nrSelectedMonths <= 0      ||
                   $scope.nrSelectedMonthsDays <= 0  ||
                   $scope.nrSelectedHours <= 0 ;
        };

        $scope.selectWeekDay = function (id) {
            $scope.weekDaysButtons[id].pushed = !$scope.weekDaysButtons[id].pushed;
            $scope.allWeekDaysButton.pushed = false;
            countSelected($scope.weekDaysButtons[id].pushed);
            countSelectedWeekDays($scope.weekDaysButtons[id].pushed);
            var checkWeekDay = 0;
            for (var i = 0; i < $scope.weekDaysButtons.length; i++) {
                if ($scope.weekDaysButtons[i].pushed == true) {
                    checkWeekDay++;
                }
            }
            if(checkWeekDay == 7) {
                $scope.allWeekDaysButton.pushed = true;
            }
        };

        $scope.selectMonth = function (id) {
            $scope.monthsButtons[id].pushed = !$scope.monthsButtons[id].pushed;
            $scope.allMonthsButton.pushed = false;
            countSelected($scope.monthsButtons[id].pushed);
            countSelectedMonths($scope.monthsButtons[id].pushed);
            var checkMonths = 0;
            for (var i = 0; i < $scope.monthsButtons.length; i++) {
                if ($scope.monthsButtons[i].pushed == true) {
                    checkMonths++;
                }
            }
            if(checkMonths == 12) {
                $scope.allMonthsButton.pushed = true;
            }
        };

        $scope.selectMonthDay = function (id) {
            $scope.monthDaysButtons[id].pushed = !$scope.monthDaysButtons[id].pushed;
            $scope.allMonthDaysButton.pushed = false;
            countSelected($scope.monthDaysButtons[id].pushed);
            countSelectedMonthsDays($scope.monthDaysButtons[id].pushed);
            var checkMonthDays = 0;
            for (var i = 0; i < $scope.monthDaysButtons.length; i++) {
                if ($scope.monthDaysButtons[i].pushed == true) {
                    checkMonthDays++;
                }
            }
            if(checkMonthDays == 31) {
                $scope.allMonthDaysButton.pushed = true;
            }
        };

        $scope.selectHour = function (id) {
            $scope.hoursButtons[id].pushed = !$scope.hoursButtons[id].pushed;
            $scope.allHoursButton.pushed = false;
            countSelected($scope.hoursButtons[id].pushed);
            countSelectedHours($scope.hoursButtons[id].pushed);
            var checkHours = 0;
            for (var i = 0; i < $scope.hoursButtons.length; i++) {
                if ($scope.hoursButtons[i].pushed == true) {
                    checkHours++;
                }
            }
            if(checkHours == 24) {
                $scope.allHoursButton.pushed = true;
            }
        };

        $scope.selectAllMonths = function() {
            if ($scope.allMonthsButton.pushed == false) {
                for (var i = 0; i < $scope.monthsButtons.length; i++) {
                    if ($scope.monthsButtons[i].pushed == false) {
                        $scope.monthsButtons[i].pushed = true;
                        countSelected($scope.monthsButtons[i].pushed);
                        countSelectedMonths($scope.monthsButtons[i].pushed);
                    }
                }
                $scope.allMonthsButton.pushed = true;
            }

            else if ($scope.allMonthsButton.pushed == true) {
                for (var i = 0; i < $scope.monthsButtons.length; i++) {
                    if ($scope.monthsButtons[i].pushed == true) {
                        $scope.monthsButtons[i].pushed = false;
                        countSelected($scope.monthsButtons[i].pushed);
                        countSelectedMonths($scope.monthsButtons[i].pushed);
                    }
                }
                $scope.allMonthsButton.pushed = false;
            }
        };

        $scope.selectAllMonthDays = function () {
            if ($scope.allMonthDaysButton.pushed == false) {
                for (var i = 0; i < $scope.monthDaysButtons.length; i++) {
                    if ($scope.monthDaysButtons[i].pushed == false) {
                        $scope.monthDaysButtons[i].pushed = true;
                        countSelected($scope.monthDaysButtons[i].pushed);
                        countSelectedMonthsDays($scope.monthDaysButtons[i].pushed);
                    }
                }
                $scope.allMonthDaysButton.pushed = true;
            }

            else if ($scope.allMonthDaysButton.pushed == true) {
                for (var i = 0; i < $scope.monthDaysButtons.length; i++) {
                    if ($scope.monthDaysButtons[i].pushed == true) {
                        $scope.monthDaysButtons[i].pushed = false;
                        countSelected($scope.monthDaysButtons[i].pushed);
                        countSelectedMonthsDays($scope.monthDaysButtons[i].pushed);
                    }
                }
                $scope.allMonthDaysButton.pushed = false;
            }
        };


        $scope.selectAllWeekDays = function () {
            if ($scope.allWeekDaysButton.pushed == false) {
                for (var i = 0; i < $scope.weekDaysButtons.length; i++) {
                    if ($scope.weekDaysButtons[i].pushed == false) {
                        $scope.weekDaysButtons[i].pushed = true;
                        countSelected($scope.weekDaysButtons[i].pushed);
                        countSelectedWeekDays($scope.weekDaysButtons[i].pushed);
                    }
                }
                $scope.allWeekDaysButton.pushed = true;
            }

            else if ($scope.allWeekDaysButton.pushed == true) {
                for (var i = 0; i < $scope.weekDaysButtons.length; i++) {
                    if ($scope.weekDaysButtons[i].pushed == true) {
                        $scope.weekDaysButtons[i].pushed = false;
                        countSelected($scope.weekDaysButtons[i].pushed);
                        countSelectedWeekDays($scope.weekDaysButtons[i].pushed);
                    }
                }
                $scope.allWeekDaysButton.pushed = false;
            }
        };


        $scope.selectAllHours = function () {
            if ($scope.allHoursButton.pushed == false) {
                for (var i = 0; i < $scope.hoursButtons.length; i++) {
                    if ($scope.hoursButtons[i].pushed == false) {
                        $scope.hoursButtons[i].pushed = true;
                        countSelected($scope.hoursButtons[i].pushed);
                        countSelectedHours($scope.hoursButtons[i].pushed);
                    }
                }
                $scope.allHoursButton.pushed = true;
            }

            else if ($scope.allHoursButton.pushed == true) {
                for (var i = 0; i < $scope.hoursButtons.length; i++) {
                    if ($scope.hoursButtons[i].pushed == true) {
                        $scope.hoursButtons[i].pushed = false;
                        countSelected($scope.hoursButtons[i].pushed);
                        countSelectedHours($scope.hoursButtons[i].pushed);
                    }
                }
                $scope.allHoursButton.pushed = false;
            }
        };

        /* --------------------------------------------------- */

        $scope.selected = function () {
        };

        $scope.$root.$on('scheduleGridSelection', function (data) {
            $scope.showBtns = true;
        });

        $scope.getCurrentDate = function () {
            //return new Date();
            return moment().toDate();
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

        function saveInRecTimeUnitsObj(obj) {

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
                        recurrentTimeUnits.push(obj);
                    }
                }
            }
            else {
                var obj = {};
                obj.value = -1;
                obj.timeUnit = getTimeUnitIdByCode("MON"); //7 = MONTH
                recurrentTimeUnits.push(obj);
            }


            if ($scope.allMonthDaysButton.pushed == false) {
                /* Adaugare zile luna */
                for (var i = 0; i < $scope.monthDaysButtons.length; i++) {
                    if ($scope.monthDaysButtons[i].pushed == true) {
                        var obj = {};
                        obj.value = $scope.monthDaysButtons[i].id;
                        obj.timeUnit = getTimeUnitIdByCode("D"); //4 = DAY
                        recurrentTimeUnits.push(obj);
                    }
                }
            }
            else {
                var obj = {};
                obj.value = -1;
                obj.timeUnit = getTimeUnitIdByCode("D"); //4 = DAY
                recurrentTimeUnits.push(obj);
            }

            if ($scope.allWeekDaysButton.pushed == false) {
                /* Adaugare zile saptamana*/
                for (var i = 0; i < $scope.weekDaysButtons.length; i++) {
                    if ($scope.weekDaysButtons[i].pushed == true) {
                        var obj = {};
                        obj.value = $scope.weekDaysButtons[i].id;
                        obj.timeUnit = getTimeUnitIdByCode("W"); //8 = WEEK DAY
                        recurrentTimeUnits.push(obj);
                    }
                }
            }
            else {
                var obj = {};
                obj.value = -1;
                obj.timeUnit =  getTimeUnitIdByCode("W"); //8 = WEEK DAY
                recurrentTimeUnits.push(obj);
            }

            if ($scope.allHoursButton.pushed == false) {
                /* Adaugare zile saptamana*/
                for (var i = 0; i < $scope.hoursButtons.length; i++) {
                    if ($scope.hoursButtons[i].pushed == true) {
                        var obj = {};
                        obj.value = $scope.hoursButtons[i].id;
                        obj.timeUnit =  getTimeUnitIdByCode("H"); //3 = HOUR
                        recurrentTimeUnits.push(obj);
                    }
                }
            }
            else {
                var obj = {};
                obj.value = -1;
                obj.timeUnit = getTimeUnitIdByCode("H"); //3 = HOUR
                recurrentTimeUnits.push(obj);
            }

            return recurrentTimeUnits;
        }
        /* -------------------------------------------------------------------*/

        /* -------------------- Add custom interval --------------------------*/
        $scope.newTimeInterval = {name: null, custom: true, intervalMillis: null, interval: null, id: null};
        $scope.addCustomInterval = function () {
        TimeInterval.save($scope.newTimeInterval,function(data){
            //$scope.timeIntervals = [];
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
            console.log($scope.schedule.startTime);
            $scope.showGrid = true;

            console.log("before: " + $scope.schedule.recurrentTimeUnits);
            /* Daca este pe custom fire intervals, contruiesc arrayul */
            if ($scope.schedule.recurrent && !$scope.regularIntervals) {
                $scope.schedule.recurrentTimeUnits = buildRecurrentTimeUnits();
                console.log("after: " + $scope.schedule.recurrentTimeUnits);
            }
            Schedule.save($scope.schedule,
                function () {
                    $scope.showCreateOrEdit = false;
                    $scope.refresh();
                });
        };

        $scope.clear = function () {
            $scope.schedule = {active: true, recurrent: false, cron: null, startTime: null, endTime: null, repetitions: null, misfire: null, recurrentTimeUnits: [], id: null};
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

                    //Daca este CUSTOM FIRED (adica time_interval == null, dar recurrent)
                    if ($scope.schedule.recurrent == true && $scope.schedule.timeInterval == null) {
                        $scope.selectedRepetitionType = $scope.repetitionTypes[1];
                        $scope.regularIntervals = false;
                        setCustomFiresFromCTU();
                    }
                    //Daca este REGULAR INTERVAL (adica recurrent == true, dar time_interval != null)
                    else if ($scope.schedule.recurrent == true) {
                        $scope.selectedRepetitionType = $scope.repetitionTypes[0];
                    }
                });
                $scope.showCreateOrEdit = true;
                $scope.showDetails = true;
                $scope.showGrid = false;


            }
        };

        var newGridId = 'schedule';
        var metadataBuilder = new AppGridMetadataBuilder(newGridId);
        metadataBuilder.resetGridMetadata();
        if (!metadataBuilder.gridExists()) {
            //metadataBuilder.addColumn('active');
            metadataBuilder.formatCells('active', 'booleanCellFormatter');
            metadataBuilder.formatCells('recurrent', 'booleanCellFormatter');
            metadataBuilder.addColumn('startTime');
            metadataBuilder.addColumn('endTime');
            metadataBuilder.addColumn('repetitions');
        }

        metadataBuilder.setColumnLabelKey('active', 'Activ');
        metadataBuilder.setColumnLabelKey('recurrent', 'Recurent');
        metadataBuilder.setColumnLabelKey('startTime', 'Timpul de inceput');
        metadataBuilder.setColumnLabelKey('endTime', 'Timpul de incheiere');
        metadataBuilder.setColumnLabelKey('repetitions', 'Repetitii');

        $scope.appGrid = {
            id: 'schedule',
            url:'app/rest/schedule/list',
            title:'Schedule',
            columnMetadata:metadataBuilder.getColumnMetadata()
        };
    });