(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('producto', {
            url: '/producto-listado',
            parent: 'app',
            templateUrl: 'app/productos/producto-listar.html',
            controller: 'ListarProductoController',
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
        .state('producto-agregar', {
            parent: 'app',
            url: '/producto-listado/agregar',
            templateUrl: 'app/productos/producto-agregar.html',
            controller: 'ProductoAgregarController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'gestionLDE.home.title'
            }
        })
    }
    
})();