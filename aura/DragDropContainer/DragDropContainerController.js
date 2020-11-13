({
    //This function will get all SObjects as response and display to user with count in each column
    doInit : function(component, event, helper) {
        //calling helper methods 
        helper.helperMethod(component, event);
        
    },
    //This function is gets called when any card movess from one column to another column.
    //and once it's dropped it will update the field by picklist field selected
    onPipelineChanged: function(component, event, helper) {
        var title = event.getParam('title');
        var item = event.getParam('item');
        var allLists = component.get('v.allItems');
        var actualItem = allLists.find(function(el) {
            return el.Id  == item.Id ;
        });
        if (actualItem) {
            actualItem[component.get('v.kanbanPicklistField')] = title;
            component.set('v.allItems', allLists);
            
            var updateAction = component.get("c.updateSobjectRecord");
            updateAction.setParams({
                'objectName':component.get("v.objName"),
                'SObjectToUpdate':actualItem
            });
            updateAction.setCallback(this, function(data){
                if(data.getState() == 'SUCCESS'){
                    var results = data.getReturnValue();
                    $A.get('e.force:refreshView').fire();
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
            $A.enqueueAction(updateAction); 
            
        } else {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                mode: 'pester',
                "title": "Warning",
                "message": 'could not find item '+item+' in list '+allLists,
                "type": "warning"
            });
            toastEvent.fire();
        }        
    },
    // This function gets automatic called by aura:waiting events on server calls 
    showSpinner: function(component, event, helper) {
        // To make Spinner attribute true for displaying loading spinner when server call start
        component.set("v.spinner", true); 
    },
    
    // Function automatic called by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        //To make Spinner attribute to false for hiding loading spinner after server call done  
        component.set("v.spinner", false);
    },
    /*Open Modal for new button */
    closeModal:function(component,event,helper){    
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
    },
    
    /*Close Modal for new button*/
    openmodal: function(component,event,helper) {
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
})