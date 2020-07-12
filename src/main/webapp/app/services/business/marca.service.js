(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('MarcaService', MarcaService);

    MarcaService.$inject = ['$resource'];

    function MarcaService($resource) {
        var service = $resource('public-api/marcas', {}, {
            'getMarks': {
                method: 'GET',
                url: 'public-api/marcas',
                isArray: true
            }
        });

        return service;
    }
})();