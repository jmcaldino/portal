(function () {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
