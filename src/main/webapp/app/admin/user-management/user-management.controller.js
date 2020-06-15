(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('UserManagementController', UserManagementController);

    UserManagementController.$inject = ['Principal', 'User', 'ParseLinks', 'AlertService', '$state', 'pagingParams', 'paginationConstants', 'JhiLanguageService','ngTableParams', '$filter', 'ConfirmModalService' , 'TablaPaginada'];

    function UserManagementController(Principal, User, ParseLinks, AlertService, $state, pagingParams, paginationConstants, JhiLanguageService, ngTableParams, $filter, ConfirmModalService, TablaPaginada) {
        var vm = this;

        vm.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        vm.currentAccount = null;
        vm.languages = null;
        vm.setActive = setActive;
        vm.users = [];
        vm.tableSorting = null;
        vm.page = 1;
        vm.totalItems = null;
        vm.clear = clear;
        vm.links = null;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.role = undefined;

        

        var params = {
            resourceMethod: User.listar,
            config: {
                defaultSort: 'id,desc'
            }
        };

        vm.tableSorting = TablaPaginada.create(params);

        JhiLanguageService.getAll().then(function (languages) {
            vm.languages = languages;
        });
        Principal.identity().then(function(account) {
            vm.currentAccount = account;
        });

        
        function setActive (user, isActivated) {
            ConfirmModalService.open('Cambiar Estado del usuario','¿Está seguro que desea cambiar el estado del usuario '+user.login+'?',
            function(){
            user.activated = isActivated;
            User.update(user, function () {
                vm.clear();
            },
            function (err){
                vm.setActive = false;
                console.log(err);
            });
        });
        }

        function onError(error) {
            AlertService.error(error.data.message);
        }

        function clear () {
            vm.user = {
                id: null, login: null, firstName: null, lastName: null, email: null,
                activated: null, terminal: null, langKey: null, createdBy: null, createdDate: null,
                lastModifiedBy: null, lastModifiedDate: null, resetDate: null,
                resetKey: null, authorities: null
            };
        }

        vm.buscar = function buscar() {
            var params = {
                stateParams: {
                    user: vm.buscarUsuario
                },
                resourceMethod: User.buscarUsuario,
                config: {
                    defaultSort: 'id,desc'
                }
            };
            vm.tableSorting = TablaPaginada.create(params);
        }

       
    }
})();
