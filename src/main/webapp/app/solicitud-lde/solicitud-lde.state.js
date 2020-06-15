(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('solicitud-lde', {
            url: '/solicitud-lde',
            parent: 'app',
            templateUrl: 'app/solicitud-lde/solicitud-lde-listar.html',
            controller: 'ListarSolicitudLdeController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_AGENTE_MARITIMO', 'ROLE_TERMINAL_PORTUARIA', 'ROLE_AUDITOR'],
                pageTitle: 'gestionLDE.home.title'
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('gestionLDE');
                    return $translate.refresh();
                }]
            }
        })
        .state('solicitud-lde.crear', {
            parent: 'solicitud-lde',
            url: '/create',
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_AGENTE_MARITIMO']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/solicitud-lde/solicitud-lde-create.html',
                    controller: 'CreateSolicitudLdeController',
                    controllerAs: 'vm',
                    size: 'lg',
                }).result.then(function () {
                    $state.go('solicitud-lde', null, {
                        reload: true
                    });
                }, function () {
                    $state.go('^');
                });
            }]
        })
        .state('solicitud-lde.editar', {
            parent: 'solicitud-lde',
            url: '/editar/:id',
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_AGENTE_MARITIMO']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/solicitud-lde/solicitud-lde-create.html',
                    controller: 'CreateSolicitudLdeController',
                    controllerAs: 'vm',
                    size: 'lg',
                }).result.then(function () {
                    $state.go('solicitud-lde', null, {
                        reload: true
                    });
                }, function () {
                    $state.go('^');
                });
            }]
        })
        .state('solicitud-lde.detalle', {
            parent: 'app',
            url: '/lde/detalle/:id',
            templateUrl: 'app/solicitud-lde/solicitud-lde-detail.html',
            controller: 'SolicitudLdeDetailController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_AGENTE_MARITIMO', 'ROLE_TERMINAL_PORTUARIA', 'ROLE_AUDITOR'],
                pageTitle: 'gestionLDE.home.title'
            }
        })
        .state('solicitud-lde.retirar', {
            parent: 'solicitud-lde',
            url: '/entregar-contenedor/:id',
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_AGENTE_MARITIMO']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/solicitud-lde/solicitud-lde-retirar-unit-dialog.html',
                    controller: 'SolicitudLdeRetirarUnitDialogController',
                    controllerAs: 'vm',
                    size: 'md',
                }).result.then(function () {
                    $state.go('solicitud-lde', null, {
                        reload: true
                    });
                }, function () {
                    $state.go('^');
                });
            }]
        })
    }
    
})();