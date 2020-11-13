({
    //called when the user start drag the card from Source to destination
    onDragStart : function(component, event, helper) {
        event.dataTransfer.dropEffect = "move";
        var item = component.get('v.item');
        event.dataTransfer.setData('text', JSON.stringify(item));
    },
})