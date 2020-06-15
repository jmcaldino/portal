(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ListarInquilinoController', ListarInquilinoController);

        ListarInquilinoController.$inject = ['InquilinoService', 'TablaPaginada', 'AlertService', '$state','$stateParams'];

    function ListarInquilinoController(InquilinoService, TablaPaginada, AlertService, $state, $stateParams) {
        var vm = this;

        var params = {
            resourceMethod: InquilinoService.listar,
            config: {
                defaultSort: 'id,desc'
            }
        };

        vm.tableSorting = TablaPaginada.create(params);



    }
})();