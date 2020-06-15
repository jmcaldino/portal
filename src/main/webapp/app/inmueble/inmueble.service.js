(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('InmuebleService', InmuebleService);

    InmuebleService.$inject = ['$resource', '$state'];

    function InmuebleService($resource, $state) {

        var service = $resource('/inmueble', {}, {
            'listar': {
                method: 'GET',
                url: 'api/inmuebles'
            },
            'getByIdAndType': {
                method: 'GET',
                url: 'api/inmuebles/id/:id/tipo/:tipo'
            },
            'searchInmueble': {
                method: 'GET',
                url: 'api/inmuebles/search-inmueble'
            }
        });

        return service;
    }
})();