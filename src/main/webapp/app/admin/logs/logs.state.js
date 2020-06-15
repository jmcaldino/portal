(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('logs', {
            parent: 'admin',
            url: '/logs',
            templateUrl: 'app/admin/logs/logs.html',
            controller: 'LogsController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_AUDITOR'],
                pageTitle: 'logs.title'
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('logs');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
