(function() {
    'use strict';

    angular
        .module('gestionFlia', [
            'ngStorage',
            'tmh.dynamicLocale',
            'pascalprecht.translate',
            'ngResource',
            'ngCookies',
            'ngAria',
            'ngCacheBuster',
            'ngFileUpload',
            'ui.bootstrap',
            'ui.bootstrap.datetimepicker',
            'ui.router',
            'ui.select', 
            'ngSanitize',
            'infinite-scroll',
            // jhipster-needle-angularjs-add-module JHipster will add new module here
            'angular-loading-bar',
            'ngAnimate',
            'oc.lazyLoad',
            'nouislider',
            'ngTable',
        ])
        .run(run);

    run.$inject = ['stateHandler', 'translationHandler'];

    function run(stateHandler, translationHandler) {
        stateHandler.initialize();
        translationHandler.initialize();
    }
})();

/*var gestionFlia = angular.module('gestionFlia', [
	'ngAnimate',
    'ngResource',
    'ngCookies',    
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngTable',
    'ngCacheBuster',
    'ngStorage',
    'tmh.dynamicLocale',
    'pascalprecht.translate',
]).run(run);

run.$inject = ['stateHandler','translationHandler'];

function run(stateHandler,translationHandler) {
    stateHandler.initialize();
    translationHandler.initialize();
}*/
