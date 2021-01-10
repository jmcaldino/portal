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
                url: 'public-api/categories/dad',
                isArray: true
            },
            'getAllSubCategory': {
                method: 'GET',
                url: 'public-api/categories/:id',
                isArray: true
            },
            'getAllDestacadosProduct': {
                method: 'GET',
                url: 'public-api/productos/destacados',
                isArray: false
            },
            'getAllProductByCategory': {
                method: 'GET',
                url: 'public-api/productos/category/:category',
                isArray: false
            },
            'searchProduct': {
                method: 'GET',
                url: 'public-api/productos/search/keyword/:keyword',
                isArray: false
            },
            'getAllRecommendedProduct': {
                method: 'GET',
                url: 'public-api/productos/recomendados',
                isArray: true
            },
                
        });

        return service;
    }
})();