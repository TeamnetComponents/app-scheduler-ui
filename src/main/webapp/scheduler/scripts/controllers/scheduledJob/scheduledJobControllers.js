'use strict';
schedulerControllers
    .controller('ScheduledJobController', ['$scope', 'AppGridConstants', 'ScheduledJob', 'Schedule' ,'Task' ,'ScheduledJobExecution', 'AppGridMetadataBuilder' ,
        function ($scope, AppGridConstants, ScheduledJob, Schedule, Task, ScheduledJobExecution, AppGridMetadataBuilder) {

        
        $scope.schedules = Schedule.query();
        $scope.tasks = Task.query();
        $scope.scheduledJobExecutions = ScheduledJobExecution.query();
        
        $scope.showSchedule = false;
        $scope.showTask = false;
        $scope.showScheduledJobExecution = false;
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
                $scope.showScheduledJobExecution = false;
            }
            if(grid == 'task'){
                $scope.showTask = true;
                
                $scope.showSchedule = false;
                $scope.showScheduledJobExecution = false;
            }
            if(grid == 'scheduledJobExecution'){
                $scope.showScheduledJobExecution = true;
                
                $scope.showSchedule = false;
                $scope.showTask = false;
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
            $scope.scheduledJob = {name: null, description: null, type: null, quartzJobClassName: null, version: null, created: null, lastUpdated: null, deleted: null, id: null};
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

            var newGridId = 'scheduledJobGrid';
            var metadataBuilder = new AppGridMetadataBuilder(newGridId);
            metadataBuilder.resetGridMetadata();
            if (!metadataBuilder.gridExists()) {
                metadataBuilder.addColumn('name');
                metadataBuilder.addColumn('scheduledJobExecution.nextFireTime');
                metadataBuilder.addColumn('scheduledJobExecution.lastFireTime');
                metadataBuilder.addColumn('scheduledJobExecution.state');
                metadataBuilder.addColumn('scheduledJobExecution.status');
                metadataBuilder.addColumn('ownerId');
                metadataBuilder.addColumn('roles');
            }

            metadataBuilder.setColumnLabelKey('name', 'Name');
            metadataBuilder.setColumnLabelKey('scheduledJobExecution.nextFireTime', 'Next fire time');
            metadataBuilder.setColumnLabelKey('scheduledJobExecution.lastFireTime', 'Last fire time');
            metadataBuilder.setColumnLabelKey('scheduledJobExecution.state', 'Execution state');
            metadataBuilder.setColumnLabelKey('scheduledJobExecution.status', 'Status');
            metadataBuilder.setColumnLabelKey('ownerId', 'Owner');
            metadataBuilder.setColumnLabelKey('roles', 'Roles');

            $scope.columnMetadata = metadataBuilder.getColumnMetadata();

            $scope.appGrid = {
                id:'scheduledJobGrid',
                url:'app/rest/scheduledJob/list',
                title:'Schedule job',
                columnMetadata: $scope.columnMetadata
            };
    }]);
