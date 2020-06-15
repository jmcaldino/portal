(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('account', {
            abstract: true,
            url:'/account',
            parent: 'app',
            templateUrl:'app/layouts/templates/common-inner.html'
        })
        .state('account.password', {
            parent: 'account',
            url: '/password',
            data: {
                pageTitle: 'global.menu.account.password'
            },
            templateUrl: 'app/account/password/password.html',
            controller: 'PasswordController',
            controllerAs: 'vm',
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('password');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
