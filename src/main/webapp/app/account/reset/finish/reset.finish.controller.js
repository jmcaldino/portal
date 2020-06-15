(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ResetFinishController', ResetFinishController);

    ResetFinishController.$inject = ['$stateParams', '$timeout', 'Auth','$state'];

    function ResetFinishController ($stateParams, $timeout, Auth, $state) {
        var vm = this;

        vm.keyMissing = angular.isUndefined($stateParams.key);
        angular.element("body").addClass("login");
        vm.confirmPassword = null;
        vm.doNotMatch = null;
        vm.error = null;
        vm.finishReset = finishReset;
        vm.resetAccount = {};
        vm.success = null;

        vm.login = function login(){
            $state.go('login-customer', {
            }, {
                reload: true
            });
        }

        $timeout(function (){angular.element('#password').focus();});

        function finishReset() {
            vm.doNotMatch = null;
            vm.error = null;
            if (vm.resetAccount.password !== vm.confirmPassword) {
                vm.doNotMatch = 'ERROR';
            } else {
                Auth.resetPasswordFinish({key: $stateParams.key, newPassword: vm.resetAccount.password}).then(function () {
                    vm.success = 'OK';
                }).catch(function () {
                    vm.success = null;
                    vm.error = 'ERROR';
                });
            }
        }
    }
})();
