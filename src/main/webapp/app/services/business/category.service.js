(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('CategoryService', CategoryService);

        CategoryService.$inject = ['$resource'];

    function CategoryService($resource) {
        var service = $resource('public-api/categories', {}, {
            'getAllCategory': {
                method: 'GET',
                url: 'public-api/categories',
                isArray: true
            },
            'getAllPrincipalCategory': {
                method: 'GET',
                url: 'public-api/categories/dad',
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