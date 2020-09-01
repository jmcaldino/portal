(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ProductoAgregarController', ProductoAgregarController);

        ProductoAgregarController.$inject = ['ProductoService','TablaPaginada', 'AlertService', '$state','$stateParams', 'MarcaService', 'CategoryService', 'ConfirmModalService', 'multipartForm'];

    function ProductoAgregarController(ProductoService, TablaPaginada, AlertService, $state, $stateParams, MarcaService, CategoryService, ConfirmModalService, multipartForm) {
        var vm = this;
        vm.clear = clear;
        vm.selectedMarca = undefined;
        vm.selectedCategory = undefined;
        vm.producto = {
            id: null, name: null, description: null, price: null, newPrice: null,
            stock: null, isNew: false, isRecommended: false, marcaId: null, categoriaId: null,
            file: [], isEnable: null
        };

        vm.isEnable = {};
        vm.access = [
            { name: 'Si', value: 'true', },
            { name: 'No', value: 'false'},
        ];

        vm.isEnable.selected = vm.access[0] //here you can set the item selected

        vm.doMarcaSearch = function (value) {
            return MarcaService.getMarks({}).$promise.then(function (marks) {
                return filter(marks);
            });
            function filter(marks) {
                var filtrados = [];
                angular.forEach(marks, function (mark) {
                        filtrados.push(mark);
                })
                return filtrados;
            }

        };

        vm.doCategorySearch = function (value) {
            return CategoryService.getAllCategory({}).$promise.then(function (responseCategories) {
                return filter(responseCategories);
            });
            function filter(categories) {
                var response = [];
                angular.forEach(categories, function (category) {
                    response.push(category);
                })
                return response;
            }

        };

        function clear () {
            vm.producto = {
                id: null, name: null, description: null, price: null, newPrice: null,
                stock: null, isNew: false, isRecommended: false, marcaId: null, categoriaId: null,
                file: [], isEnable: null
            };
        }

        vm.saveFirst = function agregarProducto() {
            ConfirmModalService.open('Agregar nuevo producto','¿Está seguro que desea crear el producto '+vm.producto.name+'?',
            function(){
                vm.producto.marcaId = vm.selectedMarca.id;
                vm.producto.categoriaId = vm.selectedCategory.id;
                vm.producto.isEnable = vm.isEnable.selected.value;
                ProductoService.agregarProducto(vm.producto, function () {
                    vm.clear();
                    $state.go('producto', {
                    }, {
                        reload: true
                    });
                },
                function (err){
                    console.log(err);
                });
            });
        }

        vm.save = function agregarProducto() {
            ConfirmModalService.open('Agregar nuevo producto','¿Está seguro que desea crear el producto '+vm.producto.name+'?',
            function(){
                vm.producto.marcaId = vm.selectedMarca.id;
                vm.producto.categoriaId = vm.selectedCategory.id;
                vm.producto.isEnable = vm.isEnable.selected.value;
                var fd = new FormData();
                for(var key in vm.producto){
                    if(key == "file"){
                        fd.append(key, vm.producto[key]);
                    }
                    if(vm.producto[key] !== null && vm.producto[key] !== undefined)
                        fd.append(key, vm.producto[key]);
                }
                ProductoService.crearProducto({}, fd).$promise.then(function (response) {
                    vm.clear();
                    $state.go('producto', {
                    }, {
                        reload: true
                    });
                }).catch(function (err) {
                    self.newPostError = true;
                    throw err;
                });
            });
        }

    } 

})();