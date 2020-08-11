(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ListarProductoController', ListarProductoController);

        ListarProductoController.$inject = ['ProductoService', 'TablaPaginada', 'AlertService', '$state','$stateParams','ConfirmModalService'];

    function ListarProductoController(ProductoService, TablaPaginada, AlertService, $state, $stateParams, ConfirmModalService) {
        var vm = this;
        vm.buscarInmueble = null;

        var params = {
            resourceMethod: ProductoService.listar,
            config: {
                defaultSort: 'id,desc'
            }
        };

        vm.tableSorting = TablaPaginada.create(params);

        vm.estadoFiltro = {
            availableOptions: [
              {id: '1', name: 'Todos'},
              {id: '2', name: 'Recomendados'},
              {id: '3', name: 'Publicados'},
              {id: '4', name: 'Con poco stock'},
            ],
            selectedOption: {id: '1', name: 'Todos'} //This sets the default value of the select in the ui
        };

        vm.buscar = function buscar() {
            if(vm.estadoFiltro.selectedOption.name == 'Todos'){
                vm.estadoFiltro.selectedOption.name = null;
            }
            var params = {
                stateParams: {
                    palabra: vm.buscarInmueble,
                    tipo: vm.estadoFiltro.selectedOption.name
                },
                resourceMethod: InmuebleService.searchInmueble,
                config: {
                    defaultSort: 'id,desc'
                }
            };
            vm.tableSorting = TablaPaginada.create(params);
        }


        vm.deleteProduct = function eliminarProducto(nameParam) {
            ConfirmModalService.open('Eliminar producto','¿Está seguro que desea eliminar el producto '+nameParam+'?',
            function(){
                ProductoService.delete({
                    name: nameParam
                }, function (response) {
                    vm.producto = response;
                });
                $state.go('producto', {
                    }, {
                        reload: true
                });
            });
        }

    }
})();