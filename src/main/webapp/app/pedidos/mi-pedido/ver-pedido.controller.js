(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('VerPedidoController', VerPedidoController);

        VerPedidoController.$inject = ['$scope', 'AlertService', '$state', '$stateParams', '$timeout', 'SolicitarPedidoService'];

    function VerPedidoController($scope, AlertService , $state, $stateParams, $timeout, SolicitarPedidoService) {
        var vm = this;
        vm.pedido = {};

        SolicitarPedidoService.get({
            orderCode: $stateParams.id
        }, function (response) {
            vm.pedido = response;
        });

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