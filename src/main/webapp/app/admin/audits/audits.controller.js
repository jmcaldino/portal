(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('AuditsController', AuditsController);

    AuditsController.$inject = ['$scope', '$filter', 'AuditsService', 'ParseLinks', 'TablaPaginada', 'prefixs'];

    function AuditsController($scope, $filter, AuditsService, ParseLinks, TablaPaginada, prefixs) {
        var vm = this;

        vm.audits = null;
        vm.links = null;
        vm.loadPage = loadPage;
        vm.onChangeFilter = onChangeFilter;
        vm.page = 1;
        vm.previousMonth = previousMonth;
        vm.today = today;
        vm.totalItems = null;
        vm.user = null;
        vm.category = 'N/A';
        vm.filter = {
            desde: {
                model: new Date(),
                open: function () {
                    this.opened = true;
                },
                opened: false,
                options: {
                    minDate: undefined,
                    showWeeks: false
                }
            },
            hasta: {
                model: new Date(),
                open: function () {
                    this.opened = true;
                },
                opened: false,
                options: {
                    maxDate: new Date,
                    showWeeks: false
                }
            }

        };

        $scope.$watch('vm.filter.desde.model', function () {
            vm.filter.hasta.options.minDate = vm.filter.desde.model;
            /*            if (vm.filter.hasta.model < vm.filter.desde.model) {
                            vm.filter.hasta.model = vm.filter.desde.model;
                        }*/

        });

        vm.categories = [{ id: 'N/A', display: 'Todas' }];
        for (var key in prefixs.toJSON()) {
            vm.categories.push({ id: key, display: prefixs[key] });
        }

        vm.today();
        vm.previousMonth();
        vm.onChangeFilter();

        function onChangeFilter() {
            var dateFormat = 'yyyy-MM-dd';
            var fromDate = $filter('date')(vm.filter.desde.model, dateFormat);
            var toDate = $filter('date')(vm.filter.hasta.model, dateFormat);

            var login = vm.user ? vm.user : null;
            var category = vm.category && vm.category != 'N/A' ? vm.category : null;

            var params = {
                resourceMethod: AuditsService.buscar,
                postParams: {
                    categoria: category,
                    username: login,
                    fromDate: fromDate,
                    toDate: toDate
                },
                config: {
                    defaultSort: 'auditEventDate,asc'
                }
            };

            vm.tableSorting = TablaPaginada.create(params);

        }

        // Date picker configuration
        function today() {
            // Today + 1 day - needed if the current day must be included
            var today = new Date();
            vm.toDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        }

        function previousMonth() {
            var fromDate = new Date();
            if (fromDate.getMonth() === 0) {
                fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
            } else {
                fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
            }

            vm.fromDate = fromDate;
        }

        function loadPage(page) {
            vm.page = page;
            vm.onChangeFilter();
        }
    }
})();