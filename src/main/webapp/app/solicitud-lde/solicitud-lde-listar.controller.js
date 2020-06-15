(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ListarSolicitudLdeController', ListarSolicitudLdeController);

        ListarSolicitudLdeController.$inject = ['$state', 'TablaPaginada', 'AlertService','SolicitudLdeService', 'ConfirmModalService'];

    function ListarSolicitudLdeController($state, TablaPaginada, AlertService, SolicitudLdeService, ConfirmModalService) {
        var vm = this;
        vm.buscarPorUnit = undefined;

        var params = {
            resourceMethod: SolicitudLdeService.listar,
            config: {
                defaultSort: 'id,desc'
            }
        };

        vm.tableSorting = TablaPaginada.create(params);

        vm.estadoFiltro = {
            availableOptions: [
              {id: '1', name: 'Todos'},
              {id: '2', name: 'Habilitado'},
              {id: '3', name: 'Anulado'}
            ],
            selectedOption: {id: '1', name: 'Todos'} //This sets the default value of the select in the ui
        };

        vm.updateDTO = {
            "viaje": undefined,
            "contenedor": undefined,
        };
            
        vm.anularLde = function anularLde(contenedor, viaje) {
            ConfirmModalService.open('Anular libre de deuda ','¿Está seguro que desea anular el libre de deuda del contenedor '+contenedor+'?',
            function(){
                vm.updateDTO.viaje = viaje;
                vm.updateDTO.contenedor = contenedor;
                
                SolicitudLdeService.anular(vm.updateDTO, function (response) {
                $state.go('solicitud-lde', {
                }, {
                    reload: true
                });
                    AlertService.success("Se actualizo exitosamente el libre de deuda");
                }, function (err){
                    console.log(err);
                });
            }
            );
        }
            
        vm.habilitarLde = function habilitarLde(contenedor, viaje) {        
            ConfirmModalService.open('Habilitar libre de deuda ','¿Está seguro que desea habilitar el libre de deuda del contenedor '+contenedor+'?',
            function(){
                vm.updateDTO.viaje = viaje;
                vm.updateDTO.contenedor = contenedor;
                
                SolicitudLdeService.habilitar(vm.updateDTO, function (response) {
                $state.go('solicitud-lde', {
                }, {
                    reload: true
                });
                    AlertService.success("Se actualizo exitosamente el libre de deuda");
                }, function (err){
                    console.log(err);
                });
            }
            );

        }

        vm.retirarContenedor = function retirarContenedor(contenedor, viaje) {
            ConfirmModalService.open('Retirar contenedor ','¿Está seguro que desea retirar el contenedor '+contenedor+'?',
            function(){
                vm.updateDTO.viaje = viaje;
                vm.updateDTO.contenedor = contenedor;
                
                SolicitudLdeService.retirar(vm.updateDTO, function (response) {
                $state.go('solicitud-lde', {
                }, {
                    reload: true
                });
                    AlertService.success("Se actualizo exitosamente el estado del Contenedor");
                }, function (err){
                    console.log(err);
                });
            }
            );
        }

        vm.buscar = function buscar() {
            var params = {
                stateParams: {
                    estado: vm.estadoFiltro.selectedOption.name,
                    unitNbr: vm.buscarPorUnit
                },
                resourceMethod: SolicitudLdeService.buscarSolLde,
                config: {
                    defaultSort: 'id,desc'
                }
            };
            vm.tableSorting = TablaPaginada.create(params);
        }

    }
})();
