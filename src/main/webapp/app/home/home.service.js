(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('HomeService', HomeService);

        HomeService.$inject = ['$resource', '$state'];

    function HomeService($resource, $state) {

        var service = $resource('/public-api', {}, {
            'getAllPrincipalCategory': {
                method: 'GET',
                url: 'public-api/categories',
                isArray: true
            },
            'getAllSubCategory': {
                method: 'GET',
                url: 'public-api/categories/:id',
                isArray: true
            }
                
        });

        return service;
    }
})();