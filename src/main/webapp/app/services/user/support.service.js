(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('SupportService', SupportService);

    SupportService.$inject = ['$resource'];

    function SupportService($resource) {
        var service = $resource('api/support/', {}, {
            'getAuditPrefixs': {
                method: 'GET',
                url: 'api/support/prefijos-auditoria'
            }
        });

        return service;
    }
})();
