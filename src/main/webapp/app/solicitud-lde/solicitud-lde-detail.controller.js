(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('SolicitudLdeDetailController', SolicitudLdeDetailController);

        SolicitudLdeDetailController.$inject = ['$state','$stateParams', 'AlertService','SolicitudLdeService', 'ConfirmModalService'];

    function SolicitudLdeDetailController($state, $stateParams, AlertService, SolicitudLdeService, ConfirmModalService) {
        var vm = this;
        vm.solicitudLde = undefined;

        SolicitudLdeService.getById({
            id: $stateParams.id
        }, function (response) {
			vm.solicitudLde = response;
        });


        vm.updateDTO = {
            "viaje": undefined,
            "contenedor": undefined,
        };
            
        vm.anularLde = function anularLde() {
            ConfirmModalService.open('Anular libre de deuda ','¿Está seguro que desea anular el libre de deuda del contenedor '+vm.solicitudLde.lde.contenedor.nbr+'?',
            function(){
                vm.updateDTO.viaje = vm.solicitudLde.lde.viaje;
                vm.updateDTO.contenedor = vm.solicitudLde.lde.contenedor.nbr;
                
                SolicitudLdeService.anular(vm.updateDTO, function (response) {
                $state.go('solicitud-lde', {
                }, {
                    reload: true
                });
                    AlertService.success("Se anuló el libre de deuda");
                }, function (err){
                    console.log(err);
                });
            }
            );
        }
      
            
        vm.habilitarLde = function habilitarLde() {
            ConfirmModalService.open('Anular libre de deuda ','¿Está seguro que desea anular el libre de deuda del contenedor '+vm.solicitudLde.lde.contenedor.nbr+'?',
            function(){
                vm.updateDTO.viaje = vm.solicitudLde.lde.viaje;
                vm.updateDTO.contenedor = vm.solicitudLde.lde.contenedor.nbr;
                
                SolicitudLdeService.habilitar(vm.updateDTO, function (response) {
                $state.go('solicitud-lde', {
                }, {
                    reload: true
                });
                    AlertService.success("Se habilitó exitosamente el libre de deuda");
                }, function (err){
                    console.log(err);
                });
            });
        }

    }
})();