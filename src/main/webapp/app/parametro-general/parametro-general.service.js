(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('ParametroGeneralService', ParametroGeneralService);

    ParametroGeneralService.$inject = ['$resource', '$state'];

    function ParametroGeneralService($resource, $state) {

        var service = $resource('/parametro-general', {}, {
            'listar': {
                method: 'GET',
                url: '/api/parametro-general/listar'
            },
            'update': {
                method: 'PUT',
                url: '/api/parametro-general/:clave/:valor'
            },
                
        });

        return service;
    }
})();