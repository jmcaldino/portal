(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ProductoAgregarController', ProductoAgregarController);

        ProductoAgregarController.$inject = ['ProductoService', 'TablaPaginada', 'AlertService', '$state','$stateParams'];

    function ProductoAgregarController(ProductoService, TablaPaginada, AlertService, $state, $stateParams) {
        var vm = this;
        vm.clear = clear;
        vm.producto = {
                id: null, name: null, description: null, price: null, newPrice: null,
                stock: null, isNew: null, isRecommended: null, marcaId: null, categoriaId: null,
                img: null, isEnable: null
            };
        vm.opcionesTerminal = ['BACTSSA', 'TERMINAL4', 'TRP', 'EXOLGAN'];
        vm.arrayBl = [
            {id: '1', name: 'Todos'},
            {id: '2', name: 'Objeto1'},
            {id: '3', name: 'Objeto2'},
            {id: '4', name: 'escoba'},
          ];

        
        vm.estadoFiltro = {
            availableOptions: [
                {id: '1', name: 'menu'},
                {id: '2', name: 'Objeto1'},
                {id: '3', name: 'Objeto2'},
                {id: '4', name: 'escoba'},
            ],
            selectedOption: {id: undefined, name: undefined} //This sets the default value of the select in the ui
        };

        function clear () {
            vm.producto = {
                id: null, name: null, description: null, price: null, newPrice: null,
                stock: null, isNew: null, isRecommended: null, marcaId: null, categoriaId: null,
                img: null, isEnable: null
            };
        }

        vm.save = function agregarProducto() {
            ConfirmModalService.open('Agregar nuevo producto','¿Está seguro que desea cambiar el producto '+producto.name+'?',
            function(){
                ProductoService.update(user, function () {
                    vm.clear();
                },
                function (err){
                    console.log(err);
                });
            });
        }

        vm.agregarBL = function agregarBL () {
            if(vm.bl != "" && !vm.arrayBl.includes(vm.bl)){
                vm.arrayBl.push(vm.bl);
                vm.bl = "";
            }
        }

    }

    angular
    .module('gestionFlia')
    .directive('maxlen', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
              var $uiSelect = angular.element(element[0].querySelector('.ui-select-search'));
              $uiSelect.attr("maxlength", attr.maxlen);
            }
          }
    });

})();