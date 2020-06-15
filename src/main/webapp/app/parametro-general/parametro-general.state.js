(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('parametro-general', {
            url: '/parametro-general',
            parent: 'app',
            templateUrl: 'app/parametro-general/parametro-general.html',
            controller: 'ParametroGeneralController',
            controllerAs: 'vm',
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_AUDITOR'],
                pageTitle: 'gestionLDE.home.title'
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('gestionLDE');
                    return $translate.refresh();
                }]
            }
        })
    }
    
})();