(function() {
    'use strict';

    angular
        .module('gestionFlia')
        .factory('ConfirmModalService', ConfirmModalService);

    ConfirmModalService.$inject = ['$uibModal'];

    function ConfirmModalService ($uibModal) {
        
        var modal = undefined

        return{
            open: function (title,msg,onSuccess,onDismiss){
                modal = $uibModal.open({
                    templateUrl: 'app/components/confirm-modal/confirm-modal.html',
                    size: 'md',
                    controller: ['$scope','$uibModalInstance',function($scope,$uibModalInstance) {
                        $scope.title = title;
                        $scope.msg = msg;

                        $scope.dismiss = function(){
                            $uibModalInstance.dismiss();
                        }

                        $scope.confirm = function(){
                            $uibModalInstance.close(true);
                        }
                    }]
                });
                modal.result.then(function(data){
                    if(onSuccess) onSuccess(); 
                },function(error){
                    if(onDismiss) onDismiss(); 
                });
            },
            close: function(){
                if(modal) modal.dismiss();
            }
        }
        
    }
})();
