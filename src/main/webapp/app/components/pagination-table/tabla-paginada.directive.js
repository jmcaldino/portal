(function() {
    'use strict';

    angular
        .module('gestionFlia')

        // {
        //     stateParams : {},
        //     resourceMethod : PreavisoService.queryByEstado,
        //     config: {
        //         defaultSort : 'id,desc',
        //         notFound: string
        //     },
        //     cols: [
                    //si es campo
        //         {title[string], field[string], filter[object], show[boolean], sortable[string]}
                    //si es boton
        //         {class[string],icon[string],uisref[string]}
        //     ]
        // }

    .directive('tablaPaginada', function(){
        return {
            restrict: 'E',
            templateUrl : 'app/components/pagination-table/tabla-paginada.html',
            scope: {
                tableData: '='
            },
            controller : ['$scope','$location','TablaPaginada','$filter',function($scope,$location,TablaPaginada,$filter){

                var $translate = $filter('translate');

                // $scope.pageTitle = $translate('TITLE.DASHBOARD');


                $scope.$watch('$scope.tableData',function(old,val){

                    $scope.cols = $scope.tableData.cols;

                    for(var i = 0; i<$scope.cols.length;i++){
                        if(!$scope.cols[i].field) break;
                        $scope.cols[i].title = $translate($scope.cols[i].title);
                    }
                    $scope.tableParams = TablaPaginada.create($scope.tableData);

                    console.log($scope.tableData);

                    
                });
                
            }],
            link: function(scope, element,attrs) {

                var tbl_data = scope.tableData;
                scope.tableData = {
                    stateParams : tbl_data && tbl_data.stateParams || {},
                    resourceMethod : tbl_data && tbl_data.resourceMethod,
                    config : {
                        defaultSort: tbl_data && tbl_data.config && tbl_data.config.defaultSort || 'id,desc',
                        notFound: tbl_data && tbl_data.config && tbl_data.config.not_found || 'No se encontraron resultados',
                    }, 
                    cols: tbl_data && tbl_data.cols || []
                }
            }
        }
    });

})();