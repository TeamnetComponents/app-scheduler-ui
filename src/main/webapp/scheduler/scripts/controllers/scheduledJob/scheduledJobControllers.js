'use strict';
schedulerControllers
    .controller('ScheduledJobController', function ($scope,AppGridConstants, ScheduledJob, Schedule, Task) {

        
        $scope.schedules = Schedule.query();
        $scope.tasks = Task.query();
        
        $scope.showSchedule = false;
        $scope.showTask = false;
        $scope.actionEvent="scheduledJobGrid";
        $scope.showEditBtn = true;
        $scope.showCreateOrEdit = false;
        $scope.showBtns = false;
        $scope.showDetails = false;
        $scope.showGrid = true;

        $scope.selected = function(){};

        $scope.$root.$on('scheduledJobGridSelection',function(data){
            $scope.showBtns = true;
        });

        $scope.redrawGrid = function(grid) {
         
            $scope.searchTerms=[];
            $scope.searchTerms.push(
                {
                    property: 'scheduledJob.id',
                    value: parseInt($scope.selected()[0].id),
                    type: AppGridConstants.searchFilterTypes.EQUAL,
                    negation: false
                }
            );
            
            if(grid == 'schedule'){
                $scope.showSchedule = true;
                
                $scope.showTask = false;
            }
            if(grid == 'task'){
                $scope.showTask = true;
                
                $scope.showSchedule = false;
            }
        };


        $scope.createOrUpdate = function () {
            $scope.showGrid = true;
            ScheduledJob.save($scope.scheduledJob,
                function () {
                     $scope.showCreateOrEdit = false;
                     $scope.refresh();
                });
        };

        $scope.clear = function () {
            $scope.scheduledJob = {name: null, description: null, type: null, quartzJobClassName: null, nextScheduledExecution: null, lastExecutionTime: null, lastExecutionState: null, id: null};
            $scope.searchTerms = [];
            $scope.showDetails=false;
        };

        $scope.showDelete = function (id) {
            if(!_.isEmpty($scope.selected())){
                $('#deleteScheduledJobConfirmation').modal('show');
            }
        };

        $scope.confirmDelete = function (id) {
            ScheduledJob.delete({id: $scope.selected()[0].id},
                function () {
                   $scope.refresh();
                   $('#deleteScheduledJobConfirmation').modal('hide');
                });
        };

        $scope.refreshEvent = "refreshEvent";
        $scope.selected;
        $scope.refreshFunction;

        $scope.appGrid = {
            url:'app/rest/scheduledJob/list',
            id : 'scheduledJob'
        };

        $scope.functionality='ScheduledJob';

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
                ScheduledJob.get({id: id}, function(data){
                    $scope.scheduledJob = data;
                });
                $scope.showCreateOrEdit = true;
                $scope.showDetails = true;
                $scope.showGrid = false;
            }
        };


    });
