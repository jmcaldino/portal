(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('login-customer', {
            url: '/',
            parent: 'app',
            templateUrl: 'app/components/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            data: {
                authorities: []
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
    }
    
})();