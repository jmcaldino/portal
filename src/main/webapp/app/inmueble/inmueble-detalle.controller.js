(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('InmuebleDetailController', InmuebleDetailController);

        InmuebleDetailController.$inject = ['InmuebleService', 'TablaPaginada', 'AlertService', '$state','$stateParams'];

    function InmuebleDetailController(InmuebleService, TablaPaginada, AlertService, $state, $stateParams) {
        var vm = this;

        vm.inmueble = undefined;

        InmuebleService.getByIdAndType({
            id: $stateParams.id,
            tipo: $stateParams.tipo
        }, function (response) {
			vm.inmueble = response;
        });


    }
})();