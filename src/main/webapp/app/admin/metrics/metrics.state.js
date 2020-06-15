(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('jhi-metrics', {
            parent: 'admin',
            url: '/metrics',
            templateUrl: 'app/admin/metrics/metrics.html',
            controller: 'JhiMetricsMonitoringController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_AUDITOR'],
                pageTitle: 'metrics.title'
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('metrics');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
