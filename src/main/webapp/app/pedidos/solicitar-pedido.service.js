(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('SolicitarPedidoService', SolicitarPedidoService);

        SolicitarPedidoService.$inject = ['$resource', '$state'];

    function SolicitarPedidoService($resource, $state) {

        var service = $resource('/public-api', {}, {
            'pedido': {
                method: 'POST',
                url: 'public-api/pedidos',
                isArray: false
            },
            'get': {
                method: 'GET',
                url: 'public-api/pedidos/:orderCode',
                isArray: false
            }
        });

        return service;
    }
})();