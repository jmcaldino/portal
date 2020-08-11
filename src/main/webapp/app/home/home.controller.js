(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('HomeController', HomeController);

        HomeController.$inject = ['HomeService', 'AlertService','Auth' ,'$state','$stateParams', 'LoginService'];

    function HomeController(HomeService, AlertService, Auth, $state, $stateParams, LoginService) {
        var vm = this;

        vm.principalCategories = [];
        vm.subCategories = undefined;
        vm.productosDestacados = {};

        
        HomeService.getAllRecommendedProduct({
        },  function (response) {
			    vm.productosDestacados = response.content;
        });

        HomeService.getAllPrincipalCategory({
        },  function (response) {
			    vm.principalCategories = response;
        });

        vm.desplegarSubCategoria = function desplegarSubCategoria(id) {
            HomeService.getAllSubCategory({
                id: id
            }, function (response) {
                vm.subCategories = response;
            }),
            function (err) {
                return cb(err);
            }.bind(this).$promise;
        }

        vm.getLogin = LoginService.open;

        vm.logout = Auth.logout();

    }
})();