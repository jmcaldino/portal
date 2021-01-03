(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('pedidos', {
            url: '/ordenes/listado',
            parent: 'app',
            templateUrl: 'app/pedidos-admin/listar-pedidos.html',
            controller: 'ListarPedidoController',
            controllerAs: 'vm',
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('inquilinos');
                    return $translate.refresh();
                }]
            }
        }),
        $stateProvider.state('pedido-editar', {
            url: '/ordenes/listado/editar/:codigo',
            parent: 'app',
            templateUrl: 'app/pedidos-admin/editar-pedido.html',
            controller: 'EditarPedidoController',
            controllerAs: 'vm',
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('inquilinos');
                    return $translate.refresh();
                }]
            }
        });
    }
    
})();