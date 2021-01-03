(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    
    function stateConfig($stateProvider) {
        $stateProvider.state('pedido', {
            parent: 'app',
            url: '/solicitar-pedido',
            templateUrl: 'app/pedidos/solicitar-pedido.html',
            controller: 'SolicitarPedidoController',
            controllerAs: 'vm',
            data: {
                authorities: []
            },
            params: {
                user: null
            },        
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader',                                       
                    function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('home');
                        return $translate.refresh();
                    }
                ]
            }
        })
        .state('pedido-terminado', {
            parent: 'app',
            url: '/solicitar-pedido/finalizado',
            templateUrl: 'app/pedidos/mi-pedido/pedido-terminado.html',
            controller: 'PedidoTerminadoController',
            controllerAs: 'vm',
            data: {
                authorities: []
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('ver-mi-pedido', {
            parent: 'app',
            url: '/mi-pedido/:id',
            templateUrl: 'app/pedidos/mi-pedido/ver-mi-pedido.html',
            controller: 'VerPedidoController',
            controllerAs: 'vm',
            data: {
                authorities: []
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
    }   
})();
