(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    
    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/',
            //templateUrl: 'app/home/home.html',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm',
            data: {
                authorities: []
            },            
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader',                                       
                    function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('home');
                        return $translate.refresh();
                    }
                ]
            }
        })
        .state('home.login', {
            parent: 'home',
            url: '/login',
            data: {
                authorities: []
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/components/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    size: 'lg',
                }).result.then(function() {
                    $state.go('home', null, { reload: true });
                }, function() {
                    $state.go('home');
                });
            }]
        });
    }   
})();
