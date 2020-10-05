(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('producto', {
            url: '/listado-productos',
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
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('producto-editar', {
            parent: 'app',
            url: '/producto-listado/editar/:name',
            templateUrl: 'app/productos/producto-editar.html',
            controller: 'ProductoEditarController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_AUDITOR'],
                pageTitle: 'gestionLDE.home.title'
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });
    }
    
})();