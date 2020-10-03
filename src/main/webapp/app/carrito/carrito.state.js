(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    
    function stateConfig($stateProvider) {
        $stateProvider.state('cart', {
            parent: 'app',
            url: '/carrito',
            templateUrl: 'app/carrito/carrito.html',
            controller: 'CartController',
            controllerAs: 'vm',
            data: {
                authorities: []
            },
            params: {
                id: null
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
    }
})();
