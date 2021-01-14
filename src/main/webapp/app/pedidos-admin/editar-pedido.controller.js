(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('EditarPedidoController', EditarPedidoController);

        EditarPedidoController.$inject = ['$scope', 'AlertService', '$state', '$stateParams', 'SolicitarPedidoService','SolicitarPedidoAdminService'];

    function EditarPedidoController($scope, AlertService , $state, $stateParams, SolicitarPedidoService, SolicitarPedidoAdminService) {
        var vm = this;
        vm.pedido = {};

        vm.order= {
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

        vm.refresh = function refresh() {
            //$state.reload();
            $state.go('home.calmar', {
                page: $scope.currentPage
            }, {
                reload: true
            });
        }

        SolicitarPedidoService.get({
            orderCode: $stateParams.codigo
        }, function (response) {
            vm.pedido = response;
            vm.provincias.selected = { name: vm.pedido.cliente.provincia, value: 'false'};
            vm.estados.selected = { name: vm.pedido.estado, value: 'false'};
        });

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
        vm.selectWhatapp = function() {
            vm.pedido.contactarWhatapp = (vm.pedido.contactarWhatapp)?false:true;
        }

        vm.estados = [
            { name: 'Pendiente', value: 'false' }, 
            { name: 'Finalizado', value: 'false'},
            { name: 'Cancelado', value: 'false'}
        ];

        vm.edit = function editar() {
            setFields(vm.order);
            vm.order.province = vm.provincias.selected.name;
            SolicitarPedidoAdminService.editar({
                codigo: $stateParams.codigo,
                estado: vm.estados.selected.name
            },
               vm.order,function (response) {
            });
            return $state.go('pedidos', {
                page: $scope.currentPage
            }, {
                reload: true
            });
            function setFields(order) {
                vm.order.firstName= vm.pedido.cliente.nombre;
                vm.order.lastName= vm.pedido.cliente.apellido;
                vm.order.dni= vm.pedido.cliente.dni;
                vm.order.province= vm.provincias.selected.name;
                vm.order.city= vm.pedido.cliente.ciudad;
                vm.order.postalCode= vm.pedido.cliente.codigoPostal;
                vm.order.address= vm.pedido.cliente.domicilio;
                vm.order.email= vm.pedido.cliente.email;
                vm.order.envio= vm.pedido.tipoEnvio;
                vm.order.phone.area= vm.pedido.cliente.telefonoArea;
                vm.order.phone.number= vm.pedido.cliente.numeroDeTelefono;
                vm.order.contactMeByWhatsapp= vm.pedido.contactarWhatapp;
                vm.order.message= vm.pedido.mensaje;
                return true;
            }
        }
    }
})();