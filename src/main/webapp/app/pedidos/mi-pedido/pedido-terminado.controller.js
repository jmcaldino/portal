(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('PedidoTerminadoController', PedidoTerminadoController);

        PedidoTerminadoController.$inject = ['$scope', 'AlertService', '$state', '$stateParams'];

    function PedidoTerminadoController($scope, AlertService , $state, $stateParams) {
        var vm = this;
        vm.pedido = {};

        vm.refresh = function refresh() {
            //$state.reload();
            $state.go('home.calmar', {
                page: $scope.currentPage
            }, {
                reload: true
            });
        }
    }
})();