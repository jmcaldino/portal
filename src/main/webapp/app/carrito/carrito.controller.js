(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('CartController', CartController);

        CartController.$inject = ['CarritoService','HomeService','$scope', 'AlertService','Auth' ,'$state','$stateParams', 'LoginService'];

    function CartController(CarritoService,HomeService, $scope, AlertService, Auth, $state, $stateParams, LoginService) {
        var vm = this;
        vm.carrito = undefined
        vm.principalCategories = [];

        CarritoService.getCarrito({}, function (response) {
            vm.carrito = response;
            angular.element('#cantidadCarritoHead').val(vm.carrito.cantidad);
        }),
        function (err) {
            return cb(err);
        }.bind(this).$promise;

        vm.quitarProducto = function quitarProducto(idProd) {
            if(idProd){
                CarritoService.carrito({
                    id: idProd,
                    action : 'delete'
                },  function (response) {
                });
                $state.go('cart', {}, {
                    reload: true
                });
            }
        }

        vm.asignarProducto = function asignarProducto(idProd,cantidadActual, valor, operacion) {
            if(idProd && valor && cantidadActual){
                if(valor != 0 && ((cantidadActual + valor) >= 1)){
                    var action = 'orderQuantity';
                    if(operacion == 'sumaoresta'){
                        action = 'order';
                    }
                    CarritoService.carrito({
                        id: idProd,
                        action : action,
                        cantidad : valor
                    },  function (response) {
                        document.getElementById("cantidadCarritoHead").innerHTML = vm.carrito.cantidad;
                    });
                    $state.go('cart', {}, {
                        reload: true
                    });
                }
            }
        }

    }
})();