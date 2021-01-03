(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ListarPedidoController', ListarPedidoController);

        ListarPedidoController.$inject = ['$scope', 'AlertService', '$state', '$stateParams','SolicitarPedidoAdminService','TablaPaginada'];

    function ListarPedidoController($scope, AlertService , $state, $stateParams, SolicitarPedidoAdminService, TablaPaginada) {
        var vm = this;
        vm.pedido = {};


        var params = {
            resourceMethod: SolicitarPedidoAdminService.listado,
            config: {
                defaultSort: 'id,desc'
            }
        };

        vm.tableSorting = TablaPaginada.create(params);

        vm.estadoFiltro = {
            availableOptions: [
              {id: '1', name: 'Todos'},
              {id: '2', name: 'Codigo de Pedido'},
              {id: '3', name: 'DNI de Cliente'},
              {id: '4', name: 'ESTADO'},
            ],
            selectedOption: {id: '1', name: 'Todos'} //This sets the default value of the select in the ui
        };

        vm.buscar = function buscar() {
            if(vm.estadoFiltro.selectedOption.name == 'Todos'){
                return vm.tableSorting = TablaPaginada.create(params);
            }
            var paramsFilter = {
                stateParams: {
                    palabra: vm.buscarInmueble,
                    tipo: vm.estadoFiltro.selectedOption.id
                },
                resourceMethod: InmuebleService.searchInmueble,
                config: {
                    defaultSort: 'id,desc'
                }
            };
            return vm.tableSorting = TablaPaginada.create(paramsFilter);
        }
        
    }
})();