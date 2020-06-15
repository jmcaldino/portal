(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('SolicitudLdeRetirarUnitDialogController', SolicitudLdeRetirarUnitDialogController);

        SolicitudLdeRetirarUnitDialogController.$inject = ['$state','$stateParams', 'AlertService','SolicitudLdeService', '$uibModalInstance'];

    function SolicitudLdeRetirarUnitDialogController($state, $stateParams, AlertService, SolicitudLdeService, $uibModalInstance) {
        var vm = this;
        vm.solicitudLde = undefined;
        vm.emailCliente = undefined;
        vm.clear = clear;

        SolicitudLdeService.getById({
            id: $stateParams.id
        }, function (response) {
			vm.solicitudLde = response;
        });

        vm.updateDTO = {
            "viaje": undefined,
            "contenedor": undefined,
            "email_cliente" : undefined
        };

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        vm.retirarContenedor = function retirarContenedor() {
                vm.updateDTO.viaje = vm.solicitudLde.lde.viaje;
                vm.updateDTO.contenedor = vm.solicitudLde.lde.contenedor.nbr;
                vm.updateDTO.email_cliente = vm.emailCliente;

                SolicitudLdeService.retirar(vm.updateDTO, function (response) {
                $state.go('solicitud-lde', {
                }, {
                    reload: true
                });
                    AlertService.success("El Contenedor "+ vm.updateDTO.contenedor + " se actualizo exitosamente.");
                    $uibModalInstance.close();
                }, function (err){
                    console.log(err);
                });
        }
    }
})();