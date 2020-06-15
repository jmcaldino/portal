(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .controller('CreateSolicitudLdeController', CreateSolicitudLdeController);

    CreateSolicitudLdeController.$inject = ['SolicitudLdeService', '$uibModalInstance', 'AlertService', '$state','$stateParams'];

    function CreateSolicitudLdeController(SolicitudLdeService, $uibModalInstance, AlertService, $state, $stateParams) {
        var vm = this;
        vm.clear = clear;
        vm.load = load();
        vm.errorDigit = true;
        vm.bl = undefined;
        vm.arrayBl = [];

        vm.editar = ($stateParams.id)?$stateParams.id: null;

        vm.save = function save () {
            vm.isSaving = true;
            if (vm.editar !== null && vm.editar !== undefined) {
                this.cambiarLde();
            } else {
                this.createLde();
            }
        }

        vm.agregarBL = function agregarBL () {
            if(vm.bl != "" && !vm.arrayBl.includes(vm.bl)){
                vm.arrayBl.push(vm.bl);
                vm.bl = "";
            }
        }

        function load() {
            if($stateParams.id !== null && $stateParams.id !== undefined){
                SolicitudLdeService.getById({
                    id: $stateParams.id
                }, function (response) {
                    vm.solicitudLde = response;
                    vm.lde.contenedor = vm.solicitudLde.lde.contenedor.nbr;
                    vm.lde.terminal = vm.solicitudLde.lde.terminal;
                    vm.lde.lineaNaviera = vm.solicitudLde.lde.lineaNaviera;
                    vm.lde.buque = vm.solicitudLde.lde.buque;
                    vm.lde.viaje = vm.solicitudLde.lde.viaje;
                    // vm.lde.bl = vm.solicitudLde.lde.bls[0];
                    vm.lde.fecha_dev = vm.solicitudLde.lde.fecha_dev;
                    vm.lde.lugar_dev = vm.solicitudLde.lde.lugar_dev;
                    vm.lde.cuit = vm.solicitudLde.lde.cuit;
                    vm.arrayBl = vm.solicitudLde.lde.bls;
                });
            }
        }

        vm.lde = {
            "terminal": undefined,
            "lineaNaviera": undefined,
            "buque": undefined,
            "viaje": undefined,
            "contenedor": undefined,
            "bl": [],
            "fecha_dev": new Date(),
            "lugar_dev": undefined,
            "cuit": undefined
        };

        vm.editarLugarDev = {
            "contenedor": undefined,
            "viaje": undefined,
            "newPlace": undefined
            
        };

        vm.opcionesTerminal = ['BACTSSA', 'TERMINAL4', 'TRP', 'EXOLGAN'];
    
        vm.estadoFiltro = {
            availableOptions: [
              {id: '1', name: 'BACTSSA'},
              {id: '2', name: 'TERMINAL4'},
              {id: '3', name: 'TRP'},
              {id: '4', name: 'EXOLGAN'}
            ],
            selectedOption: {id: undefined, name: undefined} //This sets the default value of the select in the ui
        };

        vm.regex='[a-zA-Z]{4}?\\d{7}$';

        vm.createLde = function createLde() {
            vm.lde.fecha_dev = vm.fechadevolucion.hasta.model;
            vm.lde.terminal = vm.estadoFiltro.selectedOption.name;
            vm.lde.bl = vm.arrayBl;
            if (vm.arrayBl.length < 1){
                vm.vari = true;
            }else{
                SolicitudLdeService.crear(vm.lde, function (response) {
                    $state.go('solicitud-lde', {
                    }, {
                        reload: true
                    });
                    AlertService.success("Se creo exitosamente el libre de deuda");
                    $uibModalInstance.close();
                }, function (err){
                    console.log(err);
                });
            }
        }

        vm.cambiarLde = function cambiarLde() {
            vm.editarLugarDev.contenedor = vm.lde.contenedor;
            vm.editarLugarDev.viaje = vm.lde.viaje;
            vm.editarLugarDev.newPlace = vm.lde.lugar_dev;
            SolicitudLdeService.cambiarLugarDev(vm.editarLugarDev, function (response) {
                $state.go('solicitud-lde', {
                }, {
                    reload: true
                });
                AlertService.success("Se actualizo exitosamente el libre de deuda");
                $uibModalInstance.close();
            }, function (err){
                console.log(err);
            });
        }


        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        vm.fechadevolucion = {
            hasta: {
                model: new Date(),
                open: function () {
                    this.opened = true;
                },
                opened: false,
                options: {
                    minDate: undefined,
                    showWeeks: false
                }
            }
        }

        vm.nuevaVal = function () {
            if(vm.lde.contenedor.length == 11){
                SolicitudLdeService.verificar({cod: vm.lde.contenedor} , function(response){
                    vm.errorDigit =  (response.data) ? true : false;
                }, function (err){
                    console.log(err);
                });
            }
        }

    }

    angular
    .module('gestionFlia')
    .directive('cuitValidate', function() {
        return {
          require: 'ngModel',
          link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                value = value.replace("/[^\\d]/g", "");
                console.log(value);
                if(value.length != 11) {
                    mCtrl.$setValidity('cuitFormat', false);
                    return value;
                }
                
                var acumulado   = 0;
                var digitos     = value.split("");
                var digito      = digitos.pop();
        
                for(var i = 0; i < digitos.length; i++) {
                    acumulado += digitos[9 - i] * (2 + (i % 6));
                }
        
                var verif = 11 - (acumulado % 11);
                if(verif == 11) {
                    verif = 0;
                } else if(verif == 10) {
                    verif = 9;
                }
        
                if(digito == verif){
                    mCtrl.$setValidity('cuitFormat', true);
                } else {
                    mCtrl.$setValidity('cuitFormat', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);         
          }
        };
      });
})();