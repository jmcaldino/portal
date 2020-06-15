(function() {
    'use strict';

    angular
        .module('gestionFlia')

        // <agp-select disabled="false" search="vm.promise"
        //  model="vm.modelo" options="vm.list" parse="$item.descripcion" 
        //  parse-model="$item.value" placeholder="TEST" required="true" 
        //  on-select="vm.onSelect($item)" name="test"></agp-select>

    .directive('agpSelect', ['$compile',function($compile){
        return {
            restrict: 'E',
            require:'?^form',
            templateUrl:'app/components/agp-select/agp-select.html',
            scope:{
                model: '=?',
                required: '=',
                disabled:'=',
                options: '=',
                search:'&',
                onSelect:'&',
                onRemove:'&',
                parseModel:'&?',
                limpiar: '=?'
            },
            compile:function(elem,attrs){
                var topElement = $(elem).find('ui-select');
                var placeholderElement = $(elem).find('ui-select-match');
                var selectExpElement = $(elem).find('.selectExp');
                var choiceExpElement = $(elem).find('.choiceExp');
                var choiceElement = $(elem).find('ui-select-choices');
                var holderElement = $(elem).find('.agp-select-parent');
                var holderElement = $(elem).find('.agp-select-parent');
                
                if(attrs.largeChoices!==undefined){
                    topElement.addClass('large-choices');
                }

                if(attrs.hidehint===undefined){
                    holderElement.addClass('form-group');
                }

                var modelExpr = '$select.selected';
                if(attrs.multiple!==undefined){
                    topElement.attr('multiple','');
                    selectExpElement.addClass('p-r-15');
                    modelExpr = '$item';
                }


                if(attrs.search){
                    choiceElement.attr('refresh','doFilter($select.search)'); 
                    choiceElement.attr('refresh-delay','0'); 
                }
                topElement.attr('name',attrs.name);
                if(attrs.closeOnSelect!==undefined){
                    topElement.attr('close-on-select',attrs.closeOnSelect);
                }
                placeholderElement.attr('placeholder', attrs.placeholder || 'Seleccione uno');
                if(attrs.parseModel===undefined){
                    selectExpElement.attr('ng-bind',(attrs.parse || '$item').replace(/\$item/g,modelExpr));
                }else{
                    selectExpElement.attr('ng-bind',modelExpr);
                }
                choiceExpElement.attr('ng-bind',(attrs.parse || '$item').replace(/\$item/g,'item'));
                return linkFunc;
            }
        }
        
        function linkFunc(scope,elem,attrs,formCtrl){

            scope.form = formCtrl;
            scope.items = [];
            scope.uiModel = {};
            scope.name = attrs.name;
            scope.placeholder = attrs.placeholder;

            var isMulitple = attrs.multiple!==undefined;
            
            var modelProp = attrs.modelProp || undefined;
            var minChars = attrs.minChars || undefined;
            scope.pending = false;

            var onSelectFunc = undefined;
            var onRemoveFunc = undefined;
            var searchFunc = undefined;
            var parseModelFunc = function(args){return args['$item']};

            var unregister = undefined;

            scope.$watch('search',function(search){
                searchFunc = search;
            });
            scope.$watch('onSelect',function(onSelect){
                onSelectFunc = onSelect;
            });
            scope.$watch('onRemove',function(onRemove){
                onRemoveFunc = onRemove;
            });
            scope.$watch('parseModel',function(parseModel){
                if(parseModel){
                    parseModelFunc = parseModel;
                }
            });

            scope.$watch('options',function(options){
                scope.items = options;
            });

            unregister = scope.$watch('model',updateModel);

            function updateModel(model){
                scope.uiModel.selected = model;
            }

            function noWatch(cb){
                if(unregister) unregister();
                cb();
                unregister = scope.$watch('model',updateModel);
            }

            scope.onItemSelected = function(item){
                noWatch(function(){
                    if(isMulitple){
                        if(!scope.model){
                            scope.model=[];
                        }
                        scope.model.push(parseModelFunc({'$item':item}));
                    }else{
                        scope.model = parseModelFunc({'$item':item});
                    }
                });
                if(onSelectFunc){
                    onSelectFunc({'$item':item});
                }
            };

            scope.onItemRemoved = function(item){
                if(isMulitple && scope.model.length){
                    scope.model.splice(scope.model.indexOf(item),1);
                }
                if(onRemoveFunc){
                    onRemoveFunc({'$item':item});
                }
            }
            
            scope.limpiarModelo= function(){
            	scope.model = null;
            }

            function filter(value){
                if(searchFunc && !scope.pending){
                    scope.pending = true;
                    searchFunc({'$search':value}).then(function(data){
                        scope.pending = false;
                        scope.items = data;
                    }).catch(function(error){
                        scope.pending = false;
                        console.log(error);
                    });
                }
            }

            if(minChars){
                scope.doFilter = function(value){
                    if(value && value.length >= minChars){
                        filter(value);
                    }
                }
            }else{
                scope.doFilter = filter;
            }
        }
    }]);

})();
