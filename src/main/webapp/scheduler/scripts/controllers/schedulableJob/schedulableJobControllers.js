'use strict';
schedulerControllers
    .controller('SchedulableJobController', function ($scope,AppGridConstants, SchedulableJob, Task, Schedule) {

        
        $scope.tasks = Task.query();
        $scope.schedules = Schedule.query();
        
        $scope.showTask = false;
        $scope.showSchedule = false;
        $scope.actionEvent="schedulableJobGrid";
        $scope.showEditBtn = true;
        $scope.showCreateOrEdit = false;
        $scope.showBtns = false;
        $scope.showDetails = false;
        $scope.showGrid = true;

        $scope.selected = function(){};

        $scope.$root.$on('schedulableJobGridSelection',function(data){
            $scope.showBtns = true;
        });

        $scope.redrawGrid = function(grid) {
         
            $scope.searchTerms=[];
            $scope.searchTerms.push(
                {
                    property: 'schedulableJob.id',
                    value: parseInt($scope.selected()[0].id),
                    type: AppGridConstants.searchFilterTypes.EQUAL,
                    negation: false
                }
            );
            
            if(grid == 'task'){
                $scope.showTask = true;
                
                $scope.showSchedule = false;
            }
            if(grid == 'schedule'){
                $scope.showSchedule = true;
                
                $scope.showTask = false;
            }
        };


        $scope.createOrUpdate = function () {
            $scope.showGrid = true;
            SchedulableJob.save($scope.schedulableJob,
                function () {
                     $scope.showCreateOrEdit = false;
                     $scope.refresh();
                });
        };

        $scope.clear = function () {
            $scope.schedulableJob = {name: null, options: null, nextScheduledExecution: null, lastExecutionTime: null, lastExecutionState: null, id: null};
            $scope.searchTerms = [];
            $scope.showDetails=false;
        };

        $scope.showDelete = function (id) {
            if(!_.isEmpty($scope.selected())){
                $('#deleteSchedulableJobConfirmation').modal('show');
            }
        };

        $scope.confirmDelete = function (id) {
            SchedulableJob.delete({id: $scope.selected()[0].id},
                function () {
                   $scope.refresh();
                   $('#deleteSchedulableJobConfirmation').modal('hide');
                });
        };

        $scope.refreshEvent = "refreshEvent";
        $scope.selected;
        $scope.refreshFunction;

        $scope.appGrid = {
            url:'app/rest/schedulableJob/list',
            id : 'schedulableJob',
            title :  'Lista schedulableJob'
            };

        $scope.functionality='SchedulableJob';

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
            if ($scope.task != null) {
                $scope.schedulableJob.task = $scope.task;
            }
        };

        $scope.showEdit = function(){
            if((!_.isEmpty($scope.selected())) ){
            var id = parseInt($scope.selected()[0].id);
                SchedulableJob.get({id: id}, function(data){
                    $scope.schedulableJob = data;
                });
                $scope.showCreateOrEdit = true;
                $scope.showDetails = true;
                $scope.showGrid = false;
            }
        };


    });
