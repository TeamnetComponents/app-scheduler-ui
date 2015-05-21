'use strict';
schedulerControllers
    .controller('MonthController', function ($scope,AppGridConstants, Month, Schedule) {

        
        $scope.schedules = Schedule.query();
        
        $scope.showSchedule = false;
        $scope.actionEvent="monthGrid";
        $scope.showEditBtn = true;
        $scope.showCreateOrEdit = false;
        $scope.showBtns = false;
        $scope.showDetails = false;
        $scope.showGrid = true;

        $scope.selected = function(){};

        $scope.$root.$on('monthGridSelection',function(data){
            $scope.showBtns = true;
        });

        $scope.redrawGrid = function(grid) {
         
        };


        $scope.createOrUpdate = function () {
            $scope.showGrid = true;
            Month.save($scope.month,
                function () {
                     $scope.showCreateOrEdit = false;
                     $scope.refresh();
                });
        };

        $scope.clear = function () {
            $scope.month = {code: null, name: null, value: null, id: null};
            $scope.searchTerms = [];
            $scope.showDetails=false;
        };

        $scope.showDelete = function (id) {
            if(!_.isEmpty($scope.selected())){
                $('#deleteMonthConfirmation').modal('show');
            }
        };

        $scope.confirmDelete = function (id) {
            Month.delete({id: $scope.selected()[0].id},
                function () {
                   $scope.refresh();
                   $('#deleteMonthConfirmation').modal('hide');
                });
        };

        $scope.refreshEvent = "refreshEvent";
        $scope.selected;
        $scope.refreshFunction;

        $scope.appGrid = {
            url:'app/rest/month/list',
            id : 'month'
        };

        $scope.functionality='Month';

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
                Month.get({id: id}, function(data){
                    $scope.month = data;
                });
                $scope.showCreateOrEdit = true;
                $scope.showDetails = true;
                $scope.showGrid = false;
            }
        };


    });
