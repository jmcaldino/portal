(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('UserManagementDialogController',UserManagementDialogController);

    UserManagementDialogController.$inject = ['$stateParams', '$uibModalInstance', 'entity', 'User', 'JhiLanguageService'];

    function UserManagementDialogController ($stateParams, $uibModalInstance, entity, User, JhiLanguageService) {
        var vm = this;

        vm.authorities = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_NUEVO', 'ROLE_AUDITOR'];
        vm.clear = clear;
        vm.languages = null;
        vm.save = save;
        vm.user = entity;
        vm.editar= angular.copy(vm.user.login);

        vm.esTerminal = false;

        JhiLanguageService.getAll().then(function (languages) {
            vm.languages = languages;
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function onSaveSuccess (result) {
            vm.isSaving = false;
            $uibModalInstance.close(result);
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        function save () {
            vm.isSaving = true;
            if(vm.esTerminal){
                vm.user.terminal = vm.estadoFiltro.selectedOption.name;
            }
            if (vm.user.id !== null) {
                User.update(vm.user, onSaveSuccess, onSaveError);
            } else {
                User.save(vm.user, onSaveSuccess, onSaveError);
            }
        }

        vm.opcionesTerminal = ['BACTSSA', 'TERMINAL4', 'TRP', 'EXOLGAN']
        
        vm.estadoFiltro = {
            availableOptions: [
              {id: '1', name: 'BACTSSA'},
              {id: '2', name: 'TERMINAL4'},
              {id: '3', name: 'TRP'},
              {id: '4', name: 'EXOLGAN'}
            ],
            selectedOption: {id: undefined, name: undefined} //This sets the default value of the select in the ui
        };

        vm.validarRole = function roleTermianl(){
            for ( var index = 0; index < vm.user.authorities.length; index++) {
                if ('ROLE_TERMINAL_PORTUARIA' == vm.user.authorities[index]) {
                    vm.esTerminal = true;
                    return true;
                }
            }
            vm.esTerminal= false;
            return false;
            
        }
    }
})();
