(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('recibo-listar', {
            url: '/recibo-listado',
            parent: 'app',
            templateUrl: 'app/recibo/recibo-listar.html',
            controller: 'ListarReciboController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'gestionLDE.home.title'
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('recibos');
                    return $translate.refresh();
                }]
            }
        })
        .state('recibo-detalle', {
            parent: 'app',
            url: '/recibo/detalle/:id',
            templateUrl: 'app/recibo/recibo-detail.html',
            controller: 'ReciboDetailController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'gestionLDE.home.title'
            }
        })
    }
    
})();