'use strict';
schedulerControllers
    .controller('TimeUnitController', function ($scope,AppGridConstants, TimeUnit, TimeInterval, RecurrentTimeUnit) {

        
        $scope.timeIntervals = TimeInterval.query();
        $scope.recurrentTimeUnits = RecurrentTimeUnit.query();
        
        $scope.showTimeInterval = false;
        $scope.showRecurrentTimeUnit = false;
        $scope.actionEvent="timeUnitGrid";
        $scope.showEditBtn = true;
        $scope.showCreateOrEdit = false;
        $scope.showBtns = false;
        $scope.showDetails = false;
        $scope.showGrid = true;

        $scope.selected = function(){};

        $scope.$root.$on('timeUnitGridSelection',function(data){
            $scope.showBtns = true;
        });

        $scope.redrawGrid = function(grid) {
         
            $scope.searchTerms=[];
            $scope.searchTerms.push(
                {
                    property: 'timeUnit.id',
                    value: parseInt($scope.selected()[0].id),
                    type: AppGridConstants.searchFilterTypes.EQUAL,
                    negation: false
                }
            );
            
            if(grid == 'timeInterval'){
                $scope.showTimeInterval = true;
                
                $scope.showRecurrentTimeUnit = false;
            }
            if(grid == 'recurrentTimeUnit'){
                $scope.showRecurrentTimeUnit = true;
                
                $scope.showTimeInterval = false;
            }
        };


        $scope.createOrUpdate = function () {
            $scope.showGrid = true;
            TimeUnit.save($scope.timeUnit,
                function () {
                     $scope.showCreateOrEdit = false;
                     $scope.refresh();
                });
        };

        $scope.clear = function () {
            $scope.timeUnit = {code: null, name: null, description: null, millis: null, id: null};
            $scope.searchTerms = [];
            $scope.showDetails=false;
        };

        $scope.showDelete = function (id) {
            if(!_.isEmpty($scope.selected())){
                $('#deleteTimeUnitConfirmation').modal('show');
            }
        };

        $scope.confirmDelete = function (id) {
            TimeUnit.delete({id: $scope.selected()[0].id},
                function () {
                   $scope.refresh();
                   $('#deleteTimeUnitConfirmation').modal('hide');
                });
        };

        $scope.refreshEvent = "refreshEvent";
        $scope.selected;
        $scope.refreshFunction;

        $scope.appGrid = {
            url:'app/rest/timeUnit/list',
            id : 'timeUnit',
            title :  'Lista timeUnit'
            };

        $scope.functionality='TimeUnit';

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
                TimeUnit.get({id: id}, function(data){
                    $scope.timeUnit = data;
                });
                $scope.showCreateOrEdit = true;
                $scope.showDetails = true;
                $scope.showGrid = false;
            }
        };


    });
