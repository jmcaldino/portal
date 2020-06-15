(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('jhi-health', {
            parent: 'admin',
            url: '/health',
            templateUrl: 'app/admin/health/health.html',
            controller: 'JhiHealthCheckController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN','ROLE_AUDITOR'],
                pageTitle: 'health.title'
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('health');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
