'use strict';
schedulerControllers
    .controller('ScheduledJobExecutionController', ['$scope','AppGridConstants', 'ScheduledJobExecution', 'ScheduledJob' ,function ($scope,AppGridConstants, ScheduledJobExecution, ScheduledJob) {

        
        $scope.scheduledJobs = ScheduledJob.query();
        
        $scope.showScheduledJob = false;
        $scope.actionEvent="scheduledJobExecutionGrid";
        $scope.showEditBtn = true;
        $scope.showCreateOrEdit = false;
        $scope.showBtns = false;
        $scope.showDetails = false;
        $scope.showGrid = true;

        $scope.selected = function(){};

        $scope.$root.$on('scheduledJobExecutionGridSelection',function(data){
            $scope.showBtns = true;
        });

        $scope.redrawGrid = function(grid) {
         
        };


        $scope.createOrUpdate = function () {
            $scope.showGrid = true;
            ScheduledJobExecution.save($scope.scheduledJobExecution,
                function () {
                     $scope.showCreateOrEdit = false;
                     $scope.refresh();
                });
        };

        $scope.clear = function () {
            $scope.scheduledJobExecution = {scheduledFireTime: null, actualFireTime: null, lastFireTime: null, nextFireTime: null, state: null, status: null, id: null};
            $scope.searchTerms = [];
            $scope.showDetails=false;
        };

        $scope.showDelete = function (id) {
            if(!_.isEmpty($scope.selected())){
                $('#deleteScheduledJobExecutionConfirmation').modal('show');
            }
        };

        $scope.confirmDelete = function (id) {
            ScheduledJobExecution.delete({id: $scope.selected()[0].id},
                function () {
                   $scope.refresh();
                   $('#deleteScheduledJobExecutionConfirmation').modal('hide');
                });
        };

        $scope.refreshEvent = "refreshEvent";
        $scope.selected;
        $scope.refreshFunction;

        $scope.appGrid = {
            url:'app/rest/scheduledJobExecution/list',
            id : 'scheduledJobExecution'
        };

        $scope.functionality='ScheduledJobExecution';

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
            if ($scope.scheduledJob != null) {
                $scope.scheduledJobExecution.scheduledJob = $scope.scheduledJob;
            }
        };

        $scope.showEdit = function(){
            if((!_.isEmpty($scope.selected())) ){
            var id = parseInt($scope.selected()[0].id);
                ScheduledJobExecution.get({id: id}, function(data){
                    $scope.scheduledJobExecution = data;
                });
                $scope.showCreateOrEdit = true;
                $scope.showDetails = true;
                $scope.showGrid = false;
            }
        };


    }]);
