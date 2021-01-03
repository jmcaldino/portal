(function() {
    'use strict';

    angular
        .module('gestionFlia')

        // <agp-select disabled="false" search="vm.promise"
        //  model="vm.modelo" options="vm.list" parse="$item.descripcion" 
        //  parse-model="$item.value" placeholder="TEST" required="true" 
        //  on-select="vm.onSelect($item)" name="test"></agp-select>

        .directive("resizeTextarea", [function(){
            return function(scope, elem, attrs){
        
                //save current size of textarea
                var current = {width: elem[0].offsetWidth, height: elem[0].offsetHeight}
        
                //get preview element
                var previewElement = angular.element(document.querySelector(attrs.resizeTextarea));
        
                function resize(){
                    previewElement.css({width: current.width + "px", height: current.height + "px"})
                }
        
                //Add the "mousemove" event to check, perhaps you can change the event "mouseup"
                elem.on("mousemove", function(){
        
                    //detect if the textarea has not the initial size
                    if(this.offsetWidth != current.width || this.offsetHeight != current.height){
                        current = {width: this.offsetWidth, height: this.offsetHeight};
                        resize()
                    }
        
                });
        
                resize()
            }
    }]);

})();
