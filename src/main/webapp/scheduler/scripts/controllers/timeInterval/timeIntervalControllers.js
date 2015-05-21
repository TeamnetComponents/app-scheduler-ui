'use strict';
schedulerControllers
    .controller('TimeIntervalController', function ($scope,AppGridConstants, TimeInterval, TimeUnit, Schedule) {

        
        $scope.timeUnits = TimeUnit.query();
        $scope.schedules = Schedule.query();
        
        $scope.showTimeUnit = false;
        $scope.showSchedule = false;
        $scope.actionEvent="timeIntervalGrid";
        $scope.showEditBtn = true;
        $scope.showCreateOrEdit = false;
        $scope.showBtns = false;
        $scope.showDetails = false;
        $scope.showGrid = true;

        $scope.selected = function(){};

        $scope.$root.$on('timeIntervalGridSelection',function(data){
            $scope.showBtns = true;
        });

        $scope.redrawGrid = function(grid) {
         
            $scope.searchTerms=[];
            $scope.searchTerms.push(
                {
                    property: 'timeInterval.id',
                    value: parseInt($scope.selected()[0].id),
                    type: AppGridConstants.searchFilterTypes.EQUAL,
                    negation: false
                }
            );
            
            if(grid == 'timeUnit'){
                $scope.showTimeUnit = true;
                
                $scope.showSchedule = false;
            }
            if(grid == 'schedule'){
                $scope.showSchedule = true;
                
                $scope.showTimeUnit = false;
            }
        };


        $scope.createOrUpdate = function () {
            $scope.showGrid = true;
            TimeInterval.save($scope.timeInterval,
                function () {
                     $scope.showCreateOrEdit = false;
                     $scope.refresh();
                });
        };

        $scope.clear = function () {
            $scope.timeInterval = {name: null, custom: null, intervalMillis: null, interval: null, id: null};
            $scope.searchTerms = [];
            $scope.showDetails=false;
        };

        $scope.showDelete = function (id) {
            if(!_.isEmpty($scope.selected())){
                $('#deleteTimeIntervalConfirmation').modal('show');
            }
        };

        $scope.confirmDelete = function (id) {
            TimeInterval.delete({id: $scope.selected()[0].id},
                function () {
                   $scope.refresh();
                   $('#deleteTimeIntervalConfirmation').modal('hide');
                });
        };

        $scope.refreshEvent = "refreshEvent";
        $scope.selected;
        $scope.refreshFunction;

        $scope.appGrid = {
            url:'app/rest/timeInterval/list',
            id : 'timeInterval',
        };

        $scope.functionality='TimeInterval';

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
            if ($scope.timeUnit != null) {
                $scope.timeInterval.timeUnit = $scope.timeUnit;
            }
        };

        $scope.showEdit = function(){
            if((!_.isEmpty($scope.selected())) ){
            var id = parseInt($scope.selected()[0].id);
                TimeInterval.get({id: id}, function(data){
                    $scope.timeInterval = data;
                });
                $scope.showCreateOrEdit = true;
                $scope.showDetails = true;
                $scope.showGrid = false;
            }
        };


    });
