(function() {
    'use strict';

    // =========================================================================
    // Layout - Base controller for common functions
    // =========================================================================
    angular
        .module('gestionFlia')
        .controller('ContextController', ContextController);
    
    ContextController.$inject = ['$timeout', '$state', '$stateParams', '$scope', 'Auth', 'Principal', 'ProfileService'];
    
    function ContextController ($timeout, $state, $stateParams, $scope, Auth, Principal, ProfileService) {
    	angular.element('body').removeClass('login');
        var ctx = this;
        
        // Detact Mobile Browser
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
           angular.element('html').addClass('ismobile');
        }

        // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
        ctx.sidebarToggle = {
            left: false,
            right: false
        }

        // By default template has a boxed layout
        ctx.layoutType = localStorage.getItem('ma-layout-status');
                
        // For Mainmenu Active Class
        ctx.$state = $state;    
        
        //Close sidebar on click
        ctx.sidebarStat = function(event) {
            if (!angular.element(event.target).parent().hasClass('active')) {
                this.sidebarToggle.left = false;
            }
        }
        
        //Listview Search (Check listview pages)
        ctx.listviewSearchStat = false;
        
        ctx.lvSearch = function() {
            this.listviewSearchStat = true; 
        }
        
        //Listview menu toggle in small screens
        ctx.lvMenuStat = false;
        
        //Blog
        ctx.wallCommenting = [];
        
        ctx.wallImage = false;
        ctx.wallVideo = false;
        ctx.wallLink = false;

        //Skin Switch
        ctx.currentSkin = 'blueCalmar';

        ctx.skinList = [
            'lightblue',
            'bluegray',
            'cyan',
            'teal',
            'green',
            'orange',
            'blue',
            'purple'
        ]

        ctx.skinSwitch = function (color) {
            this.currentSkin = color;
        }              

        // Context Params
        ctx.params = $stateParams;
        
        // Current User Functions
        ctx.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function(response) {
            ctx.inProduction = response.inProduction;
            ctx.swaggerEnabled = response.swaggerEnabled;
        });
        
        ctx.logout = logout;

        function logout() {
            Auth.logout();
        }
        
        ctx.account = null;
        
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                ctx.account = account;
                ctx.isAuthenticated = Principal.isAuthenticated;
            });
        }
    };
    
    // =========================================================================
    // Header 
    // =========================================================================
    angular
        .module('gestionFlia')
        .controller('HeaderController', HeaderController);
    
    HeaderController.$inject = ['$timeout','HomeService','$state', 'CarritoService'];
    
    function HeaderController ($timeout, HomeService, $state, CarritoService) {
        var vm = this;
        vm.carritoHead = undefined;

        CarritoService.getCarrito({}, function (response) {
            vm.carritoHead = response;
            if(vm.carritoHead && vm.carritoHead.total > 0){
                document.getElementById("cantidadCarritoHead").innerHTML = vm.carritoHead.cantidad;
                angular.element('#btnComprar').removeClass('disabled');
                angular.element('#carritoBtn').addClass('dropdown open');
                $timeout(function(e){
                        angular.element('#carritoBtn').removeClass('open');
                      }, 3000);
            } else{
                angular.element('#btnComprar').addClass('disabled');
            }
            //document.getElementById("cantidadCarritoHead").innerHTML = (vm.carritoHead.cantidad? vm.carritoHead.cantidad : '0');
            //angular.element('#cantidadCarritoHead').val(vm.carritoHead.cantidad? vm.carritoHead.cantidad : '0');
        });
        
        // Top Search
        vm.openSearch = function(){
            angular.element('#header').addClass('search-toggled');
            angular.element('#top-search-wrap').find('input').focus();
        }

        vm.closeSearch = function(){
            angular.element('#header').removeClass('search-toggled');
        }

        //Clear Notification
        vm.refreshNotification = function() {
//            $timeout(function(e){
//                $state.go($state.current, {}, {reload: true});
//              }, 1000);
            //$state.reload();
            CarritoService.getCarrito({}, function (response) {
                vm.carritoHead = response;
                if(vm.carritoHead && vm.carritoHead.total > 0){
                    document.getElementById("cantidadCarritoHead").innerHTML = vm.carritoHead.cantidad;
                    angular.element('#btnComprar').removeClass('disabled');
                } else{
                    angular.element('#btnComprar').addClass('disabled');
                }
                //document.getElementById("cantidadCarritoHead").innerHTML = (vm.carritoHead.cantidad? vm.carritoHead.cantidad : '0');
                //angular.element('#cantidadCarritoHead').val(vm.carritoHead.cantidad? vm.carritoHead.cantidad : '0');
            });
        }


        //Clear Notification
        vm.clearNotification = function($event) {
            $event.preventDefault();
            
            var x = angular.element($event.target).closest('.listview');
            var y = x.find('.lv-item');
            var z = y.size();
            
            angular.element($event.target).parent().fadeOut();
            
            x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
            x.find('.grid-loading').fadeIn(1500);
            var w = 0;
            
            y.each(function(){
                var z = $(this);
                $timeout(function(){
                    z.addClass('animated fadeOutRightBig').delay(1000).queue(function(){
                        z.remove();
                    });
                }, w+=150);
            })
            
            $timeout(function(){
                angular.element('#notifications').addClass('empty');
            }, (z*150)+200);
            CarritoService.clearCart({}, function (response) {
                vm.carritoHead = undefined;
                document.getElementById("cantidadCarritoHead").innerHTML = '0';
                $timeout(function(){
                    $state.reload();
                    },1500);
            });
        }
        
        // Clear Local Storage
        vm.clearLocalStorage = function() {
            
            //Get confirmation, if confirmed clear the localStorage
            swal({   
                title: "Are you sure?",   
                text: "All your saved localStorage values will be removed",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#F44336",   
                confirmButtonText: "Yes, delete it!",   
                closeOnConfirm: false 
            }, function(){
                localStorage.clear();
                swal("Done!", "localStorage is cleared", "success"); 
            });
            
        }
        
        //Fullscreen View
        vm.fullScreen = function() {
            //Launch
            function launchIntoFullscreen(element) {
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }

            //Exit
            function exitFullscreen() {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }

            if (exitFullscreen()) {
                launchIntoFullscreen(document.documentElement);
            }
            else {
                launchIntoFullscreen(document.documentElement);
            }
        }

        vm.searchProduct = function searchProduct(buscar) {
            if(buscar){
                $state.go('home.search', {
                    keyword: buscar,
                    page: 0
                });
            }
        }

        vm.revisarSiEstaEnCarrito = function revisarSiEstaEnCarrito() {
            CarritoService.getCarrito({}, function (response) {
                vm.carritoHead = response;
                load(response.items);
                document.getElementById("cantidadCarritoHead").innerHTML = (vm.carritoHead.cantidad? vm.carritoHead.cantidad : '0');
            }),
            function (err) {
                return cb(err);
            }
            function load (card) {
                if(vm.productosDestacados){
                    for (var i = 0; i < vm.productosDestacados.length; i++) {
                        if(card){
                            for (var j = 0; j < card.length; j++) {
                                if(card[j].producto.id == vm.productosDestacados[i].id){
                                    vm.productosDestacados[i].isExistInCard=true;
                                    vm.productosDestacados[i].isExistInCardCount=card[j].cantidad;
                                    break;
                                }
                            }
                        }else{
                            break;
                        }
                    }
                }
            }
        }
    
    };
    
})();
