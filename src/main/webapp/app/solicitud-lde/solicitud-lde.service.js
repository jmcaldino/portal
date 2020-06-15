(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('SolicitudLdeService', SolicitudLdeService);

    SolicitudLdeService.$inject = ['$resource', '$state'];

    function SolicitudLdeService($resource, $state) {

        var service = $resource('/lde', {}, {
            'listar': {
                method: 'GET',
                url: '/lde/listar'
            },
            'verificar': {
                method: 'GET',
                url: '/lde/verificar/:cod'
            },
            'getById': {
                method: 'GET',
                url: '/lde/:id'
            },
            'crear': {
                method: 'POST',
                url: '/lde'
            },
            'anular': {
                method: 'PUT',
                url: '/lde/disable'
                },
            'habilitar': {
                method: 'PUT',
                url: '/lde/enable'
            },
            'retirar': {
                method: 'PUT',
                url: '/lde/invoice'
            },
            'buscarSolLde': {
                method: 'GET',
                url: '/lde/buscar/:estado'
            },
            'cambiarLugarDev': {
                method: 'PUT',
                url: '/lde/lugar'
            }
                
        });

        return service;
    }
})();