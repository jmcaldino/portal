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
            'actualizarProducto': {
                method: 'PUT',
                url: 'api/productos'
            },
            'crearProducto': {
                method: 'POST',
                url: 'api/productos',
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            },
            'searchInmueble': {
                method: 'GET',
                url: 'api/inmuebles/search-inmueble'
            }
        });

        return service;
    }
})();