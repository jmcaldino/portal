(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('SearchController', SearchController);

        SearchController.$inject = ['HomeService', '$state','$stateParams','$scope','ConfirmModalService', 'LoginService', 'Auth', 'CarritoService','CarritoHeaderService'];

    function SearchController(HomeService, $state, $stateParams, $scope, ConfirmModalService, LoginService, Auth, CarritoService, CarritoHeaderService) {
        var vm = this;
        vm.carrito = undefined;

        vm.productosDestacados = {};
        vm.totalElements = undefined;
        vm.isFilterBySearchName=true;
        vm.hiddenBtnSearch = false;
        vm.buscarProducto = undefined;
        vm.hiddenCarousel = false;
        vm.size = 16;

        $scope.sortingOrder = 'name';
        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 5;
        $scope.pagedItems = [];
        $scope.currentPage = ($stateParams.page)?$stateParams.page: 0;
        vm.page = ($stateParams.page)?$stateParams.page: 0;
        $scope.n = 0;


        HomeService.searchProduct({
            keyword: $stateParams.keyword,
            size:vm.size,
            page:vm.page
        }, function (response) {
            vm.buscarProducto = $stateParams.keyword;
            vm.hiddenCarousel = true;
            vm.productosDestacados = response.content;
            vm.totalElements = response.totalElements;
            var pages = [];  // Agregamos las paginas
            for (var i = 0; i < response.totalPages; i++) {
                    pages.push(i+1);
            }
            $scope.pagedItems= pages;

            //vm.revisarSiEstaEnCarrito(function(){});
            CarritoHeaderService.refreshProductosDestacados(vm.productosDestacados);
        }),
        function (err) {
            return cb(err);
        }.bind(this).$promise;
        
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
                $state.go('home.search', {
                    keyword: $stateParams.keyword,
                    page: $scope.currentPage
                }, {
                    reload: true
                });
            }
        };
        
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;  // Sumamos
                $state.go('home.search', {
                    keyword: $stateParams.keyword,
                    page: $scope.currentPage
                }, {
                    reload: true
                });
            }
        };
        
        $scope.setPage = function () {
            $scope.currentPage = this.n;  // Asignamos
            $state.go('home.search', {
                keyword: $stateParams.keyword,
                page: $scope.currentPage
            }, {
                reload: true
            });
        };

        vm.agregarProducto = function agregarProducto(idProd) {
            if(idProd){
                CarritoService.carrito({
                    id: idProd,
                    action : 'order'
                },  function (response) {

                });
                $state.go('home.search', {
                    keyword: $stateParams.keyword,
                    page: $scope.currentPage
                }, {
                    reload: true
                });
            }
        }

        vm.asignarProducto = function asignarProducto(idProd,cantidadActual, valor, operacion) {
            if(idProd && valor && cantidadActual){
                if(valor != 0 && ((cantidadActual + valor) >= 1)){
                    var action = 'orderQuantity';
                    var valueInput = valor;
                    if(operacion == 'sumaoresta'){
                        action = 'order';
                    }
                    CarritoService.carrito({
                        id: idProd,
                        action : action,
                        cantidad : valor
                    },  function (response) {
                    });
                    CarritoHeaderService.refreshProductosDestacados(vm.productosDestacados);
                    
                    document.getElementById("inputData" + idProd).value = valueInput;
                    document.getElementById("cantidadCarritoHead").innerHTML = vm.carrito.cantidad;
                }
            }
        }

        vm.searchProduct = function searchProduct() {
            if(vm.buscarProducto){
                $state.go('home.search', {
                    keyword: vm.buscarProducto,
                    page: 0
                }, {
                    reload: true
                });
            }
        }

        vm.getLogin = LoginService.open;

        vm.logout = Auth.logout();

    }
})();