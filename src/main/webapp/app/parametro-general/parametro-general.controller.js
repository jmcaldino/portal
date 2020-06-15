(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ParametroGeneralController', ParametroGeneralController);

        ParametroGeneralController.$inject = ['$state','$stateParams', 'AlertService', 'ParametroGeneralService', 'TablaPaginada', 'ConfirmModalService'];

    function ParametroGeneralController($state, $stateParams, AlertService, ParametroGeneralService, TablaPaginada, ConfirmModalService) {
        var vm = this;

        var params = {
            resourceMethod: ParametroGeneralService.listar,
            config: {
                defaultSort: 'id,desc'
            }
        };

        vm.tableSorting = TablaPaginada.create(params);
  
        vm.update = function update(clave, valor) {
            ConfirmModalService.open('Anular Validacion Dígito verificador','¿Está seguro que quiere anular el dígito  verificador ?',
            function(){
                
                ParametroGeneralService.update({valor,clave},{}, function (response) {
                $state.go('parametro-general', {
                }, {
                    reload: true
                });
                    AlertService.success("Se actualizo exitosamente la validación");
                }, function (err){
                    console.log(err);
                });
            }
            );
        }
    }
})();