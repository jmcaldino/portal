(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ListarInmuebleController', ListarInmuebleController);

        ListarInmuebleController.$inject = ['InmuebleService', 'TablaPaginada', 'AlertService', '$state','$stateParams'];

    function ListarInmuebleController(InmuebleService, TablaPaginada, AlertService, $state, $stateParams) {
        var vm = this;
        vm.buscarInmueble = null;

        var params = {
            resourceMethod: InmuebleService.listar,
            config: {
                defaultSort: 'id,desc'
            }
        };

        vm.tableSorting = TablaPaginada.create(params);

        vm.estadoFiltro = {
            availableOptions: [
              {id: '1', name: 'Todos'},
              {id: '2', name: 'local'},
              {id: '3', name: 'edificio'},
              {id: '4', name: 'casa'},
            ],
            selectedOption: {id: '1', name: 'Todos'} //This sets the default value of the select in the ui
        };

        vm.buscar = function buscar() {
            if(vm.estadoFiltro.selectedOption.name == 'Todos'){
                vm.estadoFiltro.selectedOption.name = null;
            }
            var params = {
                stateParams: {
                    palabra: vm.buscarInmueble,
                    tipo: vm.estadoFiltro.selectedOption.name
                },
                resourceMethod: InmuebleService.searchInmueble,
                config: {
                    defaultSort: 'id,desc'
                }
            };
            vm.tableSorting = TablaPaginada.create(params);
        }

    }
})();