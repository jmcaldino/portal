(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('CarritoService', CarritoService);

        CarritoService.$inject = ['$resource', '$state'];

    function CarritoService($resource, $state) {

        var service = $resource('/public-api', {}, {
            'carrito': {
                method: 'GET',
                url: 'public-api/carrito/id/:id/action/:action',
                isArray: false
            },
            'getCarrito': {
                method: 'GET',
                url: 'public-api/carrito',
                isArray: false
            },
            'clearCart': {
                method: 'DELETE',
                url: 'public-api/carrito',
                isArray: false
            }
        });

        return service;
    }
})();