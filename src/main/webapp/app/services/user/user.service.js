(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('User', User);

    User.$inject = ['$resource'];

    function User ($resource) {
        var service = $resource('api/users/:login', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'},
            'listar':{ 
                method:'GET',
                url: '/api/users/listar'
            },
            'buscarUsuario': {
                method: 'GET',
                url: '/api/users/search-user'
            },
        });

        return service;
    }
})();
