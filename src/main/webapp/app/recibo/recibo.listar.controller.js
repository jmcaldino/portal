(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ListarReciboController', ListarReciboController);

        ListarReciboController.$inject = ['ReciboService', 'TablaPaginada', 'AlertService', '$state','$stateParams'];

    function ListarReciboController(ReciboService, TablaPaginada, AlertService, $state, $stateParams) {
        var vm = this;

        var params = {
            resourceMethod: ReciboService.listar,
            config: {
                defaultSort: 'id,desc'
            }
        };

        vm.tableSorting = TablaPaginada.create(params);

        vm.opcionesTerminal = ['BACTSSA', 'TERMINAL4', 'TRP', 'EXOLGAN'];
    
        vm.estadoFiltro = {
            availableOptions: [
              {id: '1', name: 'BACTSSA'},
              {id: '2', name: 'TERMINAL4'},
              {id: '3', name: 'TRP'},
              {id: '4', name: 'EXOLGAN'}
            ],
            selectedOption: {id: undefined, name: undefined} //This sets the default value of the select in the ui
        };



    }
})();