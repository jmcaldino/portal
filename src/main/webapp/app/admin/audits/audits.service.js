(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('AuditsService', AuditsService);

    AuditsService.$inject = ['$resource'];

    function AuditsService($resource) {
        var service = $resource('management/audits/:id', {}, {
            'get': {
                method: 'GET',
                isArray: true
            },
            'buscar': {
                method: 'POST',
                params: { username: null, categoria: null, fromDate: null, toDate: null },
                url: 'management/audits/buscar'
            }
        });

        return service;
    }
})();