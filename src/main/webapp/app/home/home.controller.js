(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('HomeController', HomeController);

        HomeController.$inject = ['HomeService','$scope', 'AlertService','Auth' ,'$state','$stateParams', 'LoginService'];

    function HomeController(HomeService, $scope, AlertService, Auth, $state, $stateParams, LoginService) {
        var vm = this;

        vm.principalCategories = [];
        vm.subCategories = undefined;
        vm.productosDestacados = {};
        vm.totalElements = undefined;
        vm.isFilterCategory=false;
        vm.isFilterDescacados=true;
        vm.isFilterProduct=false;
        vm.hiddenBtnSearch = false;
        vm.buscarProducto = undefined;

        $scope.sortingOrder = 'name';
        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 5;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.n = 0;

        HomeService.getAllDestacadosProduct({
            size:16,
            page:0
        },  function (response) {
                vm.productosDestacados = response.content;
                vm.totalElements = response.totalElements;
                vm.isFilterDescacados=true;
                var pages = [];  // Agregamos las paginas
                for (var i = 0; i < response.totalPages; i++) {
                        pages.push(i+1);
                }
                $scope.pagedItems= pages;
        });
        
        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };
        
        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;  // Restamos
                vm.productosDestacados = {};
                if(vm.isFilterDescacados){
                    HomeService.getAllDestacadosProduct({
                        size:16,
                        page:$scope.currentPage
                    },  function (response) {
                            vm.productosDestacados = response.content;
                            vm.totalElements = response.totalElements;
                    });
                } else{
                    if(vm.isFilterCategory){
                        HomeService.getAllProductByCategory({
                            category: categoryName,
                            size:16,
                            page:$scope.currentPage
                        }, function (response) {
                            vm.productosDestacados = response.content;
                            vm.totalElements = response.totalElements;
                            vm.isFilterCategory = true;
                            var pages = [];  // Agregamos las paginas
                            for (var i = 0; i < response.totalPages; i++) {
                                    pages.push(i+1);
                            }
                            $scope.pagedItems= pages;
                        }),
                        function (err) {
                            return cb(err);
                        }.bind(this).$promise;
                    } else{
                        // search
                    }
                }
            }
        };
        
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
                vm.productosDestacados = {};
                if(vm.isFilterDescacados){
                    HomeService.getAllDestacadosProduct({
                        size:16,
                        page:$scope.currentPage
                    },  function (response) {
                            vm.productosDestacados = response.content;
                            vm.totalElements = response.totalElements;
                    }).$promise;
                } else{
                    if(vm.isFilterCategory){
                        HomeService.getAllProductByCategory({
                            category: categoryName,
                            size:16,
                            page:$scope.currentPage
                        }, function (response) {
                            vm.productosDestacados = response.content;
                            vm.totalElements = response.totalElements;
                            vm.isFilterCategory = true;
                            var pages = [];  // Agregamos las paginas
                            for (var i = 0; i < response.totalPages; i++) {
                                    pages.push(i+1);
                            }
                            $scope.pagedItems= pages;
                        }),
                        function (err) {
                            return cb(err);
                        }.bind(this).$promise;
                    } else{
                        // search
                    }
                }
            }
        };
        
        $scope.setPage = function () {
            $scope.currentPage = this.n;
            vm.productosDestacados = {};
            if(vm.isFilterDescacados){
                HomeService.getAllDestacadosProduct({
                    size:16,
                    page:$scope.currentPage
                },  function (response) {
                        vm.productosDestacados = response.content;
                        vm.totalElements = response.totalElements;
                });
            } else{
                if(vm.isFilterCategory){
                    HomeService.getAllProductByCategory({
                        category: categoryName,
                        size:16,
                        page:$scope.currentPage
                    }, function (response) {
                        vm.productosDestacados = response.content;
                        vm.totalElements = response.totalElements;
                        vm.isFilterCategory = true;
                        var pages = [];  // Agregamos las paginas
                        for (var i = 0; i < response.totalPages; i++) {
                                pages.push(i+1);
                        }
                        $scope.pagedItems= pages;
                    }),
                    function (err) {
                        return cb(err);
                    }.bind(this).$promise;
                } else{
                    // search
                }
            }
        };
    
        // change sorting order
        $scope.sort_by = function(newSortingOrder) {
            if ($scope.sortingOrder == newSortingOrder)
                $scope.reverse = !$scope.reverse;
    
            $scope.sortingOrder = newSortingOrder;
    
            // icon setup
            $('th i').each(function(){
                // icon reset
                $(this).removeClass().addClass('icon-sort');
            });
            if ($scope.reverse)
                $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
            else
                $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
        };

        vm.buscarPorCategoria = function buscarPorCategoria(categoryName) {
            HomeService.getAllProductByCategory({
                category: categoryName,
                size:16,
                page:0
            }, function (response) {
                vm.productosDestacados = response.content;
                vm.totalElements = response.totalElements;
                vm.isFilterCategory = true;
                vm.isFilterProduct = false;
                vm.isFilterDescacados = false
                var pages = [];  // Agregamos las paginas
                for (var i = 0; i < response.totalPages; i++) {
                        pages.push(i+1);
                }
                $scope.pagedItems= pages;
            }),
            function (err) {
                return cb(err);
            }.bind(this).$promise;
        }

        vm.searchProduct = function searchProduct() {
            HomeService.searchProduct({
                keyword: vm.buscarProducto,
                size:16,
                page:0
            }, function (response) {
                vm.productosDestacados = response.content;
                vm.totalElements = response.totalElements;
                vm.isFilterProduct = true;
                vm.isFilterCategory = false;
                vm.isFilterDescacados = false
                var pages = [];  // Agregamos las paginas
                for (var i = 0; i < response.totalPages; i++) {
                        pages.push(i+1);
                }
                $scope.pagedItems= pages;
            }),
            function (err) {
                return cb(err);
            }.bind(this).$promise;
        }

        vm.getLogin = LoginService.open;

        vm.logout = Auth.logout();

    }
})();