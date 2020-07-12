(function() {
    'use strict';

    angular
        .module('gestionFlia')
        
    .service('multipartForm', ['$http', function($http){
        this.post = function(uploadUrl, data){
            var fd = new FormData();
            for(var key in data){
                if(data[key] !== null && data[key] !== undefined)
                    fd.append(key, data[key]);
            }
            $http.post(uploadUrl, fd, {
                transformRequest: angular.indentity,
                headers: { 'Content-Type': undefined }
            })
            .success(function(){
            })
            .error(function(){
            });
        }
    }]);
})();