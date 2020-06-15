(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ProductoAgregarController', ProductoAgregarController);

        ProductoAgregarController.$inject = ['ProductoService', 'TablaPaginada', 'AlertService', '$state','$stateParams'];

    function ProductoAgregarController(ProductoService, TablaPaginada, AlertService, $state, $stateParams) {
        var vm = this;
        vm.producto = null;


    }
})();