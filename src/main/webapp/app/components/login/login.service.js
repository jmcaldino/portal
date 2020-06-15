(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$uibModal'];

    function LoginService ($uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('login');
                        return $translate.refresh();
                    }]
                }
            }).result.then(function() {
                $state.go('home', null, { reload: true });
            }, function() {
                $state.go('^');
            });
        }
    }
})();
