(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('SolicitarPedidoController', SolicitarPedidoController);

        SolicitarPedidoController.$inject = ['CarritoService','$scope', 'AlertService', '$state', '$timeout', 'SolicitarPedidoService','$stateParams'];

    function SolicitarPedidoController(CarritoService, $scope, AlertService , $state, $timeout, SolicitarPedidoService, $stateParams) {
        var vm = this;
        vm.carrito = undefined
        vm.principalCategories = [];
        vm.isActive = false;
        vm.order= ($stateParams.user)? $stateParams.user: {
            firstName: null,
            lastName: null,
            dni: null,
            province: null,
            city: null,
            postalCode: null,
            address: null,
            email: null,
            envio: "domicilio",
            phone: {
                area: null,
                number: null
            },
            contactMeByWhatsapp: false,
            message: null
        };

        vm.validateFields = {
            lastName: true, 
            firstName: true, 
            dni: true, 
            province: true,
            city: true,
            postalCode: true,
            address: true,
            email: true,
            envio: true,
            area: true,
            number: true,
            contactMeByWhatsapp: true,
            message: true
        };



        CarritoService.getCarrito({}, function (response) {
            vm.carrito = response;
            angular.element('#cantidadCarritoHead').val(vm.carrito.cantidad);
            if(!vm.carrito.cantidad){
                $state.go('home.calmar', {
                    page: 0
                }, {
                    reload: true
                });
            }
        }),
        function (err) {
            return cb(err);
        }.bind(this).$promise;

        vm.initPedido = function() {
            angular.element('#optionfocus').find('input').focus();
        }

        vm.selectWhatapp = function() {
            vm.order.contactMeByWhatsapp = (vm.order.contactMeByWhatsapp)?false:true;
        }

        vm.quitarProducto = function quitarProducto(idProd) {
            if(idProd){
                CarritoService.carrito({
                    id: idProd,
                    action : 'delete'
                },  function (response) {
                });
                $state.go('pedido', {
                    user: vm.order
                }, {
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
                    $state.go('pedido', {
                        user: vm.order
                    }, {
                        reload: true
                    });
                }
            }
        }


        vm.provincias = [
            { name: 'Buenos Aires', value: 'false' }, 
            { name: 'Buenos Aires-GBA', value: 'false'},
            { name: 'Capital Federal', value: 'false'},
            { name: 'Catamarca', value: 'false'},
            { name: 'Chaco', value: 'false'},
            { name: 'Chubut', value: 'false'},
            { name: 'Cordoba', value: 'false'},
            { name: 'Corrientes', value: 'false'},
            { name: 'Entre Rios', value: 'false'},
            { name: 'Formosa', value: 'false'},
            { name: 'Jujuy', value: 'false'},
            { name: 'La Pampa', value: 'false'},
            { name: 'La Rioja', value: 'false'},
            { name: 'Mendoza', value: 'false'},
            { name: 'Misiones', value: 'false'},
            { name: 'Neuquen', value: 'false'},
            { name: 'Rio Negro', value: 'false'},
            { name: 'San Juan', value: 'false'},
            { name: 'San Luis', value: 'false'},
            { name: 'Santa Cruz', value: 'false'},
            { name: 'Santa Fe', value: 'false'},
            { name: 'Santiago del Estero', value: 'false'},
            { name: 'Tierra del Fuego', value: 'false'},
            { name: 'Tucuman', value: 'false'}
        ];

        vm.refresh = function refresh() {
            //$state.reload();
            $state.go('home.calmar', {
                page: $scope.currentPage
            }, {
                reload: true
            });
        }

        vm.save = function save() {
            var idValid = validateField(vm.order);
            if(idValid){
                vm.order.province = vm.order.province.name;
                SolicitarPedidoService.pedido(vm.order);
                vm.clearNotification();
                return $state.go('pedido-terminado', {
                    page: $scope.currentPage
                }, {
                    reload: true
                });
            } else
                return false;
            function validateField(order) {
                for(var key in order){
                    if(key === 'phone'){
                        if(order[key].area === null || order[key].area === undefined || order[key].area === ""){
                            var myEl = document.getElementById('area');
                            var angularEl = angular.element(myEl);
                            angularEl.focus();
                            vm.validateFields['area'] = false;
                            $timeout(function(e){
                                    vm.validateFields['area'] = true;
                                  }, 4000);
                            return false;
                        }else{
                            if(order[key].number === null || order[key].number === undefined || order[key].number === ""){
                                var myEl = document.getElementById('number');
                                var angularEl = angular.element(myEl);
                                angularEl.focus();
                                vm.validateFields['number'] = false;
                                $timeout(function(e){
                                        vm.validateFields['number'] = true;
                                      }, 4000);
                                return false;
                            }
                        }
                    }else{
                        if(order[key] === null || order[key] === undefined || order[key] === ""){
                            var myEl = document.getElementById(key);
                            var angularEl = angular.element(myEl);
                            angularEl.focus();
                            vm.validateFields[key] = false;
                                $timeout(function(e){
                                    vm.validateFields[key] = true;
                                  }, 4000);
                            return false;
                        }
                    }
                }
                return true;
            }
        }

        vm.refresh = function refresh() {
            //$state.reload();
            $state.go('home.calmar', {
                page: $scope.currentPage
            }, {
                reload: true
            });
        }

        //Clear Notification
        vm.clearNotification = function($event) {      
            angular.element('#notifications').addClass('empty');
            CarritoService.clearCart({}, function (response) {
                vm.carritoHead = undefined;
                document.getElementById("cantidadCarritoHead").innerHTML = '0';
            });
        }

    }
})();