(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('CarritoHeaderService', CarritoHeaderService);

    CarritoHeaderService.$inject = ['$rootScope', '$state', 'CarritoService'];

    function CarritoHeaderService ($rootScope, $state, CarritoService) {
        var service = {
            refreshProductosDestacados: revisarSiEstaEnCarrito
        };

        return service;

        function activateAccount (key, callback) {
            var cb = callback || angular.noop;

            return Activate.get(key,
                function (response) {
                    return cb(response);
                },
                function (err) {
                    return cb(err);
                }.bind(this)).$promise;
        }

        function revisarSiEstaEnCarrito(productosDestacados) {
            CarritoService.getCarrito({}, function (response) {
                var carrito = response;
                load(response.items, productosDestacados);
                document.getElementById("cantidadCarritoHead").innerHTML = (carrito.cantidad? carrito.cantidad : '0');
                return productosDestacados;
            }),
            function (err) {
                return cb(err);
            }
            function load (card, productosDestacados) {
                for (var i = 0; i < productosDestacados.length; i++) {
                    if(card){
                        for (var j = 0; j < card.length; j++) {
                            if(card[j].producto.id == productosDestacados[i].id){
                                productosDestacados[i].isExistInCard=true;
                                productosDestacados[i].isExistInCardCount=card[j].cantidad;
                                break;
                            }
                        }
                    }else{
                        break;
                    }
                }
            }
        };

    }
})();
