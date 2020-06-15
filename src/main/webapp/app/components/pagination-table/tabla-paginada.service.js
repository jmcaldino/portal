(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('TablaPaginada', TablaPaginada);

    TablaPaginada.$inject = ['$location','ngTableParams'];

    function TablaPaginada ($location,ngTableParams) {

        return {
            create : function(customParams){
                var urlParams = $location.search();
                var vm = {};

                vm.page = urlParams.page || 1;
                vm.size = urlParams.size || customParams.config.size || 10;

                
                vm.sort = urlParams.sort || customParams.config.defaultSort;
                
                vm.fechaDesde = urlParams.fechaDesde || null;
                vm.fechaHasta = urlParams.fechaHasta || null;
                
                function sortForTable(url){
                    var re = {};
                    if( typeof url === 'string' ) {
                        url = [url];
                    }

                    for(var i = 0;i<url.length;i++){
                        var sort = url[i].split(',');
                        re[sort[0]] = (sort.length>1)? sort[1] : 'asc';
                    }
                    return re;
                }

                function sortToUrl(sort){
                    var ret = [];
                    for(var key in sort){
                        ret.push(key+','+sort[key]);
                    }
                    return ret;
                }

                vm.tableSorting = new ngTableParams({
                    page: vm.page,            // show first page
                    count: vm.size,           // count per page
                    sorting: sortForTable(vm.sort)
                }, {
                    total: 0, // length of data
                    counts: [10,20,50],
                    getData: function($defer, params) {
                        var resolveData = function(data){
                            params.total(data.totalElements);
                            $defer.resolve(data.content);
                            console.log("LOG : " + data);
                        }


                        var new_params = {
                            page: params.page(),
                            size: params.count(),
                            sort : sortToUrl(params.sorting()),
                            fechaDesde : vm.fechaDesde,
                            fechaHasta : vm.fechaHasta
                        };

                        for(var key in customParams.stateParams){
                            new_params[key] = customParams.stateParams[key];
                        }

                        var filters = params.filter();

                        for(var key in filters){
                            new_params[key] = filters[key];
                        }

                        // $location.search({
                        //     sort: new_params.sort,
                        //     page: new_params.page,
                        //     size: new_params.size,
                        //     fechaDesde: new_params.fechaDesde,
                        //     fechaHasta: new_params.fechaHasta,

                        // }).replace();

                        // en el server es en base 0
                        new_params.page--;

                        // console.log(new_params);
                        if(customParams.resourceMethod){
                            if(customParams.postParams){
                                customParams.resourceMethod(new_params,customParams.postParams,resolveData);
                            }else{
                                customParams.resourceMethod(new_params,resolveData);
                            }
                        }else{
                            $defer.resolve([]);
                        }
                    }
                });

                return vm.tableSorting;
            }
        }
        
    }
})();




