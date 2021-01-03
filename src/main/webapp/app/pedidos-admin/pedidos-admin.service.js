(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('SolicitarPedidoAdminService', SolicitarPedidoAdminService);

        SolicitarPedidoAdminService.$inject = ['$resource', '$state'];

    function SolicitarPedidoAdminService($resource, $state) {

        var service = $resource('/api', {}, {
            'listado': {
                method: 'GET',
                url: 'api/ordenes'
            },
            'editar': {
                method: 'PUT',
                url: 'api/ordenes/:codigo'
            }
        });

        return service;
    }
})();