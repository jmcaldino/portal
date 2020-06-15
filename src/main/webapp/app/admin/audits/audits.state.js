(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('audits', {
            parent: 'admin',
            url: '/audits',
            templateUrl: 'app/admin/audits/audits.html',
            controller: 'AuditsController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN','ROLE_AUDITOR'],
                pageTitle: 'audits.title'
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('audits');
                    return $translate.refresh();
                }],
                prefixs: ['$log', 'SupportService', function ($log, SupportService) {
                    return SupportService.getAuditPrefixs().$promise;
                }]
            }
        });
    }
})();
