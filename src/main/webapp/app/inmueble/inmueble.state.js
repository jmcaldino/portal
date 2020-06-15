(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('inmueble', {
            url: '/inmueble-listado',
            parent: 'app',
            templateUrl: 'app/inmueble/inmueble-listar.html',
            controller: 'ListarInmuebleController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'gestionLDE.home.title'
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('inquilinos');
                    return $translate.refresh();
                }]
            }
        })
        .state('inmueble.detalle', {
            parent: 'app',
            url: '/inmueble/detalle/:id/:tipo',
            templateUrl: 'app/inmueble/inmueble-detail.html',
            controller: 'InmuebleDetailController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'gestionLDE.home.title'
            }
        })
    }
    
})();