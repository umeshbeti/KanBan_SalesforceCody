({
    helperMethod : function(component, event) {
        var objName = component.get("v.objName");
        var objFields = component.get("v.objFields");
        var kanbanPicklistField = component.get("v.kanbanPicklistField");
        var newItems=[];
        var pipelineColumns=[];
        var defaultcolumns = component.get('v.pipelineColumns');
        var action = component.get("c.getdata");
        action.setParams({
            'objectName':component.get("v.objName"),
            'objectFields':component.get("v.objFields")
        });
        action.setCallback(this, function(data){
            if(data.getState() == 'SUCCESS'){
                var results = data.getReturnValue();
                newItems = results;
                var newitemsMap = {};
                component.set('v.totalCount', results.length);
                //checking for default and user given colmns is already there is list or not
                if(!defaultcolumns.length >0){
                    for(var i=0;i<newItems.length;i++){

                       // newitemsMap.put(newItems[i][kanbanPicklistField],newItems[i]);
                        if(pipelineColumns.indexOf(newItems[i][kanbanPicklistField]) != -1){
                            //it contains already
                        }else {
                            // not contains
                            pipelineColumns.push(newItems[i][kanbanPicklistField]);
                        }
                    }
                }else{
                    pipelineColumns = component.get('v.pipelineColumns');
                }
                console.log('newitemsMap:',newitemsMap);
                
                for(var i=0;i<newItems.length;i++){
					newitemsMap[pipelineColumns[i]] ='' ;
                }
                console.log('newItems:',newItems);
                for (var key in newitemsMap){
                    var arrddd =[];
                    for(var i=0;i<newItems.length;i++){
                        if(newItems[i][kanbanPicklistField] == key ){
                            if(arrddd.indexOf(newItems[i]) != -1){
                                //it contains already
                            }else {
                                // not contains
                                arrddd.push(newItems[i]);
                            }
                        }
                	}
					newitemsMap[key] = arrddd;

                }
                console.log('newitemsMap:',newitemsMap);
                component.set('v.allItems', newItems);
                var pipelineColumnWithCount = component.get('v.pipelineColumnWithCount');
                
                var arr=[];
                // columns mannually added by user to show columns 
                // or  
                // default blank will pull all picklist values passed in the kanbanPicklistField 
                for(var i =0;i<pipelineColumns.length;i++){
                    var row = 0;
                    for(var j=0;j < newItems.length;j++){ //records return by Apex call
                        if(newItems[j][kanbanPicklistField]!= undefined && pipelineColumns[i] ==  newItems[j][kanbanPicklistField]){
                            row++;
                        }
                    }
                    arr.push({ columnName:pipelineColumns[i], count:row });
                }
                console.log('arr:',arr);
                component.set('v.pipelineColumnWithCount', arr);
            }
            else if(data.getState() == 'ERROR'){
                var errors = data.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action); 
    }
})