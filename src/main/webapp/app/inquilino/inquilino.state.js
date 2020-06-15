(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('inquilino-listar', {
            url: '/inquilino-listado',
            parent: 'app',
            templateUrl: 'app/inquilino/inquilino-listar.html',
            controller: 'ListarInquilinoController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'gestionLDE.home.title'
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('inquilinos');
                    return $translate.refresh();
                }]
            }
        })
    }
    
})();