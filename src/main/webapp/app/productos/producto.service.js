(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('ProductoService', ProductoService);

    ProductoService.$inject = ['$resource', '$state'];

    function ProductoService($resource, $state) {

        var service = $resource('/producto', {}, {
            'listar': {
                method: 'GET',
                url: 'api/productos'
            },
            'agregarProducto': {
                method: 'POST',
                url: 'api/productos'
            },
            'searchInmueble': {
                method: 'GET',
                url: 'api/inmuebles/search-inmueble'
            }
        });

        return service;
    }
})();