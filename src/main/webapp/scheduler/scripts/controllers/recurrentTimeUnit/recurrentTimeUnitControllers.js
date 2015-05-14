'use strict';
schedulerControllers
    .controller('RecurrentTimeUnitController', function ($scope,AppGridConstants, RecurrentTimeUnit, TimeUnit, Schedule) {

        
        $scope.timeUnits = TimeUnit.query();
        $scope.schedules = Schedule.query();
        
        $scope.showTimeUnit = false;
        $scope.showSchedule = false;
        $scope.actionEvent="recurrentTimeUnitGrid";
        $scope.showEditBtn = true;
        $scope.showCreateOrEdit = false;
        $scope.showBtns = false;
        $scope.showDetails = false;
        $scope.showGrid = true;

        $scope.selected = function(){};

        $scope.$root.$on('recurrentTimeUnitGridSelection',function(data){
            $scope.showBtns = true;
        });

        $scope.redrawGrid = function(grid) {
         
        };


        $scope.createOrUpdate = function () {
            $scope.showGrid = true;
            RecurrentTimeUnit.save($scope.recurrentTimeUnit,
                function () {
                     $scope.showCreateOrEdit = false;
                     $scope.refresh();
                });
        };

        $scope.clear = function () {
            $scope.recurrentTimeUnit = {value: null, id: null};
        };

        $scope.showDelete = function (id) {
            if(!_.isEmpty($scope.selected())){
                $('#deleteRecurrentTimeUnitConfirmation').modal('show');
            }
        };

        $scope.confirmDelete = function (id) {
            RecurrentTimeUnit.delete({id: $scope.selected()[0].id},
                function () {
                   $scope.refresh();
                   $('#deleteRecurrentTimeUnitConfirmation').modal('hide');
                });
        };

        $scope.refreshEvent = "refreshEvent";
        $scope.selected;
        $scope.refreshFunction;

        $scope.appGrid = {
            url:'app/rest/recurrentTimeUnit/list',
            id : 'recurrentTimeUnit',
            title :  'Lista recurrentTimeUnit'
            };

        $scope.functionality='RecurrentTimeUnit';

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
                RecurrentTimeUnit.get({id: id}, function(data){
                    $scope.recurrentTimeUnit = data;
                });
                $scope.showCreateOrEdit = true;
                $scope.showDetails = true;
                $scope.showGrid = false;
            }
        };


    });
