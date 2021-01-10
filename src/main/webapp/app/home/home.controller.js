(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('HomeController', HomeController);

        HomeController.$inject = ['HomeService','$scope', 'CarritoService', 'AlertService','Auth' ,'$state','$stateParams', 'LoginService','$timeout', 'CarritoHeaderService'];

    function HomeController(HomeService, $scope, CarritoService , AlertService, Auth, $state, $stateParams, LoginService, $timeout, CarritoHeaderService) {
        var vm = this;

        vm.menuCartTimeout = 3000; // default timeout

        vm.principalCategories = [];
        vm.subCategories = undefined;
        vm.productosDestacados = {};
        vm.totalElements = undefined;
        vm.isFilterDescacados=true;
        vm.isFilterProduct=false;
        vm.hiddenBtnSearch = false;
        vm.buscarProducto = undefined;
        vm.hiddenCarousel = false;
        vm.size = 16;
        $scope.cart = vm.carrito;

        $scope.sortingOrder = 'name';
        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 5;
        $scope.pagedItems = [];
        $scope.currentPage = ($stateParams.page)?$stateParams.page: 0;
        $scope.n = 0;
        vm.page = ($stateParams.page)?$stateParams.page: 0;
        vm.quantityProd = undefined;
        vm.recommended1 = [];
        vm.recommended2 = [];
        vm.recommended3 = [];

        HomeService.getAllDestacadosProduct({
            size:vm.size,
            page:vm.page
        },  function (response) {
                vm.productosDestacados = response.content;
                vm.totalElements = response.totalElements;
                vm.isFilterDescacados=true;
                var pages = [];  // Agregamos las paginas y para el active
                for (var i = 0; i < response.totalPages; i++) {
                        pages.push(i+1);
                }
                $scope.pagedItems= pages;
                CarritoHeaderService.refreshProductosDestacados(vm.productosDestacados);
        });

        HomeService.getAllRecommendedProduct({
        },  function (response) {
            vm.recommended1 = response.slice(0, 3);
            vm.recommended2 = response.slice(3,6);
            vm.recommended3 = response.slice(6,9);
            CarritoHeaderService.refreshProductosDestacados(vm.recommended1);
            CarritoHeaderService.refreshProductosDestacados(vm.recommended2);
            CarritoHeaderService.refreshProductosDestacados(vm.recommended3);
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
                angular.element('#initproductfocus').find('button').focus();
                $state.go('home.calmar', {
                    page: $scope.currentPage
                }, {
                    reload: true
                });
            }
        };
        
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;  // Sumamos
                angular.element('#initproductfocus').find('button').focus();
                $state.go('home.calmar', {
                    page: $scope.currentPage
                }, {
                    reload: true
                });
            }
        };
        
        $scope.setPage = function () {
            $scope.currentPage = this.n; // Asignamos
            angular.element('#initproductfocus').find('button').focus();
            $state.go('home.calmar', {
                page: $scope.currentPage
            }, {
                reload: true
            });
        };

        vm.searchProduct = function searchProduct() {
            if(vm.buscarProducto){
                $state.go('home.search',{
                    keyword: vm.buscarProducto,
                    page: 0
                });
            }
        }

        vm.agregarProducto = function agregarProducto(idProd) {
            if(idProd){
                CarritoService.carrito({
                    id: idProd,
                    action : 'order'
                },  function (response) {

                });
                $state.go('home.calmar', {
                    page: $scope.currentPage
                }, {
                    reload: true
                });
            }
        }
        
        vm.asignarProducto = function asignarProducto(idProd,cantidadActual, valor, operacion) {
            if(idProd && valor && cantidadActual >= 1){
                if(valor != 0 && ((cantidadActual + valor) >= 1)){
                    var action = 'orderQuantity';
                    var valueInput = valor;
                    if(operacion == 'sumaoresta'){
                        action = 'order';
                        valueInput = cantidadActual + valor;
                    }
                    CarritoService.carrito({
                        id: idProd,
                        action : action,
                        cantidad : valor
                    },  function (response) {
                    });
                    CarritoHeaderService.refreshProductosDestacados(vm.productosDestacados);
                    CarritoHeaderService.refreshProductosDestacados(vm.recommended1);
                    document.getElementById("inputData" + idProd).value = valueInput;
                    //$state.reload();
                }
            }
        }

        vm.minusSlider = function minusSlider(){
            //vm.hiddenCarousel = true;
        }

        vm.refresh = function refresh() {
            //$state.reload();
            $state.go('home.calmar', {
                page: $scope.currentPage
            }, {
                reload: true
            });
        }

        vm.getLogin = LoginService.open;

        vm.logout = Auth.logout();

    }
})();