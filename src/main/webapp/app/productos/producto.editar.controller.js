(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('ProductoEditarController', ProductoEditarController);

        ProductoEditarController.$inject = ['ProductoService', 'TablaPaginada', 'AlertService', '$state','$stateParams', 'MarcaService', 'CategoryService', 'ConfirmModalService', 'multipartForm'];

    function ProductoEditarController(ProductoService, TablaPaginada, AlertService, $state, $stateParams, MarcaService, CategoryService, ConfirmModalService, multipartForm) {
        var vm = this;
        vm.clear = clear;
        vm.editImg = editImg;
        vm.selectedMarca = undefined;
        vm.selectedCategory = undefined;
        vm.editFile = false;
        vm.editCategory = false;
        vm.editMarca = false;

        ProductoService.get({
            name: $stateParams.name
        }, function (response) {
            vm.producto = response;
        });

        vm.isEnable = {};

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
            vm.response = {
                id: null, name: null, description: null, price: null, newPrice: null,
                stock: null, isNew: false, isRecommended: false, marcaId: null, categoriaId: null,
                file: [], isEnable: null
            };
        }

        function editImg () {
            vm.editFile = (vm.editFile) ? false : true;
        }

        vm.edit = function editarProducto() {
            ConfirmModalService.open('Editar producto','¿Está seguro que desea editar el producto '+vm.producto.name+'?',
            function(){
                vm.response = setResponse(vm.producto);
                if(vm.editFile && vm.producto.file){
                    vm.response.file = vm.producto.file;
                }
                var fd = new FormData();
                for(var key in vm.response){
                    if(key == "file"){
                        fd.append(key, vm.response[key]);
                    }
                    if(vm.response[key] !== null && vm.response[key] !== undefined)
                        fd.append(key, vm.response[key]);
                }
                ProductoService.editarProducto({}, fd).$promise.then(function (response) {
                    $state.go('producto', {
                    }, {
                        reload: true
                    });
                }).catch(function (err) {
                    self.newPostError = true;
                    throw err;
                });
            });
            function setResponse(prod) {
                return {
                    id: vm.producto.id, 
                    name: vm.producto.name,
                    description: vm.producto.description, 
                    price: vm.producto.price, 
                    newPrice: vm.producto.newPrice,
                    stock: vm.producto.stock, 
                    isNew: vm.producto.isNew, 
                    isRecommended: vm.producto.isRecommended,
                    marcaId: (vm.selectedMarca ? vm.selectedMarca.id : vm.producto.marca.id),
                    categoriaId: (vm.selectedCategory ? vm.selectedCategory.id : vm.producto.categoria.id),
                    isEnable: vm.producto.isEnable,
                    file: [] 
                };
            }
        }

    } 

})();