(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('InquilinoService', InquilinoService);

    InquilinoService.$inject = ['$resource', '$state'];

    function InquilinoService($resource, $state) {

        var service = $resource('/inquilino', {}, {
            'listar': {
                method: 'GET',
                url: 'api/inquilino/listar'
            }
                
        });

        return service;
    }
})();