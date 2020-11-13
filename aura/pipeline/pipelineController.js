({
    doInit:function(component, event, helper) {
        console.log('do init pipline:');
        console.log('items: ',component.get('v.items'));
        console.log('kanbanPicklistField: ',component.get('v.kanbanPicklistField'));
    },
    allowDrop: function(component, event, helper) {
        event.preventDefault();
    },
    //called when the user drops the 
    onDrop: function(component, event, helper) {
        event.preventDefault();
        var pipelineChangeEvent = component.getEvent('pipelineChange');
        pipelineChangeEvent.setParams({
            'title': component.get('v.title'),
            'item': JSON.parse(event.dataTransfer.getData('text'))
        });
        pipelineChangeEvent.fire();
    },
    allowDrop : function(component, event, helper){
        event.preventDefault();
    }
})