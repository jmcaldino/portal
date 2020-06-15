(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ReciboDetailController', ReciboDetailController);

        ReciboDetailController.$inject = ['ReciboService', 'AlertService', '$state','$stateParams'];

    function ReciboDetailController(ReciboService, AlertService, $state, $stateParams) {
        var vm = this;

        vm.recibo = undefined;

        ReciboService.getById({
            id: $stateParams.id
        }, function (response) {
			vm.recibo = response;
        });

    }
})();