'use strict';
schedulerControllers
    .controller('RecurrentDayController', function ($scope,AppGridConstants, RecurrentDay, Schedule) {

        
        $scope.schedules = Schedule.query();
        
        $scope.showSchedule = false;
        $scope.actionEvent="recurrentDayGrid";
        $scope.showEditBtn = true;
        $scope.showCreateOrEdit = false;
        $scope.showBtns = false;
        $scope.showDetails = false;
        $scope.showGrid = true;

        $scope.selected = function(){};

        $scope.$root.$on('recurrentDayGridSelection',function(data){
            $scope.showBtns = true;
        });

        $scope.redrawGrid = function(grid) {
         
        };


        $scope.createOrUpdate = function () {
            $scope.showGrid = true;
            RecurrentDay.save($scope.recurrentDay,
                function () {
                     $scope.showCreateOrEdit = false;
                     $scope.refresh();
                });
        };

        $scope.clear = function () {
            $scope.recurrentDay = {day: null, id: null};
        };

        $scope.showDelete = function (id) {
            if(!_.isEmpty($scope.selected())){
                $('#deleteRecurrentDayConfirmation').modal('show');
            }
        };

        $scope.confirmDelete = function (id) {
            RecurrentDay.delete({id: $scope.selected()[0].id},
                function () {
                   $scope.refresh();
                   $('#deleteRecurrentDayConfirmation').modal('hide');
                });
        };

        $scope.refreshEvent = "refreshEvent";
        $scope.selected;
        $scope.refreshFunction;

        $scope.appGrid = {
            url:'app/rest/recurrentDay/list',
            id : 'recurrentDay',
            title :  'Lista recurrentDay'
            };

        $scope.functionality='RecurrentDay';

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
                RecurrentDay.get({id: id}, function(data){
                    $scope.recurrentDay = data;
                });
                $scope.showCreateOrEdit = true;
                $scope.showDetails = true;
                $scope.showGrid = false;
            }
        };


    });
