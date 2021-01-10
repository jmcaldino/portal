(function() {
    'use strict';

    angular
    .module('gestionFlia',["ui.router"])
    .config(stateConfig);

    stateConfig.$inject = ['$stateProvider','$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
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
        })
        .state('home.calmar', {
            parent: 'app',
            url: '/producto-listado?page',
            data: {
                authorities: []
            },
            params: {
                page: null
            },
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .state('home.category', {
            parent: 'app',
            url: '/producto-listado/categoria/:name?page',
            data: {
                authorities: []
            },
            params: {
                name: null,
                page: null
            },
            templateUrl: 'app/home/home.html',
            controller: 'CategoryController',
            controllerAs: 'vm'
        })
        .state('home.search', {
            parent: 'app',
            url: '/producto-listado/buscar/:keyword?page',
            data: {
                authorities: []
            },
            params: {
                keyword: null,
                page: null
            },
            templateUrl: 'app/home/home.html',
            controller: 'SearchController',
            controllerAs: 'vm'
        });
    } 
})();
