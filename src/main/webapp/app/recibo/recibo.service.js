(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('ReciboService', ReciboService);

    ReciboService.$inject = ['$resource', '$state'];

    function ReciboService($resource, $state) {

        var service = $resource('/recibo', {}, {
            'listar': {
                method: 'GET',
                url: 'api/recibo/listar'
            },
            'getById': {
                method: 'GET',
                url: 'api/recibo/:id'
            }
                
        });

        return service;
    }
})();