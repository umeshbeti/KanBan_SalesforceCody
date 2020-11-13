public class kanbanController {
    public kanbanController(){}
    @AuraEnabled
    public static List<SObject>  getdata(String objectName, List<String> objectFields){
        integer rowIndex =0;
        String fieldsStrng='';
        for(String keyField: objectFields){
            if(rowIndex ==0){
                fieldsStrng = fieldsStrng+ keyField;
            }else{
                fieldsStrng = fieldsStrng+','+ keyField;
            }
            rowIndex++;
        }
        
        String queryString = 'Select '+fieldsStrng+' from '+objectName;
        List<SObject> listOfSObjectsData = Database.query(queryString);
        return listOfSObjectsData; 
    }
    @AuraEnabled
    public static List<SObject>  updateSobjectRecord(String objectName,SObject SObjectToUpdate){
        update SObjectToUpdate;
        return null;
    }
    
    
}